from app.models import *
from rest_framework import serializers


# TODO: ver atributos nao necessários

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ('name', 'created_at')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'icon', 'description',
                  'category', 'created_at','update_at', 'price')



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('user', 'favorites', 'created_at',
                  'balance')
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('client', 'product', 'created_at')

class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ('author', 'product', 'rating','date','update_at','body')