from django.contrib import admin
from .models import Blog,BlogImage,Status
# Register your models here.
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ["author","title","description","created_at","updated_at"]
    
@admin.register(BlogImage)
class BlogImageAdmin(admin.ModelAdmin):
    list_display = ['blog','image']

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ['user','status']