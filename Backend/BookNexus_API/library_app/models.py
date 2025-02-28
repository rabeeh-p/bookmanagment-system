from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)  
    genre = models.CharField(max_length=100)
    publication_date = models.DateField()
    description = models.TextField(blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="books")

    def __str__(self):
        return self.title
    


class ReadingList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reading_lists")
    name = models.CharField(max_length=255)
    books = models.ManyToManyField(Book, related_name="reading_lists")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.username}"