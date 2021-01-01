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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username','password')
    def save(self):
        user = User(email=self.validated_data['email'],username=self.validated_data['username'])
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


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