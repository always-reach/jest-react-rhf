from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import User


class LoginAPI(APIView):
    def get(self, request):
        return Response({"get": "ok"}, status=status.HTTP_200_OK)

    def post(self, request):
        email: str = request.data.get("email")
        password: str = request.data.get("password")
        user_object=User.objects.all().filter(email=email).filter(password=password).first()
        if user_object:
            return Response({"post": "ok"}, status=status.HTTP_200_OK)
        else:
            return Response({"post": "ng"}, status=status.HTTP_400_BAD_REQUEST)