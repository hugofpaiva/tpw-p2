from app.models import *
from rest_framework import serializers


# TODO: ver atributos nao necessários

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields =('title',)

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ('id','name', 'created_at')

class ProductSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    update_at = serializers.DateTimeField(read_only=True)
    stars = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ('name', 'icon', 'description',
                  'category', 'developer', 'created_at', 'update_at', 'price','stars')


    def get_stars(self,obj):
        stars = Reviews.objects.filter(product=obj).aggregate(rating__avg=Ceil(Avg('rating')))['rating__avg']
        if stars is None:
            stars = 0
        return int(stars)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('email', 'username', 'password')

    def save(self):
        user = User(email=self.validated_data['email'], username=self.validated_data['username'])
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class ClientSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ('id', 'user', 'favorites', 'created_at',
                  'balance')



class PurchaseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Purchase
        fields = ('client', 'product', 'created_at')


class ReviewsSerializer(serializers.ModelSerializer):
    update_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Reviews
        fields = ('author', 'product', 'rating', 'date', 'update_at', 'body')

