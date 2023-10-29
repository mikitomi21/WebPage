from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class AdminCustomUser(admin.ModelAdmin):
    fields = ['username', 'email', 'avatar', 'password']
    list_display = ['username', 'email']
    list_filter = ['username', 'email']
