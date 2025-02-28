# user_app/serializers.py
from django.contrib.auth.models import User
from . models import *
from rest_framework import serializers



class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """Check if username or email already exists."""
        if User.objects.filter(username=data.get("username")).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})
        if User.objects.filter(email=data.get("email")).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})
        return data

    def create(self, validated_data):
        """Create and return a new user."""
        return User.objects.create_user(**validated_data)

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'authors', 'genre', 'publication_date', 'description', 'uploaded_by']


class ReadingListSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)   

    class Meta:
        model = ReadingList
        fields = ['id', 'name', 'books', 'created_at']




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']