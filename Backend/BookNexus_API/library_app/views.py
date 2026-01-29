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
from django.shortcuts import get_object_or_404




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
        error_messages = serializer.errors
        print(error_messages,'msge')
        return Response({
            "message": "Registration failed.",
            "errors": error_messages
        }, status=status.HTTP_400_BAD_REQUEST)

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
    
    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        if not name:
            return Response({"error": "Name is required"}, status=status.HTTP_400_BAD_REQUEST)
        reading_list = ReadingList.objects.create(user=request.user, name=name)
        return Response(ReadingListSerializer(reading_list).data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        reading_list_id = request.data.get("reading_list_id")
        book_ids = request.data.get("book_ids", [])

        if not reading_list_id:
            return Response({"error": "Reading list ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        reading_list = get_object_or_404(ReadingList, id=reading_list_id, user=request.user)
        
        books = Book.objects.filter(id__in=book_ids)
        if not books.exists():
            return Response({"error": "No valid books found"}, status=status.HTTP_400_BAD_REQUEST)

        reading_list.books.add(*books)
        return Response(ReadingListSerializer(reading_list).data, status=status.HTTP_200_OK)
    

    def delete(self, request, *args, **kwargs):

        reading_list_id = request.data.get("reading_list_id")
        book_id = request.data.get("book_id")   

        reading_list = get_object_or_404(ReadingList, id=reading_list_id, user=request.user)

        if book_id:
            book = get_object_or_404(Book, id=book_id)
            reading_list.books.remove(book)
            return Response(
                {"message": "Book removed from reading list"},
                status=status.HTTP_200_OK
            )
        
        reading_list.delete()
        return Response(
            {"message": "Reading list deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
    
class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]  
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserBooksAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        books = Book.objects.filter(uploaded_by=request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, book_id):
        book = get_object_or_404(Book, id=book_id, uploaded_by=request.user)
        serializer = BookSerializer(book, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, book_id):
        book = get_object_or_404(Book, id=book_id, uploaded_by=request.user)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)



        

        