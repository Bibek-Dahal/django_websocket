from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

class Blog(models.Model):
    
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="blogs")
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True,editable=False)
    updated_at = models.DateTimeField(auto_now=True,editable=False)

    def __str__(self):
        return self.title

class BlogImage(models.Model):
    blog = ForeignKey(Blog,on_delete=models.CASCADE,related_name='blogImgs')
    image = models.ImageField(upload_to = 'images/')
    created_at = models.DateTimeField(auto_now_add=True,editable=False)
    updated_at = models.DateTimeField(auto_now=True,editable=False)

class Status(models.Model):
    options = (
        ('draft','draft'),
        ('published','published')
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.CharField(max_length=15,choices=options,default='draft')