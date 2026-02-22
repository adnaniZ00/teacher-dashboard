from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Q
from django.db.models.functions import TruncWeek
from django.utils import timezone
from django.http import HttpResponse
from datetime import timedelta
from .models import Teacher, Activity

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

def get_activity_filters(request, prefix="activities__"):
    """Helper function to build dynamic queries based on URL parameters"""
    q_filters = Q()
    
    # 1. Filter by Grade
    grade = request.GET.get('grade', '')
    if grade and grade not in ["All Grades", "Grade"]:
        clean_grade = grade.replace("Grade ", "").strip()
        q_filters &= Q(**{f"{prefix}grade": clean_grade})
        
    # 2. Filter by Subject
    subject = request.GET.get('subject', '')
    if subject and subject != "All Subjects":
        q_filters &= Q(**{f"{prefix}subject": subject})
        
    # 3. Filter by Time Range
    time_range = request.GET.get('timeRange', '')
    now = timezone.now()
    if time_range == "This Week":
        q_filters &= Q(**{f"{prefix}created_at__gte": now - timedelta(days=7)})
    elif time_range == "This Month":
        q_filters &= Q(**{f"{prefix}created_at__gte": now - timedelta(days=30)})
    elif time_range == "This Year":
        q_filters &= Q(**{f"{prefix}created_at__gte": now - timedelta(days=365)})
        
    return q_filters

class TeacherSummaryView(APIView):
    def get(self, request):
        search_term = request.GET.get('search', '')
        
        # Base Queryset
        teachers = Teacher.objects.all()
        if search_term:
            teachers = teachers.filter(Q(name__icontains=search_term) | Q(teacher_id__icontains=search_term))
        
        # Get Dynamic Filters
        activity_filters = get_activity_filters(request, prefix="activities__")
        
        # Only show teachers who have matching activities for the selected filters
        if activity_filters:
            teachers = teachers.filter(activity_filters).distinct()

        # Annotate with filtered counts based on the CSV activity types
        teachers = teachers.annotate(
            lessons=Count('activities', filter=activity_filters & Q(activities__activity_type__iexact='Lesson Plan')),
            quizzes=Count('activities', filter=activity_filters & Q(activities__activity_type__iexact='Quiz')),
            assessments=Count('activities', filter=activity_filters & Q(activities__activity_type__iexact='Question Paper'))
        ).order_by('name')

        paginator = StandardResultsSetPagination()
        paginated_teachers = paginator.paginate_queryset(teachers, request)
        
        data = [
            {
                "teacher_id": t.teacher_id,
                "teacher_name": t.name,
                "lessons": t.lessons,
                "quizzes": t.quizzes,
                "assessments": t.assessments
            }
            for t in paginated_teachers
        ]
        return paginator.get_paginated_response(data)

class WeeklyTrendsView(APIView):
    def get(self, request):
        direct_filters = get_activity_filters(request, prefix="")

        trends = Activity.objects.filter(direct_filters).annotate(
            week=TruncWeek('created_at')
        ).values('week').annotate(
            lessons=Count('id', filter=Q(activity_type__iexact='Lesson Plan')),
            quizzes=Count('id', filter=Q(activity_type__iexact='Quiz')),
            assessments=Count('id', filter=Q(activity_type__iexact='Question Paper'))
        ).order_by('week')
        
        formatted_data = [
            {
                "week": item['week'].strftime('%b %d') if item['week'] else 'Unknown',
                "lessons": item['lessons'],
                "quizzes": item['quizzes'],
                "assessments": item['assessments'],
            }
            for item in trends  
        ]
        return Response(formatted_data)

class TeacherDetailView(APIView):
    def get(self, request, teacher_id):
        try:
            teacher = Teacher.objects.get(teacher_id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=404)
        
        # Apply filters to the specific teacher's stats as well
        direct_filters = get_activity_filters(request, prefix="")
        activities = Activity.objects.filter(teacher=teacher).filter(direct_filters)
        
        subject_counts = activities.values('subject').annotate(count=Count('id'))
        
        total_lessons = activities.filter(activity_type__iexact='Lesson Plan').count()
        total_quizzes = activities.filter(activity_type__iexact='Quiz').count()
        total_assessments = activities.filter(activity_type__iexact='Question Paper').count()

        return Response({
            "teacher_id": teacher.teacher_id,
            "teacher_name": teacher.name,
            "total_lessons": total_lessons,
            "total_quizzes": total_quizzes,
            "total_assessments": total_assessments,
            "subject_distribution": list(subject_counts)
        })

def home(request):
    return HttpResponse("Teacher Insight Dashboard Backend API is Running.")