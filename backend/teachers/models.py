from django.db import models

class Teacher(models.Model):
    teacher_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Activity(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100) # Lesson Plan, Quiz, Question Paper
    subject = models.CharField(max_length=100)
    grade = models.CharField(max_length=50)
    created_at = models.DateTimeField()

    def __str__(self):
        return f"{self.activity_type} by {self.teacher.name}"