from django.contrib import admin
from .models import Priority, Task, Comment
# Register your models here.
admin.site.register(Priority)
admin.site.register(Task)
admin.site.register(Comment)