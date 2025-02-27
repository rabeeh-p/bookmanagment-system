from django.urls import path
from .views import *

urlpatterns = [
    # path('', ),
    path('register/', UserRegistrationAPIView.as_view(), name='register_user'),
    path('login/', LoginView.as_view(), name='login_user'),
]
