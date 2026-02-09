from django.contrib import admin
from django.urls import path
from .auth_views import LoginView, LogoutView
from django.urls import include
from .views import get_csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', LoginView.as_view()),
    path('api/logout/', LogoutView.as_view()),
    path('api/employees/', include('employees.urls')),
    path('api/attendance/', include('attendance.urls')),
]
