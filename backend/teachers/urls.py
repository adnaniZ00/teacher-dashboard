from django.urls import path
from .views import TeacherSummaryView, WeeklyTrendsView, TeacherDetailView, home

urlpatterns = [
    path('', home, name='home'),
    path('summary/', TeacherSummaryView.as_view(), name='teacher-summary'),
    path('weekly-trends/', WeeklyTrendsView.as_view(), name='weekly-trends'),
    path('teacher/<str:teacher_id>/', TeacherDetailView.as_view(), name='teacher-detail'),
]