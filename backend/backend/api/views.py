from django.contrib.auth.models import User
from .serializers import UserSerializer, TaskSerializer, CommentSerializer
from .models import Task, Comment
from rest_framework import generics, exceptions, permissions, views, response


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class TaskListView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        tasks = Task.objects.filter(user=user).select_related('priority')
        
        return response.Response(TaskSerializer(tasks, many=True).data)

    
class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        task_id = self.kwargs['task_id']
        try:
            return Task.objects.get(id=task_id, user=self.request.user)
        except Task.DoesNotExist:
            raise exceptions.NotFound(detail="Task not found or you don't have permission to access it.")