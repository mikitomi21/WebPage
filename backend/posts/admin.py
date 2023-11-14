from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class AdminPost(admin.ModelAdmin):
    fields = ['author', 'title', 'text', 'created', 'updated']
    list_display = ['author', 'title', 'likes_count', 'created', 'updated']
    list_filter = ['author', 'title']

    def likes_count(self, obj):
        return obj.likes.count()

    likes_count.short_description = 'Likes Count'


@admin.register(Comment)
class AdminComment(admin.ModelAdmin):
    fields = ['author', 'post', 'text', 'created', 'updated']
    list_display = ['author', 'post', 'likes_count', 'created', 'updated']
    list_filter = ['author', 'post']

    def likes_count(self, obj):
        return obj.likes.count()

    likes_count.short_description = 'Likes Count'
