from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BlogSerializer, UserSerializer
from .models import Blog
from rest_framework.generics import CreateAPIView, ListAPIView

class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        print(self.request.user)
        return super().get_queryset().filter(author = self.request.user)
       

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
