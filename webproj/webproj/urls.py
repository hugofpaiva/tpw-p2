"""webproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as authviews
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    #login!
    path('ws-token-auth/', authviews.obtain_auth_token, name='api-token-auth'),
    path('ws/register', views.register),
    path('ws/clients',views.get_clients),
    path('ws/client',views.get_client),
    path('ws/developer',views.get_dev),
    path('ws/developers',views.get_devs),
    path('ws/developerscre',views.create_dev),
    path('ws/developerupd',views.update_dev),
    path('ws/developedel/<int:id>',views.delete_dev),
    path('ws/product',views.get_product),
    path('ws/products',views.get_products),
    path('ws/productcre',views.create_product),
    path('ws/productupd',views.update_product),
    path('ws/productdel/<int:id>',views.delete_product),
    path('ws/reviews',views.get_reviews),
    path('ws/review',views.get_review),
    path('ws/reviewscre',views.create_review),
    path('ws/reviewsupd',views.update_review),
]
