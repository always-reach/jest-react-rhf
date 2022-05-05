from django.urls import path

from .views import LoginAPI

urlpatterns = [
    path(r'login',LoginAPI.as_view())
]