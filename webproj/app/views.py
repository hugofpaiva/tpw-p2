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

from app.models import Developer
from app.serializers import DeveloperSerializer, ClientSerializer, UserSerializer


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

'''

    if "email" not in request.data or "username" not in request.data or "password1" not in request.data or "password2" not in request.data:
        return Response({"state": "Error", "message": "Missing parameters"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create(username=request.data['username'], email=request.data['email'])

    user.refresh_from_db()
    user.save()
    user.set_password(request.data['password1'])
    user.save()
    request.data['user'] = user.id
    serializer = ClientSerializer(data=request.data)
    data = {}
    st=None
    if serializer.is_valid():
        client = serializer.save()
        data['response'] = 'successfully registered a new client'
        Token.objects.create(user=user)
        data['token'] = Token.objects.get(user=client.user).key
        st=status.HTTP_201_CREATED
    else:
        data = serializer.errors
        st= status.HTTP_400_BAD_REQUEST
'''


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