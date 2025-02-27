from django.urls import path
from .views import *

urlpatterns = [
    # path('', ),
    path('register/', UserRegistrationAPIView.as_view(), name='register_user'),
    path('login/', LoginView.as_view(), name='login_user'),

    path('books/', BookListAPIView.as_view(), name='book_list'),
    path('api/reading-list/', UserReadingListAPIView.as_view(), name='user_reading_list_api'),
]
