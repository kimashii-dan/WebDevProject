# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Priority, Task, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ['id', 'name']

class TaskSerializer(serializers.ModelSerializer):
    priority = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Priority.objects.all()
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'createdAt', 'priority']
        read_only_fields = ['createdAt', 'id']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'task', 'content', 'created_at']
        read_only_fields = ['created_at', 'id']