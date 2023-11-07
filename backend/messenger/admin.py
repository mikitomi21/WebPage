from django.contrib import admin
<<<<<<< HEAD
<<<<<<< HEAD
from messenger.models import Message


@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    fields = ['author', 'receiver', 'text', 'liked']
    fields_display = fields
    fields_filter = ['author', 'receiver']
=======

# Register your models here.
>>>>>>> 60d4514 (Add messenger app)
=======
from messenger.models import Message


@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    fields = ['author', 'receiver', 'text', 'liked']
    fields_display = fields
    fields_filter = ['author', 'receiver']
>>>>>>> 6b14c50 (add message)
