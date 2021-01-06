from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.fields import Lookup
from django_filters.rest_framework import DjangoFilterBackend

from app.models import Product


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains', exclude='')
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = filters.CharFilter(field_name='category__title', lookup_expr='in', exclude='')
    developer = filters.CharFilter(method='look_anywhere',field_name='developer__name')

    def look_anywhere(self, queryset, name, value):
        print((name),value,queryset)
        return queryset.filter(developer__in=value)

    class Meta:
        model = Product
        fields = ['max_price', 'min_price', 'category', 'developer', 'name']
