from coreschema import schemas
from django.contrib.auth.models import User
from django.db.models import Count
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes, renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django_filters import rest_framework as filters

from app.filters import ProductFilter
from app.models import Developer, Product, Client, Reviews, Purchase, Category
from app.serializers import DeveloperSerializer, ClientSerializer, UserSerializer, ProductSerializer, ReviewsSerializer, \
    PurchaseSerializer, CategorySerializer, UserProfileSerializer, ChangePasswordSerializer


# TODO: Função que veja que tipo de utilizador está a efetuar determinada operação, exemplo:
#      apenas super users podem editar/adicionar/remover produtos


def check_request_user(request):
    user = request.user
    if request.user.is_anonymous:
        return None
    elif request.user.is_superuser:
        return "Admin"
    elif Client.objects.get(user=user) is not None:
        return "Client"
    else:
        return "Some Error Ocurred"


def check_client_permission(request, entity):
    """
    Function used to verify whether a authenticated client can perform a request or not
    For example, a client should only be able to view his purchases,or it's personal information
    @:parameter request : the request received
    @:parameter entity: the object of the class that the client wants to access
    """
    request_username = request.user.username
    if isinstance(entity, Purchase):
        return request_username == entity.client.user.username
    elif isinstance(entity, Client):
        return request_username == entity.user.username
    elif isinstance(entity,User):
        return request_username == entity.username
    elif isinstance(entity, Reviews):
        return request_username == entity.author.user.username
    return None


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    data = {}
    st = None
    if serializer.is_valid():
        user = serializer.save()
        st = status.HTTP_201_CREATED
        request.data['user'] = user.id
        print(request.data)
        client = ClientSerializer(data=request.data)

        if client.is_valid():


            client.save()
            print(client)
            #Token.objects.create(user=user)
            data['response'] = 'succesfully  registered a new user'
            #data['token'] = Token.objects.get(user=user).key
            st = status.HTTP_201_CREATED
        else:
            data = serializer.errors
            st = status.HTTP_400_BAD_REQUEST
    else:
        data = serializer.errors
        st = status.HTTP_400_BAD_REQUEST

    return Response(data, status=st)


@api_view(['GET'])
def get_clients(request):
    clients = Client.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        clients = clients[:num]
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_client(request, id):
    user = check_request_user(request)
    try:
        client = Client.objects.get(id=id)
        if user == 'Client' and not check_client_permission(request,client):
            return Response({'error_message': "You're not allowed to do this Request!"},
                            status=status.HTTP_403_FORBIDDEN)

    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClientSerializer(client)
    return Response(serializer.data)

@api_view(['GET'])
def get_actual_client(request):
    try:
        if request.user.is_superuser:
            client = Client(user=request.user)
        else:
            client = Client.objects.get(user_id=request.user.id)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClientSerializer(client)
    return Response(serializer.data)


