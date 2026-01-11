"""
Django Admin 配置
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, Pet, Favorite, Application, 
    Shelter, ChatSession, Message, UserPet
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'phone', 'location', 'join_year', 'is_staff']
    list_filter = ['is_staff', 'is_active', 'join_year']
    search_fields = ['username', 'email', 'phone']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('额外信息', {'fields': ('phone', 'avatar', 'location', 'bio', 'join_year')}),
    )


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ['name', 'breed', 'category', 'age', 'gender', 'status', 'is_new', 'created_at']
    list_filter = ['category', 'gender', 'status', 'is_new']
    search_fields = ['name', 'breed', 'description']
    list_editable = ['status', 'is_new']


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'pet', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'pet__name']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['applicant_name', 'pet', 'phone', 'housing', 'status', 'progress', 'created_at']
    list_filter = ['status', 'housing', 'created_at']
    search_fields = ['applicant_name', 'phone', 'pet__name']
    list_editable = ['status', 'progress']


@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'is_verified', 'created_at']
    list_filter = ['is_verified']
    search_fields = ['name', 'address']


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'is_shelter', 'created_at', 'updated_at']
    list_filter = ['is_shelter']
    search_fields = ['user__username', 'volunteer_name']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'sender', 'content_preview', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['content']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = '内容预览'


@admin.register(UserPet)
class UserPetAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'created_at']
    search_fields = ['user__username', 'name']
