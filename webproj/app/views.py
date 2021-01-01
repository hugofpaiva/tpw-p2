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

from app.models import Developer, Product
from app.serializers import DeveloperSerializer, ClientSerializer, UserSerializer, ProductSerializer

#TODO: Função que veja que tipo de utilizador está a efetuar determinada operação, exemplo:
#      apenas super users podem editar/adicionar/remover produtos



@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer=UserSerializer(data=request.data)
    data = {}
    st=None
    if serializer.is_valid():
        user = serializer.save()
        st =st=status.HTTP_201_CREATED
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



@csrf_exempt
@api_view(['GET'])
def get_dev(request):
    id = int(request.GET['id'])
    try:
        dev = Developer.objects.get(id=id)
    except Developer.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DeveloperSerializer(dev)
    return Response(serializer.data)

@api_view(['GET'])
def get_devs(request):
    devs = Developer.objects.all()
    if 'num' in request.GET:
        num = int(request.GET(['num']))
        devs = devs[:num]
    serializer = DeveloperSerializer(devs,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_dev(request):
    serializer=DeveloperSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return  Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_dev(request):
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


@api_view(['DELETE'])
def delete_dev(request,id):
    try:
        dev=Developer.objects.get(id=id)
    except Developer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    dev.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


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
    serializer=ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_product(request):
    id = request.data['id']
    try:
        prod = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(prod,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product(request):
    try:
        prod=Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    prod.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


