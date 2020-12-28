from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import Developer
from app.serializers import DeveloperSerializer


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