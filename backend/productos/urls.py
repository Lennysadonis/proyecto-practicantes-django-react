from django.urls import path, include
from rest_framework import routers
from productos import views

# El router genera automáticamente las rutas para nuestro CRUD
router = routers.DefaultRouter()
router.register(r'producto', views.ProductoView, 'producto')

urlpatterns = [
    path("api/", include(router.urls)),
]