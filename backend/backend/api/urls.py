from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.views import TaskListView, RegisterUserView, TaskDetailView, TaskCreateView, UserProfileView, create_comment, update_or_delete_comment


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('tasks/', TaskListView.as_view(), name='tasks'),
    path('tasks/post/', TaskCreateView.as_view(), name='task-create'),
    path('tasks/<int:task_id>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/<int:task_id>/comments/', create_comment, name='comment-create'),
    path('tasks/<int:task_id>/comments/<int:comment_id>/', update_or_delete_comment, name='comment-update-delete'),
]