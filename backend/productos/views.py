from rest_framework import viewsets
from .serializers import ProductoSerializer  # <--- Asegúrate que tenga la 's'
from .models import Producto

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()