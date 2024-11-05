# urls.py
from django.urls import path
from . import views  

urlpatterns = [
    path('', views.inicio, name='inicio'),  # Página principal
    path('iniciarsesion/', views.Iniciosesion, name='iniciarsesion'),  # Vista de inicio de sesión
    path('registrar/', views.Registrarusuario, name='registrar'),  # Vista de registro de usuario
    path('perfil/', views.Editarperfil, name='perfil'),  # Vista de perfil del usuario
    path('cerrar_sesion/', views.logout_view, name='cerrarsesion'),  # Cerrar sesión del usuario
    path('graficolista/', views.graficolista, name='graficolista'), 
    path('graficotarea/', views.graficotarea, name='graficotarea'),
    path('agregartarea/', views.agregar_tarea, name='agregartarea'),  # Agregar nueva tarea
    path('filtrar/', views.filtrar_tareas, name='filtrar'),  # Filtrar tareas
    path('cambiaravatar/', views.Cambiaravatar, name='cambiaravatar'),  # Cambiar avatar del usuario
    path('marcar-completada/<int:tarea_id>/', views.completar_tarea, name='marcar_completada'),  # Marcar tarea como completada
    path('agregar_lista/', views.agregar_lista, name='agregar_lista'),  # Agregar nueva lista
    path('listas/', views.listas, name='listas'),  # Ver todas las listas
    path('eliminar-tarea/<int:tarea_id>/', views.eliminar_tarea, name='eliminar_tarea'),  # Eliminar una tarea
    path('eliminar-lista/<int:lista_id>/', views.eliminar_lista, name='eliminar_lista'),  # Eliminar una lista específica
    path('modificar-lista/<int:lista_id>/', views.modificar_lista, name='modificar_lista'),
    path('modificar-tarea/<int:tarea_id>/', views.modificar_tarea, name='modificar_tarea'),  

]
