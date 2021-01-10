from django.db.models import ForeignKey

from app.models import *
from rest_framework import serializers
from django.db.models import Avg
from django.db.models.functions import Ceil


# TODO: ver atributos nao necessários

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')


class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ('id', 'name', 'created_at')


class ProductSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    update_at = serializers.DateTimeField(read_only=True)
    stars = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'icon', 'description',
                  'category', 'developer', 'created_at', 'update_at', 'price', 'stars')

    def get_stars(self, obj):
        stars = Reviews.objects.filter(product=obj).aggregate(rating__avg=Ceil(Avg('rating')))['rating__avg']
        if stars is None:
            stars = 0
        return int(stars)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['developer'] = DeveloperSerializer(Developer.objects.get(pk=data['developer'])).data
        data['category'] = [CategorySerializer(catg).data for catg in instance.category.all()]
        return data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id','email', 'username', 'password','first_name','last_name', 'is_superuser')

    def save(self):
        print(self.validated_data)
        user = User(email=self.validated_data['email'],
                    username=self.validated_data['username'],
                    first_name=self.validated_data['first_name'],
                    last_name=self.validated_data['last_name']
                    )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'username', 'first_name','last_name', 'is_superuser')
        read_only_fields = ('id', 'is_superuser')

    def save(self):
        print(self.validated_data)
        user = User(email=self.validated_data['email'],
                    username=self.validated_data['username'],
                    first_name=self.validated_data['first_name'],
                    last_name=self.validated_data['last_name']
                    )
        user.save()
        return user


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'user', 'favorites', 'created_at',
                  'balance')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data


class PurchaseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Purchase
        fields = ('client', 'product', 'created_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['client'] = ClientSerializer(Client.objects.get(pk=data['client'])).data
        data['product'] = ProductSerializer(Product.objects.get(pk=data['product'])).data
        return data


class ReviewsSerializer(serializers.ModelSerializer):
    update_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Reviews
        fields = ('id', 'author', 'product', 'rating', 'date', 'update_at', 'body')


    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['product'] = ProductSerializer(Product.objects.get(pk=data['product'])).data
        data['author'] = ClientSerializer(Client.objects.get(pk=data['author'])).data
        return data