@api_view(['PUT'])
def update_userInfo(request, id):
    print(request.data)
    print(id)
    req_user = check_request_user(request)
    try:
        user = User.objects.get(id=id)
        if req_user == 'Client' and  not check_client_permission(request, user):
                return Response({'error_message': "You're not allowed to do this Request!"},
                                status=status.HTTP_403_FORBIDDEN)
        serializer = UserProfileSerializer(user, request.data)
        if serializer.is_valid():
            if 'email' not in serializer.validated_data:
                return Response({'error_message': "Email is Required"},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer.save(user)
            return Response(serializer.data)
        print("no valid")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_usePw(request, id):
    req_user = check_request_user(request)
    try:
        user = User.objects.get(id=id)
        if req_user == 'Client' and not check_client_permission(request, user):
            return Response({'error_message': "You're not allowed to do this Request!"},
                            status=status.HTTP_403_FORBIDDEN)
        serializer = ChangePasswordSerializer(user, request.data)
        if serializer.is_valid():
            serializer.save(user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)




@api_view(['PUT'])
def update_client(request,id):
    """
    The main Goal of this endpoint it to edit client's favorite applications.
    To Edit personal data like email or name it is used the User endpoint
    @:parameter id : the id of the client
    """
    user = check_request_user(request)
    try:
        client = Client.objects.get(id=id)
        if user == 'Client':
            if not check_client_permission(request,client):
                return Response({'error_message': "You're not allowed to do this Request!"},
                                status=status.HTTP_403_FORBIDDEN)

        serializer = ClientSerializer(client,request.data)

        #Only Admins can Edit the Clients balance,
        #therefore if a client tries to edit it's own balance, this request will not be Allowed
        if serializer.is_valid():
            if user == 'Client' and  'balance' in serializer.validated_data:
                return Response({'error_message': "You're not allowed to edit your own Balance!."},
                                status=status.HTTP_403_FORBIDDEN)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_devs(request):
    devs = Developer.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        devs = devs[:num]
    serializer = DeveloperSerializer(devs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_dev(request, id):
    try:
        dev = Developer.objects.get(id=id)
    except Developer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DeveloperSerializer(dev)
    return Response(serializer.data)


@api_view(['POST'])
def create_dev(request):
    user = check_request_user(request)
    if user == "Admin":
        serializer = DeveloperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
def update_dev(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            dev = Developer.objects.get(id=id)
        except Developer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DeveloperSerializer(dev, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def delete_dev(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            dev = Developer.objects.get(id=id)
        except Developer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        dev.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cats(request):
    cats = Category.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        devs = cats[:num]
    serializer = CategorySerializer(cats, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cat(request, id):
    try:
        cat = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(cat)
    return Response(serializer.data)


@api_view(['POST'])
def create_cat(request):
    user = check_request_user(request)
    if user == "Admin":
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
def update_cat(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            cat = Category.objects.get(id=id)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(cat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def delete_cat(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            cat = Category.objects.get(id=id)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        cat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_product(request, id):
    res = {}
    try:
        prod = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(prod)
    res.update(serializer.data)
    return Response(res)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    print(request.GET)
    prods = ProductFilter(request.GET, queryset=Product.objects.all()).qs
    if 'page' in request.GET:
        page = int(request.GET['page'])
        prods = prods[12*page:12*(page+1)]

    serializer = ProductSerializer(prods, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_top_products(request):
    res = []
    purchs = Purchase.objects.values('product').annotate(c=Count('product')).order_by('-c')
    if 'num' in request.GET:
        num = int(request.GET['num'])
        purchs = purchs[:num]

    for p in purchs:
        res.append(Product.objects.get(pk=p.get('product')))

    serializer = ProductSerializer(res, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_new_products(request):
    prods = Product.objects.all().order_by('-id')
    if 'num' in request.GET:
        num = int(request.GET['num'])
        prods = prods[:num]

    serializer = ProductSerializer(prods,many=True)

    return Response(serializer.data)


@api_view(['POST'])
def create_product(request):
    user = check_request_user(request)
    if user == "Admin":
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
def update_product(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            prod = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(prod, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def delete_product(request, id):
    user = check_request_user(request)
    if user == "Admin":
        try:
            prod = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        prod.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_reviews(request):
    if 'product' in request.GET:
        prod_id = int(request.GET['product'])
        revs = Reviews.objects.filter(product=prod_id)
    else:
        revs = Reviews.objects.all()

    if 'num' in request.GET:
        num = int(request.GET(['num']))
        revs = revs[:num]
    serializer = ReviewsSerializer(revs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_review(request):
    res = {}
    try:
        rev = Reviews.objects.get(id=id)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewsSerializer(rev)
    res.update(serializer.data)
    return Response(res)

@api_view(['GET'])
def my_reviews(request):
    """
    This function goal is to allow to get the Reviews of a Client,
    to identify the client it is used the authentication token.
    Only authenticated Users will be able to see this endpoint.
    """
    user =check_request_user(request)
    if user:
        if 'product' in request.GET:
            prod_id = int(request.GET['product'])
            revs = Reviews.objects.filter(author__user__username=request.user.username,product=prod_id)
        else:
            revs = Reviews.objects.filter(author__user__username=request.user.username)
        serializer = ReviewsSerializer(revs, many=True)
        return Response(serializer.data)
    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_purchases(request):
    user = check_request_user(request)
    if user == "Admin":
        purchs = Purchase.objects.all()
        if 'num' in request.GET:
            num = int(request.GET(['num']))
            purchs = purchs[:num]
        serializer = PurchaseSerializer(purchs, many=True)
        return Response(serializer.data)
    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def create_purchases(request):
    serializer = PurchaseSerializer(data=request.data)
    if serializer.is_valid():
        client=serializer.validated_data['client']
        product = serializer.validated_data['product']
        print(client.balance)
        if Purchase.objects.filter(client=client.id,product=product.id).exists():
            return Response({'error_message': "Client already has this product!"},
                            status=status.HTTP_400_BAD_REQUEST)

        if client.balance < product.price:
            return Response({'error_message': "Client does not have enough balance!"},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_purchase(request, id):
    res = {}
    user = check_request_user(request)
    try:
        purch = Purchase.objects.get(id=id)
        if user == 'Client' and not check_client_permission(request, purch):
            return Response({'error_message': "You're not allowed to do this Request! Can only Check Your Purchases"},
                            status=status.HTTP_403_FORBIDDEN)
    except Purchase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PurchaseSerializer(purch)
    res.update(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
def create_review(request):
    #in order to make things easier on FrontEnd side
    user = check_request_user(request)
    if user == 'Client' and 'author' not in request.GET:
        client = Client.objects.get(user=request.user.id)
        request.data.update({'author': client.id})
    serializer = ReviewsSerializer(data=request.data)
    if serializer.is_valid():
        author = serializer.validated_data['author']
        product = serializer.validated_data['product']
        if Reviews.objects.filter(author=author.id,product=product.id).exists():
            return Response({'error_message': "Cannot Add more than one Review to a Product by more than one client"},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_review(request, id):
    user = check_request_user(request)
    try:
        rev = Reviews.objects.get(id=id)
        if user == "Client" and not check_client_permission(request,rev):
            return Response({'error_message': "You're not allowed to do this Request! Can only Update Your Reviews"},
                     status=status.HTTP_403_FORBIDDEN)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ReviewsSerializer(rev, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_review(request, id):
    user = check_request_user(request)
    try:
        rev = Reviews.objects.get(id=id)
        if user == "Client" and not check_client_permission(request, rev):
            return Response({'error_message': "You're not allowed to do this Request! Can only Delete Your Reviews"},
                            status=status.HTTP_403_FORBIDDEN)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    rev.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
