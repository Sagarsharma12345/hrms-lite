from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.utils import timezone
from .models import Attendance
from .serializers import AttendanceSerializer
from common.utils import api_response


class AttendanceViewSet(ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    # ===== FILTERING =====
    def get_queryset(self):
        qs = super().get_queryset()

        emp_id = self.request.query_params.get('employee')
        date = self.request.query_params.get('date')

        if emp_id:
            qs = qs.filter(employee_id=emp_id)

        if date:
            qs = qs.filter(date=date)

        return qs

    # ===== CREATE =====
    def create(self, request, *args, **kwargs):
        user = request.user
        emp = request.data.get('employee', user.id)
        date = request.data.get('date', timezone.now().date())

        if Attendance.objects.filter(employee_id=emp, date=date).exists():
            raise ValidationError("Attendance already marked for this date")

        request.data['employee'] = emp
        request.data['date'] = date

        response = super().create(request, *args, **kwargs)
        return api_response(True, "Attendance marked successfully", response.data, 201)

    # ===== UPDATE PERMISSION CHECK =====
    # def _check_permission(self, request, attendance):
    #     if request.user.id != attendance.employee.id and not request.user.is_staff:
    #         raise PermissionDenied("Permission denied")

    # ===== UPDATE =====
    def update(self, request, *args, **kwargs):
        # attendance = self.get_object()
        # self._check_permission(request, attendance)
        response = super().update(request, *args, **kwargs)
        return api_response(True, "Attendance updated successfully", response.data)

    # ===== PARTIAL UPDATE =====
    def partial_update(self, request, *args, **kwargs):
        # attendance = self.get_object()
        # self._check_permission(request, attendance)
        response = super().partial_update(request, *args, **kwargs)
        return api_response(True, "Attendance partially updated", response.data)

    # ===== DELETE =====
    def destroy(self, request, *args, **kwargs):
        # attendance = self.get_object()
        # self._check_permission(request, attendance)

        super().destroy(request, *args, **kwargs)
        return api_response(True, "Attendance deleted successfully", None)

    # ===== LIST =====
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return api_response(True, "Attendance list fetched", response.data)

    # ===== RETRIEVE =====
    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return api_response(True, "Attendance fetched", response.data)
