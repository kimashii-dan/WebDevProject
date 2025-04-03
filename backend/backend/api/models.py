from django.db import models
from django.contrib.auth.models import User

class Priority(models.Model):
    HIGH = 'high'
    MEDIUM = 'medium'
    LOW = 'low'
    PRIORITY_CHOICES = [
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low'),
    ]
    name = models.CharField(
        max_length=10,
        unique=True,
        choices=PRIORITY_CHOICES,
    )

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.BooleanField(default=False)
    createdAt = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    priority = models.ForeignKey(Priority, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return self.title

class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.task.title}"