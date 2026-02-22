# from django.db import models

# # Create your models here.
# class Teacher(models.Model):
#     teacher_id = models.CharField(max_length=50, unique=True)
#     name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.name


# class Activity(models.Model):

#     ACTIVITY_TYPES = [
#         ('lesson', 'Lesson'),
#         ('quiz', 'Quiz'),
#         ('assessment', 'Assessment'),
#     ]

#     teacher = models.ForeignKey(
#         Teacher,
#         on_delete=models.CASCADE,
#         related_name='activities'
#     )

#     activity_type = models.CharField(
#         max_length=20,
#         choices=ACTIVITY_TYPES
#     )

#     created_at = models.DateTimeField()
#     subject = models.CharField(max_length=100)
#     class_name = models.CharField(max_length=50)

#     created_on = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = (
#             "teacher",
#             "activity_type",
#             "created_at",
#             "subject",
#             "class_name"
#         )
#         indexes = [
#             models.Index(fields=['teacher']),
#             models.Index(fields=['created_at']),
#         ]

#     def __str__(self):
#         return f"{self.teacher.name} - {self.activity_type}"

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