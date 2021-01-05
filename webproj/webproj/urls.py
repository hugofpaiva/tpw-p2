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
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as authviews

from app import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="AppStore API",
        default_version='v1',
        description="REST API for AppStore",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,), )

urlpatterns = [

    # This exposes 4 endpoints:
    # A JSON view of your API specification at /swagger.json
    # A YAML view of your API specification at /swagger.yaml
    # A swagger-ui view of your API specification at /swagger/
    # A ReDoc view of your API specification at /redoc/

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),
    # login!
    path('ws-token-auth/', authviews.obtain_auth_token, name='api-token-auth'),
    path('ws/register', views.register),
    path('ws/clients', views.get_clients),
    path('ws/client/<int:id>', views.get_client),

    path('ws/developer/<int:id>', views.get_dev),
    path('ws/developers', views.get_devs),
    path('ws/developercre', views.create_dev),
    path('ws/developerupd/<int:id>', views.update_dev),
    path('ws/developerdel/<int:id>', views.delete_dev),

    path('ws/product/<int:id>', views.get_product),
    path('ws/products', views.get_products),
    path('ws/productcre', views.create_product),
    path('ws/productupd/<int:id>', views.update_product),
    path('ws/productdel/<int:id>', views.delete_product),

    path('ws/reviews', views.get_reviews),
    path('ws/review/<int:id>', views.get_review),
    path('ws/reviewcre', views.create_review),
    path('ws/reviewupd/<int:id>', views.update_review),
    path('ws/reviewdel/<int:id>',views.delete_review)
]
