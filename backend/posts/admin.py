from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class AdminPost(admin.ModelAdmin):
    fields = ['author', 'title', 'text', 'created']
    list_display = fields
    list_filter = ['author', 'title']


@admin.register(Comment)
class AdminComment(admin.ModelAdmin):
    fields = ['author', 'post', 'text', 'created', 'updated']
    list_display = fields
    list_filter = ['author', 'post']
