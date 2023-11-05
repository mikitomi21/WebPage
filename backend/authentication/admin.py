from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class AdminCustomUser(admin.ModelAdmin):
    fields = ['username', 'email', 'avatar', 'password', 'show_friends']
    list_display = ['username', 'email', 'show_friends']
    list_filter = ['username', 'email']

    def show_friends(self, obj):
        return ", ".join(obj.friends.all())

    show_friends.short_description = 'Show Friends'
