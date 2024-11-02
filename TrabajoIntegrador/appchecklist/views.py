from django.shortcuts import redirect, get_object_or_404,render
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import *  # Asegúrate de que tu modelo Tarea está importado
from .forms import *  # Asegúrate de que tienes este formulario definido
from django.contrib.auth import update_session_auth_hash

@login_required
def inicio(request):
    tareas = Tarea.objects.filter(completada=False)
    return render(request, 'index.html', {'tareas': tareas})


def Iniciosesion(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            usuario = form.cleaned_data.get('username')
            contrasenia = form.cleaned_data.get('password')
            user = authenticate(username=usuario, password=contrasenia)
            if user is not None:
                login(request, user)
                messages.success(request, f"Bienvenido {usuario}!")  # Mensaje de éxito
                return redirect('inicio')  # Redirige al inicio o a la página deseada
            else:
                messages.error(request, "Datos incorrectos")  # Mensaje de error
                return render(request, "login.html", {"mensaje": "Datos incorrectos", "hide_navbar": True})
        else:
            messages.error(request, "Formulario erróneo")  # Mensaje de error
            return render(request, "login.html", {"mensaje": "Formulario erróneo", "hide_navbar": True})
    
    form = AuthenticationForm()
    return render(request, "login.html", {'form': form, 'hide_navbar': True})

def Registrarusuario(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            form.save()
            messages.success(request, "Usuario creado exitosamente :)")  # Mensaje de éxito
            return render(request, "login.html")
    else:
        form = UserRegisterForm()

    return render(request, "register.html", {'form': form, 'hide_navbar': True})

@login_required 
def Editarperfil(request): 
    usuario = request.user 

    if request.method == 'POST': 
        miFormulario = UserEditForm(request.POST, instance=usuario)
        if miFormulario.is_valid(): 
            informacion = miFormulario.cleaned_data 

            nuevo_username = informacion['username']
            if nuevo_username != usuario.username:
                if User.objects.filter(username=nuevo_username).exists():
                    miFormulario.add_error('username', "El nombre de usuario ya está en uso.")
                    messages.error(request, "El nombre de usuario ya está en uso.")  # Mensaje de error
                else:
                    usuario.username = nuevo_username
            
            usuario.first_name = informacion['first_name']
            usuario.last_name = informacion['last_name']
            usuario.email = informacion['email']

            # Manejo de contraseña
            if informacion.get('password1') and informacion['password1'] == informacion['password2']:
                usuario.set_password(informacion['password1'])  # Cambia la contraseña
                update_session_auth_hash(request, usuario)  # Mantiene la sesión activa
                messages.success(request, "Perfil actualizado y contraseña cambiada.")  # Mensaje de éxito
            else:
                messages.success(request, "Perfil actualizado correctamente.")  # Mensaje de éxito sin contraseña

            usuario.save() 
            return redirect('inicio')
    else: 
        miFormulario = UserEditForm(instance=usuario)  # Carga los datos actuales del usuario

    return render(request, "perfil.html", {"miFormulario": miFormulario, "usuario": usuario})

@login_required
def Cambiaravatar(request):
    usuario = request.user
    try:
        avatar = usuario.avatar
    except Avatar.DoesNotExist:
        avatar = None

    if request.method == 'POST':
        miFormulario = AvatarFormulario(request.POST, request.FILES, instance=avatar)
        if miFormulario.is_valid():
            nuevo_avatar = miFormulario.save(commit=False)  # No guardes todavía
            nuevo_avatar.user = usuario  # Asigna el usuario actual
            nuevo_avatar.save()  # Ahora guarda
            messages.success(request, "¡Avatar cambiado exitosamente!")  # Mensaje de éxito
            return redirect('inicio')
            
    else:
        miFormulario = AvatarFormulario(instance=avatar)

    return render(request, "cambiaravatar.html", {"miFormulario": miFormulario, "avatar": avatar})


# Vista para logout
@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "Has cerrado sesión.")
    return render(request, "login.html")

# Vista para gráficos
@login_required
def graficos(request):
    return render(request, "graficos.html")


# Vista para listas de tareas
@login_required
def listas(request):
    return render(request, "listadetareas.html")

# Vista para agregar tarea
@login_required
def agregartarea(request):
    if request.method == 'POST':
        form = TareaForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Tarea agregada con éxito.")
            return redirect('inicio')  # Cambia a la vista que desees
    else:
        form = TareaForm()
    return render(request, "index.html", {'form': form})

# Vista para filtrar tareas
@login_required
def filtrar(request):
    return render(request, "filtrar.html")

def completar_tarea(request, tarea_id):
    tarea = get_object_or_404(Tarea, id=tarea_id)
    if request.method == "POST":
        tarea.completada = True
        tarea.save()
    return render(request, "index.html")
