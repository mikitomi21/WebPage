from django.contrib import admin
from messenger.models import Message


@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    fields = ['author', 'receiver', 'text', 'liked']
    fields_display = fields
    fields_filter = ['author', 'receiver']
