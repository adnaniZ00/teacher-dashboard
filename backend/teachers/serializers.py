from rest_framework import serializers
from .models import Teacher


class TeacherSummarySerializer(serializers.ModelSerializer):
    lessons = serializers.IntegerField()
    quizzes = serializers.IntegerField()
    assessments = serializers.IntegerField()

    class Meta:
        model = Teacher
        fields = ["teacher_id", "name", "lessons", "quizzes", "assessments"]