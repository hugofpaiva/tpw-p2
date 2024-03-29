import datetime

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.
from django.db.models import Min, Avg
from django.db.models.functions import Ceil


class Developer(models.Model):
    name = models.CharField(max_length=50,unique=True)
    address = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  str(self.name)

class Category(models.Model):
    title = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return str(self.title)


class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    icon = models.URLField()
    description = models.CharField(max_length=150)
    category = models.ManyToManyField(Category)
    developer = models.ForeignKey(Developer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    @property
    def stars(self):
        stars = Reviews.objects.filter(product=self).aggregate(rating__avg=Ceil(Avg('rating')))['rating__avg']
        if stars is None:
            stars = 0
        return int(stars)



class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    favorites = models.ManyToManyField(Product, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    balance = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return str(self.user.username)



class Purchase(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



class Reviews(models.Model):
    author = models.ForeignKey(Client, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )
    date = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)#achei q deviamos adicionar
    body = models.CharField(max_length=50)