"""
API URL配置
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'pets', views.PetViewSet, basename='pet')
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')
router.register(r'applications', views.ApplicationViewSet, basename='application')
router.register(r'chats', views.ChatSessionViewSet, basename='chat')
router.register(r'my-pets', views.UserPetViewSet, basename='user-pet')
router.register(r'shelters', views.ShelterViewSet, basename='shelter')

urlpatterns = [
    path('', include(router.urls)),
    # 认证
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/profile/', views.ProfileView.as_view(), name='profile'),
]
