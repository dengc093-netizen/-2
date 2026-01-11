"""
PetPals 领养平台数据模型
对应前端 types.ts 中定义的数据结构
"""
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """用户模型，扩展Django内置用户"""
    phone = models.CharField('手机号', max_length=20, blank=True)
    avatar = models.URLField('头像URL', blank=True)
    location = models.CharField('位置', max_length=100, blank=True)
    bio = models.CharField('简介', max_length=200, blank=True)
    join_year = models.IntegerField('加入年份', default=2024)
    
    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'
    
    def __str__(self):
        return self.username


class Pet(models.Model):
    """宠物模型"""
    GENDER_CHOICES = [
        ('公', '公'),
        ('妹妹', '妹妹'),
        ('弟弟', '弟弟'),
    ]
    
    CATEGORY_CHOICES = [
        ('狗狗', '狗狗'),
        ('猫猫', '猫猫'),
        ('小鸟', '小鸟'),
        ('小动物', '小动物'),
    ]
    
    SIZE_CHOICES = [
        ('小型犬', '小型犬'),
        ('中型犬', '中型犬'),
        ('大型犬', '大型犬'),
        ('小型', '小型'),
        ('中型', '中型'),
        ('大型', '大型'),
    ]
    
    STATUS_CHOICES = [
        ('待领养', '待领养'),
        ('审核中', '审核中'),
        ('已通过', '已通过'),
    ]
    
    name = models.CharField('名字', max_length=100)
    breed = models.CharField('品种', max_length=100)
    age = models.CharField('年龄', max_length=50)
    gender = models.CharField('性别', max_length=10, choices=GENDER_CHOICES)
    category = models.CharField('分类', max_length=20, choices=CATEGORY_CHOICES)
    distance = models.CharField('距离', max_length=50, blank=True)
    image_url = models.URLField('图片URL', blank=True)
    weight = models.CharField('体重', max_length=50, blank=True)
    color = models.CharField('颜色', max_length=50, blank=True)
    size = models.CharField('体型', max_length=20, choices=SIZE_CHOICES, blank=True)
    traits = models.JSONField('特点', default=list, blank=True)
    description = models.TextField('描述', blank=True)
    is_new = models.BooleanField('是否新到', default=False)
    status = models.CharField('状态', max_length=20, choices=STATUS_CHOICES, default='待领养')
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)
    
    class Meta:
        verbose_name = '宠物'
        verbose_name_plural = '宠物'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.breed})"


class Favorite(models.Model):
    """收藏模型"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites', verbose_name='用户')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='favorited_by', verbose_name='宠物')
    created_at = models.DateTimeField('收藏时间', auto_now_add=True)
    
    class Meta:
        verbose_name = '收藏'
        verbose_name_plural = '收藏'
        unique_together = ['user', 'pet']
    
    def __str__(self):
        return f"{self.user.username} 收藏 {self.pet.name}"


class Application(models.Model):
    """领养申请模型"""
    STATUS_CHOICES = [
        ('审核中', '审核中'),
        ('已通过', '已通过'),
        ('已拒绝', '已拒绝'),
    ]
    
    HOUSING_CHOICES = [
        ('apartment', '公寓'),
        ('house', '带院子住宅'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications', verbose_name='申请人')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='applications', verbose_name='宠物')
    applicant_name = models.CharField('申请人姓名', max_length=100)
    phone = models.CharField('联系电话', max_length=20)
    housing = models.CharField('住房类型', max_length=20, choices=HOUSING_CHOICES)
    status = models.CharField('状态', max_length=20, choices=STATUS_CHOICES, default='审核中')
    progress = models.IntegerField('进度', default=33)
    created_at = models.DateTimeField('申请时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)
    
    class Meta:
        verbose_name = '领养申请'
        verbose_name_plural = '领养申请'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.applicant_name} 申请领养 {self.pet.name}"


class Shelter(models.Model):
    """救助机构模型"""
    name = models.CharField('名称', max_length=100)
    avatar = models.URLField('头像URL', blank=True)
    description = models.TextField('描述', blank=True)
    address = models.CharField('地址', max_length=200, blank=True)
    phone = models.CharField('联系电话', max_length=20, blank=True)
    is_verified = models.BooleanField('是否认证', default=False)
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    
    class Meta:
        verbose_name = '救助机构'
        verbose_name_plural = '救助机构'
    
    def __str__(self):
        return self.name


class ChatSession(models.Model):
    """聊天会话模型"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions', verbose_name='用户')
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=True, blank=True, related_name='chat_sessions', verbose_name='救助机构')
    volunteer_name = models.CharField('志愿者姓名', max_length=100, blank=True)
    avatar = models.URLField('头像URL', blank=True)
    is_shelter = models.BooleanField('是否机构', default=False)
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)
    
    class Meta:
        verbose_name = '聊天会话'
        verbose_name_plural = '聊天会话'
        ordering = ['-updated_at']
    
    @property
    def name(self):
        if self.shelter:
            return self.shelter.name
        return self.volunteer_name or '未知联系人'
    
    def __str__(self):
        return f"{self.user.username} 与 {self.name} 的会话"


class Message(models.Model):
    """消息模型"""
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages', verbose_name='会话')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='sent_messages', verbose_name='发送者')
    content = models.TextField('内容')
    is_read = models.BooleanField('是否已读', default=False)
    created_at = models.DateTimeField('发送时间', auto_now_add=True)
    
    class Meta:
        verbose_name = '消息'
        verbose_name_plural = '消息'
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.content[:20]}..."


class UserPet(models.Model):
    """用户拥有的宠物（我的宠物）"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_pets', verbose_name='用户')
    name = models.CharField('名字', max_length=100)
    image = models.URLField('图片URL', blank=True)
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    
    class Meta:
        verbose_name = '用户宠物'
        verbose_name_plural = '用户宠物'
    
    def __str__(self):
        return f"{self.user.username} 的宠物 {self.name}"
