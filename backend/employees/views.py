from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Employee
from .serializers import EmployeeSerializer
from common.utils import api_response


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # ===== FILTERING =====
    def get_queryset(self):
        qs = super().get_queryset()

        dept = self.request.query_params.get('department')
        designation = self.request.query_params.get('designation')
        is_active = self.request.query_params.get('is_active')

        if dept:
            qs = qs.filter(department__icontains=dept)

        if designation:
            qs = qs.filter(designation__icontains=designation)

        if is_active is not None:
            qs = qs.filter(is_active=is_active.lower() in ['true', '1'])

        return qs

    # ===== SUCCESS RESPONSES =====

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return api_response(True, "Employee created successfully", response.data, 201)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return api_response(True, "Employee list fetched", response.data)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return api_response(True, "Employee fetched", response.data)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return api_response(True, "Employee updated successfully", response.data)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        return api_response(True, "Employee partially updated", response.data)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return api_response(True, "Employee deleted successfully", None)
