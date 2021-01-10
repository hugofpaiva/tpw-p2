from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.fields import Lookup
from django_filters.rest_framework import DjangoFilterBackend, Filter

from app.models import Product


class ListFilter(filters.Filter):
    def filter(self,qs,value):
        if value not in (None,''):
            strings = [int(v) for v in value.split(',')]
            return qs.filter(**{'%s__%s'%(self.field_name, self.lookup_expr):strings})
        return qs


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains', exclude='')
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = ListFilter(field_name='category__id', lookup_expr='in')
    developer = ListFilter(field_name='developer__id',lookup_expr='in')

    class Meta:
        model = Product
        fields = ['max_price', 'min_price', 'category', 'developer', 'name']