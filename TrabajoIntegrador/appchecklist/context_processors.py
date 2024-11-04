from .models import Tarea, Lista, Avatar
from django.templatetags.static import static

def tareas_context(request):
    if request.user.is_authenticated:
        tareas = Tarea.objects.filter(usuario=request.user)
        return {'tareas': tareas}
    return {}

def avatar_context(request):
    if request.user.is_authenticated:
        avatar = Avatar.objects.filter(user=request.user).first()
        if avatar and avatar.imagen:
            imagen = avatar.imagen.url  # Si el usuario tiene un avatar, usa su URL
        else:
            imagen = static('img/predeterminado.jpg')  # Imagen predeterminada si no tiene avatar
    else:
        imagen = static('img/predeterminado.jpg')  # Imagen predeterminada para usuarios no autenticados

    return {'imagen': imagen}

def listas_context(request):
    if request.user.is_authenticated:
        listas = Lista.objects.filter(usuario=request.user)
        return {'listas': listas}
    return {}