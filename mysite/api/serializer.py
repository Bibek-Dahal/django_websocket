
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from rest_framework.validators import UniqueValidator
from blog.models import Blog,BlogImage
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password



class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ["blog","image"]

class BlogSerializer(serializers.ModelSerializer):
    blogImgs = BlogImageSerializer(many=True,read_only=True)
    class Meta:
        model = Blog
        fields = ["author","title","description","blogImgs"]


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        # fields = "__all__"
        fields = ('username','email', 'first_name','last_name', 'password','password2','date_joined')
        read_only_fields = ["date_joined"]
        

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user
        