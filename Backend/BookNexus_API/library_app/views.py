from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class UserRegistrationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully.",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'refresh': str(refresh),
                'access': str(access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)


class BookListAPIView(APIView):
    permission_classes = [IsAuthenticated]  
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        books = Book.objects.all()
        
        serializer = BookSerializer(books, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['uploaded_by'] = request.user.id
        serializer = BookSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class UserReadingListAPIView(APIView):
    permission_classes = [IsAuthenticated]   
    authentication_classes = [JWTAuthentication]

  

    def get(self, request, *args, **kwargs):
        reading_lists = ReadingList.objects.filter(user=request.user)

        all_books = Book.objects.all()

        reading_list_serializer = ReadingListSerializer(reading_lists, many=True)

        added_books_ids = [book.id for list in reading_lists for book in list.books.all()]
        unread_books = all_books.exclude(id__in=added_books_ids)

        unread_books_serializer = BookSerializer(unread_books, many=True)

        data = {
            "reading_lists": reading_list_serializer.data,
            "unread_books": unread_books_serializer.data,   
        }

        return Response(data)