from django.contrib.auth.models import User
from .serializers import UserSerializer, TaskListSerializer, CommentSerializer, TaskDetailSerializer
from .models import Task, Comment
from rest_framework import generics, exceptions, permissions, views, response, status
from rest_framework.decorators import api_view, permission_classes

# Register User View
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# User Profile View

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    

# Task Views
class TaskListView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        tasks = Task.objects.filter(user=user).select_related('priority')
        serializer = TaskListSerializer(tasks, many=True)
        return response.Response(serializer.data)

    
class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        task_id = self.kwargs['task_id']
        try:
            return Task.objects.get(id=task_id, user=self.request.user)
        except Task.DoesNotExist:
            raise exceptions.NotFound(detail="Task not found or you don't have permission to access it.")


# Comments Views

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_comment(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return response.Response(
            {"error": "Task not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(task=task)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)
    return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def update_or_delete_comment(request, task_id, comment_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return response.Response(
            {"error": "Task not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        comment = Comment.objects.get(id=comment_id, task=task)
    except Comment.DoesNotExist:
        return response.Response(
            {"error": "Comment not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == 'DELETE':
        comment.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
