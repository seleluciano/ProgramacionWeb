from django.urls import path
from . import views
urlpatterns = [
    path('', views.Inicio,name="inicio"),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
