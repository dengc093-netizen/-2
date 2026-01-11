"""
API视图
"""
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from .models import (
    User, Pet, Favorite, Application, 
    Shelter, ChatSession, Message, UserPet
)
from .serializers import (
    UserSerializer, UserRegisterSerializer, PetSerializer, PetListSerializer,
    FavoriteSerializer, ApplicationSerializer, ApplicationCreateSerializer,
    ShelterSerializer, ChatSessionSerializer, MessageSerializer, UserPetSerializer
)


class PetViewSet(viewsets.ModelViewSet):
    """宠物视图集"""
    queryset = Pet.objects.all()
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PetListSerializer
        return PetSerializer
    
    def get_queryset(self):
        queryset = Pet.objects.all()
        
        # 按分类筛选
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # 搜索
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(breed__icontains=search) |
                Q(description__icontains=search)
            )
        
        # 按状态筛选
        pet_status = self.request.query_params.get('status')
        if pet_status:
            queryset = queryset.filter(status=pet_status)
        
        return queryset
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def favorite(self, request, pk=None):
        """收藏/取消收藏宠物"""
        pet = self.get_object()
        favorite, created = Favorite.objects.get_or_create(
            user=request.user, pet=pet
        )
        if not created:
            favorite.delete()
            return Response({'status': 'unfavorited'})
        return Response({'status': 'favorited'})


class FavoriteViewSet(viewsets.ReadOnlyModelViewSet):
    """收藏视图集"""
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['delete'])
    def remove(self, request):
        """移除收藏"""
        pet_id = request.query_params.get('pet_id')
        if not pet_id:
            return Response(
                {'error': '缺少pet_id参数'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        deleted, _ = Favorite.objects.filter(
            user=request.user, pet_id=pet_id
        ).delete()
        if deleted:
            return Response({'status': 'removed'})
        return Response(
            {'error': '收藏不存在'}, 
            status=status.HTTP_404_NOT_FOUND
        )


class ApplicationViewSet(viewsets.ModelViewSet):
    """领养申请视图集"""
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        return ApplicationSerializer
    
    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ChatSessionViewSet(viewsets.ModelViewSet):
    """聊天会话视图集"""
    serializer_class = ChatSessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['get', 'post'])
    def messages(self, request, pk=None):
        """获取/发送消息"""
        session = self.get_object()
        
        if request.method == 'GET':
            messages = session.messages.all()
            serializer = MessageSerializer(messages, many=True)
            # 标记为已读
            session.messages.filter(is_read=False).exclude(
                sender=request.user
            ).update(is_read=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            content = request.data.get('content')
            if not content:
                return Response(
                    {'error': '消息内容不能为空'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            message = Message.objects.create(
                session=session,
                sender=request.user,
                content=content
            )
            serializer = MessageSerializer(message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserPetViewSet(viewsets.ModelViewSet):
    """用户宠物视图集"""
    serializer_class = UserPetSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserPet.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ShelterViewSet(viewsets.ReadOnlyModelViewSet):
    """救助机构视图集"""
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    permission_classes = [AllowAny]


# =============== 认证相关视图 ===============

class RegisterView(generics.CreateAPIView):
    """用户注册"""
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


class ProfileView(generics.RetrieveUpdateAPIView):
    """用户资料"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


@api_view(['POST'])
def login_view(request):
    """用户登录"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': '用户名和密码不能为空'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    from django.contrib.auth import authenticate
    user = authenticate(username=username, password=password)
    
    if user:
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    
    return Response(
        {'error': '用户名或密码错误'}, 
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
def logout_view(request):
    """用户登出"""
    if request.user.is_authenticated:
        from rest_framework.authtoken.models import Token
        Token.objects.filter(user=request.user).delete()
    return Response({'status': 'logged out'})
