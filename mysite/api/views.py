from django.http import response
from django.shortcuts import render

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BlogImageSerializer, BlogSerializer, UserSerializer
from blog.models import Blog,BlogImage
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.response import Response



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        print(self.request.user)
        return super().get_queryset().filter(author = self.request.user)
       

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BlogImageView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    def post(self,request,format=None):
        serializer = BlogSerializer(data=request.data)
        print(FormParser)
        print(request.data)
        # print(request.FILES.get('files'))
        images = request.FILES.getlist('files')
        print(images)
        for x in images:
            print(x)
        # print(img)
        if serializer.is_valid():
            x = serializer.save()
            print('x',x)
            if images:
                for img in images:
                
                    image = BlogImage(blog=x,image=img)
                    image.save()
            
            return Response({'msg':'created'})
        return Response({'msg':'bad-request'})
    # def get(self,request,*args,**kwargs):
    #     serializer =  BlogImageSerializer()
    #     return Response(serializer.data)

