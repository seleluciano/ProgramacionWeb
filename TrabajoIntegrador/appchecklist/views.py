from django.shortcuts import redirect, get_object_or_404, render
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from .models import Tarea, Lista, Avatar
from .forms import UserRegisterForm, UserEditForm, TareaForm, ListaForm, AvatarFormulario
from django.contrib.auth.models import User

@login_required
def inicio(request):
    return render(request, 'index.html')

def Iniciosesion(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            usuario = form.cleaned_data.get('username')
            contrasenia = form.cleaned_data.get('password')
            user = authenticate(username=usuario, password=contrasenia)
            if user is not None:
                login(request, user)
                messages.success(request, f"Bienvenido {usuario}!")
                return redirect('inicio')
            else:
                messages.error(request, "Datos incorrectos")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {'form': form, 'hide_navbar': True})

def Registrarusuario(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Usuario creado exitosamente :)")
            return redirect('inicio')
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
                    messages.error(request, "El nombre de usuario ya está en uso.")
                else:
                    usuario.username = nuevo_username
            usuario.first_name = informacion['first_name']
            usuario.last_name = informacion['last_name']
            usuario.email = informacion['email']
            if informacion.get('password1') and informacion['password1'] == informacion['password2']:
                usuario.set_password(informacion['password1'])
                update_session_auth_hash(request, usuario)
                messages.success(request, "Perfil actualizado y contraseña cambiada.")
            else:
                messages.success(request, "Perfil actualizado correctamente.")
            usuario.save()
            return redirect('inicio')
    else:
        miFormulario = UserEditForm(instance=usuario)
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
            nuevo_avatar = miFormulario.save(commit=False)
            nuevo_avatar.user = usuario
            nuevo_avatar.save()
            messages.success(request, "¡Avatar cambiado exitosamente!")
            return redirect('inicio')
    else:
        miFormulario = AvatarFormulario(instance=avatar)
    return render(request, "cambiaravatar.html", {"miFormulario": miFormulario, "avatar": avatar})

@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "Has cerrado sesión.")
    return redirect('iniciarsesion')

@login_required
def graficos(request):
    return render(request, "graficos.html")

@login_required
def agregar_tarea(request):

    if request.method == 'POST':
        form = TareaForm(request.POST)
        if form.is_valid():
            nueva_tarea = form.save(commit=False)
            nueva_tarea.usuario = request.user
            nueva_tarea.save()
            messages.success(request, "Tarea agregada exitosamente.")
            return redirect('inicio')
    else:
        form = TareaForm()
        messages.success(request, "No se pudo agregar la tarea, intente nuevamente")

    return render(request, 'index.html', {'form': form})

@login_required
def filtrar_tareas(request):
    tareas = Tarea.objects.filter(usuario=request.user)
    filtro_titulo = request.GET.get('filtro_titulo')
    filtro_descripcion = request.GET.get('filtro_descripcion')
    filtro_lista = request.GET.get('filtro_lista')
    filtro_fecha = request.GET.get('filtro_fecha')
    filtro_dificultad = request.GET.get('filtro_dificultad')

    if filtro_titulo:
        tareas = tareas.filter(titulo__icontains=filtro_titulo)
    if filtro_descripcion:
        tareas = tareas.filter(prioridad__icontains=filtro_descripcion)
    if filtro_lista:
        tareas = tareas.filter(lista_id=filtro_lista)
    if filtro_fecha:
        tareas = tareas.filter(fecha_vencimiento=filtro_fecha)
    if filtro_dificultad:
        tareas = tareas.filter(dificultad=filtro_dificultad)

    return render(request, 'index.html', {'tareas': tareas})

@login_required
def agregar_lista(request):
    if request.method == 'POST':
        form = ListaForm(request.POST)
        if form.is_valid():
            nueva_lista = form.save(commit=False)
            nueva_lista.usuario = request.user
            nueva_lista.save()
            messages.success(request, "Lista agregada exitosamente.")
            return redirect('listas')
    else:
        form = ListaForm()
    return render(request, 'index.html', {'form': form})

@login_required
def completar_tarea(request, tarea_id):
    tarea = get_object_or_404(Tarea, id=tarea_id, usuario=request.user)
    if request.method == "POST":
        tarea.completada = True
        tarea.save()
        messages.success(request, "Tarea completada exitosamente.")
        return redirect('inicio')

@login_required
def listas(request):
    return render(request, 'listas.html')

@login_required
def modificar_lista(request, lista_id):
    # Obtener la lista específica o retornar un 404 si no existe
    lista = get_object_or_404(Lista, id=lista_id, usuario=request.user)

    if request.method == 'POST':
        form = ListaForm(request.POST, instance=lista)
        if form.is_valid():
            form.save()
            messages.success(request, 'La lista se ha modificado exitosamente.')
            return render(request, 'listas.html')
        else:
            messages.error(request, 'Hubo un error al modificar la lista. Por favor, revisa los campos.')
    else:
        form = ListaForm(instance=lista)

    return render(request, 'listas.html', {'form': form, 'lista': lista})

@login_required
def modificar_tarea(request, tarea_id):
    # Obtener la tarea específica o retornar un 404 si no existe
    tarea = get_object_or_404(Tarea, id=tarea_id, usuario=request.user)

    if request.method == 'POST':
        form = TareaForm(request.POST, instance=tarea)
        if form.is_valid():
            form.save()
            messages.success(request, 'La tarea se ha modificado exitosamente.')
            return redirect('inicio')  
        else:
            messages.error(request, 'Hubo un error al modificar la tarea. Por favor, revisa los campos.')
    else:
        form = TareaForm(instance=tarea)

    return render(request, 'index.html', {'form': form, 'tarea': tarea})

@login_required
def eliminar_tarea(request, tarea_id):
    tarea = get_object_or_404(Tarea, id=tarea_id, usuario=request.user)
    tarea.delete()
    messages.success(request, "Tarea eliminada exitosamente.")
    return redirect('inicio')

@login_required
def eliminar_lista(request, lista_id):
    lista = get_object_or_404(Lista, id=lista_id, usuario=request.user)
    lista.delete()
    messages.success(request, "Lista eliminada exitosamente.")
    return redirect('listas')
