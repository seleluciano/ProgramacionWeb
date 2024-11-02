# urls.py
from django.urls import path
from . import views  
urlpatterns = [
    path('', views.inicio, name='inicio'),  # Página principal
    path('iniciarsesion/', views.Iniciosesion, name='iniciarsesion'),  # Vista de inicio de sesión
    path('registrar/', views.Registrarusuario, name='registrar'),  # Vista de registro de usuario
    path('perfil/', views.Editarperfil, name='perfil'),  # Vista de perfil del usuario
    path('cerrar_sesion/', views.logout_view, name='cerrarsesion'),  # Cerrar sesión del usuario
    path('graficos/', views.graficos, name='graficos'),  # Vista de gráficos
    path('listas/', views.listas, name='listas'),  # Vista de listas de tareas
    path('agregartarea/', views.agregartarea, name='agregartarea'),
    path('filtrar/', views.filtrar, name='filtrar'),
    path('cambiaravatar/', views.Cambiaravatar, name='cambiaravatar'),
    path('marcar-completada/<int:tarea_id>/', views.completar_tarea, name='marcar_completada'),


]
