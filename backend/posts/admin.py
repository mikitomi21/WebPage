from django.contrib import admin
from .models import Post


@admin.register(Post)
class AdminPost(admin.ModelAdmin):
    fields = ['author', 'title', 'text', 'created']
    list_display = fields
    list_filter = ['author', 'title']
