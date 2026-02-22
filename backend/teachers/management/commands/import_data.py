import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from teachers.models import Teacher, Activity

class Command(BaseCommand):
    help = 'Imports teacher activity data from a CSV file directly without duplicate checking'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']

        try:
            # FIX: Changed encoding to 'utf-8-sig' and added errors='replace' to handle Excel formatting
            with open(csv_file_path, mode='r', encoding='utf-8-sig', errors='replace') as file:
                reader = csv.DictReader(file)
                
                count = 0
                for row in reader:
                    # Defensive check: clean invisible spaces from Excel headers
                    cleaned_row = {str(k).strip(): str(v).strip() for k, v in row.items() if k is not None}
                    
                    # Ensure we don't process empty rows at the bottom of the CSV
                    if not cleaned_row.get('Teacher_id'):
                        continue

                    # 1. Clean and extract the data safely
                    teacher_id = cleaned_row.get('Teacher_id', '')
                    teacher_name = cleaned_row.get('Teacher_name', '')
                    grade = cleaned_row.get('Grade', '')
                    subject = cleaned_row.get('Subject', '')
                    activity_type = cleaned_row.get('Activity_type', '')
                    created_at_str = cleaned_row.get('Created_at', '')
                    
                    # 2. Convert the timestamp
                    created_at = datetime.strptime(created_at_str, '%Y-%m-%d %H:%M:%S')

                    # 3. Get or Create the Teacher
                    teacher, created = Teacher.objects.get_or_create(
                        teacher_id=teacher_id,
                        defaults={'name': teacher_name}
                    )

                    # 4. Create the Activity directly
                    Activity.objects.create(
                        teacher=teacher,
                        activity_type=activity_type,
                        subject=subject,
                        grade=grade,
                        created_at=created_at
                    )
                    
                    count += 1

                self.stdout.write(self.style.SUCCESS(f'Successfully imported all {count} rows from the dataset.'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File "{csv_file_path}" not found. Please check the path.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))