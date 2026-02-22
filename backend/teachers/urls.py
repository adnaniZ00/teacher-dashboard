# from django.urls import path
# from .views import teacher_summary, weekly_trends, teacher_detail, home

# urlpatterns = [
#     path("", home),
#     path("summary/", teacher_summary),
#     path("weekly-trends/", weekly_trends),
#     path("teacher/<str:teacher_id>/", teacher_detail),
# ]

from django.urls import path
from .views import TeacherSummaryView, WeeklyTrendsView, TeacherDetailView, home

urlpatterns = [
    path('', home, name='home'),
    path('summary/', TeacherSummaryView.as_view(), name='teacher-summary'),
    path('weekly-trends/', WeeklyTrendsView.as_view(), name='weekly-trends'),
    path('teacher/<str:teacher_id>/', TeacherDetailView.as_view(), name='teacher-detail'),
]