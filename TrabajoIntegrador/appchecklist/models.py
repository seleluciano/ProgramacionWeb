from django.db import models
from django.contrib.auth.models import User 
from django.conf import settings

class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='imgavatar', default='imgavatar/predeterminado.jpg')

    def __str__(self):
        return f"{settings.MEDIA_URL}{self.imagen}"
    
class Lista(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} ({self.usuario.username})"

class Tarea(models.Model):
    DIFICULTAD_OPCIONES = [
        ('Baja', 'Baja'),
        ('Media', 'Media'),
        ('Alta', 'Alta'),
    ]

    ESTADO_OPCIONES = [
        ('No completada', 'No completada'),
        ('Completada', 'Completada'),
    ]

    lista = models.ForeignKey(Lista, on_delete=models.CASCADE, related_name="tareas")
    titulo = models.CharField(max_length=100)  # Cambiar 'nombre' por 'titulo'
    descripcion=models.CharField(max_length=300)
    fecha_vencimiento = models.DateField()
    prioridad = models.CharField(max_length=5, choices=DIFICULTAD_OPCIONES, default='Media')
    completada = models.CharField(max_length=15, choices=ESTADO_OPCIONES, default='No completada')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.titulo} ({self.usuario.username})"
