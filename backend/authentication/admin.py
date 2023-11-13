from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class AdminCustomUser(admin.ModelAdmin):
    fields = ['username', 'email', 'avatar', 'password', 'show_friends']
    list_display = ['username', 'email', 'show_friends']
    list_filter = ['username', 'email']

    def show_friends(self, obj):
        friends = list(obj.friends.all())
        friends_emails = [user.email for user in friends]
        return ", ".join(friends_emails) if len(friends_emails) else ""

    show_friends.short_description = 'Show Friends'
