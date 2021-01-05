from coreschema import schemas
from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes, renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly

from app.models import Developer, Product, Client, Reviews, Purchase, Category
from app.serializers import DeveloperSerializer, ClientSerializer, UserSerializer, ProductSerializer, ReviewsSerializer, \
    PurchaseSerializer, CategorySerializer


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
        client = ClientSerializer(data=request.data)
        if client.is_valid():
            client.save()
            print(client)
            Token.objects.create(user=user)
            data['response'] = 'succesfully  registered a new user'
            data['token'] = Token.objects.get(user=user).key
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
def get_products(request):
    res = []
    prods = Product.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        prods = prods[:num]
    for prod in prods:
        serializer = ProductSerializer(prod)
        json_prod = {}
        json_prod.update(serializer.data)
        dev = Developer.objects.get(id=prod.developer.id)
        json_prod['developer'] = DeveloperSerializer(dev).data
        json_prod['category'] = [CategorySerializer(catg).data for catg in prod.category.all()]
        res.append(json_prod)
    return Response(res)


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
    revs = Reviews.objects.all()
    if 'num' in request.GET:
        print("fds")
        num = int(request.GET(['num']))
        revs = revs[:num]
    serializer = ReviewsSerializer(revs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_review(request, id):
    res = {}
    try:
        rev = Reviews.objects.get(id=id)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewsSerializer(rev)
    res.update(serializer.data)
    return Response(res)


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
        if Purchase.objects.filter(client=client.id).exists():
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
