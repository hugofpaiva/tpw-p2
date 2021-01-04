from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly

from app.models import Developer, Product, Client, Reviews, Purchase
from app.serializers import DeveloperSerializer, ClientSerializer, UserSerializer, ProductSerializer, ReviewsSerializer, \
    PurchaseSerializer


#TODO: Função que veja que tipo de utilizador está a efetuar determinada operação, exemplo:
#      apenas super users podem editar/adicionar/remover produtos




def check_request_user(request):
    user=request.user
    if request.user.username is None:
        return  None
    elif request.user.is_superuser:
        return "Admin"
    elif Client.objects.get(user=user) is not None:
        return "Client"
    else:
        return "Some Error Ocurred"

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer=UserSerializer(data=request.data)
    data = {}
    st=None
    if serializer.is_valid():
        user = serializer.save()
        st=status.HTTP_201_CREATED
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
            data=serializer.errors
            st=status.HTTP_400_BAD_REQUEST
    else:
        data = serializer.errors
        st = status.HTTP_400_BAD_REQUEST

    return Response(data,status=st)


@api_view(['GET'])
def get_clients(request):
    clients = Client.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        clients = clients[:num]
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_client(request):
    id = int(request.GET['id'])
    try:
        client = Client.objects.get(id=id)
    except Client.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClientSerializer(client)
    return  Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_dev(request):
    id = int(request.GET['id'])
    try:
        dev = Developer.objects.get(id=id)
    except Developer.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DeveloperSerializer(dev)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_devs(request):
    devs = Developer.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        devs = devs[:num]
    serializer = DeveloperSerializer(devs,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_dev(request):
    user=check_request_user(request)
    if user=="Admin":
        serializer=DeveloperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response({'error_message':"You're not allowed to do this Request!"},status=status.HTTP_403_FORBIDDEN)

@api_view(['PUT'])
def update_dev(request):
    user=check_request_user(request)
    if user=="Admin":
        id = request.data['id']
        try:
            dev = Developer.objects.get(id=id)
        except Developer.DoesNotExist:
            return  Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DeveloperSerializer(dev,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message':"You're not allowed to do this Request!"},status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def delete_dev(request,id):
    user=check_request_user(request)
    if user == "Admin":
        try:
            dev=Developer.objects.get(id=id)
        except Developer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        dev.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_product(request):
    id = int(request.GET['id'])
    try:
        prod = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(prod)
    return Response(serializer.data)



@api_view(['GET'])
def get_products(request):
    prods = Product.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        prods = prods[:num]
    serializer = ProductSerializer(prods,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_product(request):
    user = check_request_user(request)
    if user == "Admin":
        serializer=ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['PUT'])
def update_product(request):
    id = request.data['id']
    user = check_request_user(request)
    if user == "Admin":
        try:
            prod = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(prod,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def delete_product(request):
    id = request.data['id']
    user = check_request_user(request)
    if user == "Admin":
        try:
            prod=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        prod.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error_message': "You're not allowed to do this Request!"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def get_reviews(request):
    revs = Reviews.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        revs = revs[:num]
    serializer = ReviewsSerializer(revs,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_review(request):
    id = int(request.GET['id'])
    try:
        rev = Reviews.objects.get(id=id)
    except Reviews.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewsSerializer(rev)
    return Response(serializer.data)


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

@api_view(['GET'])
def get_purchase(request):
    id = int(request.GET['id'])
    try:
        purch = Purchase.objects.get(id=id)
    except Purchase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PurchaseSerializer(purch)
    return Response(serializer.data)

@api_view(['POST'])
def create_review(request):
    serializer=ReviewsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_review(request):
    id = request.data['id']
    try:
        prod = Reviews.objects.get(id=id)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewsSerializer(prod,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_review(request):
    id = request.data['id']

    try:
        rev=Reviews.objects.get(id=id)
    except Reviews.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    rev.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)




