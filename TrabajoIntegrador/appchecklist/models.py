from django.db import models
from django.contrib.auth.models import User 

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
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_vencimiento = models.DateField()
    dificultad = models.CharField(max_length=5, choices=DIFICULTAD_OPCIONES, default='Media')
    estado = models.CharField(max_length=15, choices=ESTADO_OPCIONES, default='No completada')

    def __str__(self):
        return self.nombre
