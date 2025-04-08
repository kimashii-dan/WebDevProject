from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Priority, Task, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    

class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())  # Use PrimaryKeyRelatedField
    content = serializers.CharField(max_length=200)
    created_at = serializers.DateField(read_only=True)
    

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.task = validated_data.get('task', instance.task) 
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

class TaskListSerializer(serializers.ModelSerializer):
    priority = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Priority.objects.all()
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'createdAt', 'priority']
        read_only_fields = ['createdAt', 'id']
    

class TaskDetailSerializer(serializers.ModelSerializer):
    priority = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Priority.objects.all()
    )
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'createdAt', 'priority', 'comments']
        read_only_fields = ['createdAt', 'id']
    


# class PrioritySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Priority
#         fields = ['id', 'name']

class PrioritySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.ChoiceField(choices=Priority.PRIORITY_CHOICES)

    def create(self, validated_data):
        return Priority.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    


# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['id', 'task', 'content', 'created_at']
#         read_only_fields = ['created_at', 'id']
