from django.contrib import admin
from .models import Message, Room


@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    fields = ['name', 'members']
    fields_display = fields
    fields_filter = ['name', 'members']


@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    fields = ['author', 'text', 'room', 'liked']
    fields_display = fields
    fields_filter = ['author', 'room']
