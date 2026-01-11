"""
API序列化器
"""
from rest_framework import serializers
from .models import (
    User, Pet, Favorite, Application, 
    Shelter, ChatSession, Message, UserPet
)


class UserSerializer(serializers.ModelSerializer):
    """用户序列化器"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'avatar', 
                  'location', 'bio', 'join_year']
        read_only_fields = ['id']


class UserRegisterSerializer(serializers.ModelSerializer):
    """用户注册序列化器"""
    password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            phone=validated_data.get('phone', '')
        )
        return user


class PetSerializer(serializers.ModelSerializer):
    """宠物序列化器"""
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'breed', 'age', 'gender', 'category',
            'distance', 'image_url', 'weight', 'color', 'size',
            'traits', 'description', 'is_new', 'is_favorite', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, pet=obj).exists()
        return False


class PetListSerializer(serializers.ModelSerializer):
    """宠物列表序列化器（精简版）"""
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'breed', 'age', 'gender', 'category',
            'distance', 'image_url', 'is_new', 'is_favorite'
        ]
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, pet=obj).exists()
        return False


class FavoriteSerializer(serializers.ModelSerializer):
    """收藏序列化器"""
    pet = PetListSerializer(read_only=True)
    
    class Meta:
        model = Favorite
        fields = ['id', 'pet', 'created_at']
        read_only_fields = ['id', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    """领养申请序列化器"""
    pet_name = serializers.CharField(source='pet.name', read_only=True)
    pet_breed = serializers.CharField(source='pet.breed', read_only=True)
    pet_age = serializers.CharField(source='pet.age', read_only=True)
    pet_image_url = serializers.URLField(source='pet.image_url', read_only=True)
    
    class Meta:
        model = Application
        fields = [
            'id', 'pet', 'pet_name', 'pet_breed', 'pet_age', 'pet_image_url',
            'applicant_name', 'phone', 'housing', 'status', 'progress',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'progress', 'created_at', 'updated_at']


class ApplicationCreateSerializer(serializers.ModelSerializer):
    """领养申请创建序列化器"""
    class Meta:
        model = Application
        fields = ['pet', 'applicant_name', 'phone', 'housing']
    
    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 11:
            raise serializers.ValidationError('请输入有效的11位手机号')
        return value
    
    def validate_applicant_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError('姓名至少2个字符')
        return value


class ShelterSerializer(serializers.ModelSerializer):
    """救助机构序列化器"""
    class Meta:
        model = Shelter
        fields = ['id', 'name', 'avatar', 'description', 'address', 
                  'phone', 'is_verified']


class MessageSerializer(serializers.ModelSerializer):
    """消息序列化器"""
    class Meta:
        model = Message
        fields = ['id', 'content', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']


class ChatSessionSerializer(serializers.ModelSerializer):
    """聊天会话序列化器"""
    name = serializers.CharField(read_only=True)
    last_message = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ChatSession
        fields = ['id', 'name', 'avatar', 'last_message', 'time', 
                  'unread_count', 'is_shelter']
    
    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-created_at').first()
        return last_msg.content if last_msg else ''
    
    def get_time(self, obj):
        last_msg = obj.messages.order_by('-created_at').first()
        if last_msg:
            return last_msg.created_at.strftime('%H:%M')
        return ''
    
    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.messages.filter(is_read=False).exclude(sender=request.user).count()
        return 0


class UserPetSerializer(serializers.ModelSerializer):
    """用户宠物序列化器"""
    class Meta:
        model = UserPet
        fields = ['id', 'name', 'image', 'created_at']
        read_only_fields = ['id', 'created_at']
