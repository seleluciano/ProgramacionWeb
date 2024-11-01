from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages

def Inicio(request):
    return render(request,"index.html")

# Vista para registro
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Inicia sesión automáticamente al registrarse
            messages.success(request, "Registro exitoso. ¡Bienvenido!")
            return redirect('inicio')
        else:
            messages.error(request, "Error al registrarse. Por favor, revisa los datos.")
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# Vista para login
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"¡Bienvenido {username}!")
                return redirect('inicio')
            else:
                messages.error(request, "Usuario o contraseña incorrectos.")
        else:
            messages.error(request, "Usuario o contraseña incorrectos.")
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# Vista para logout
def logout_view(request):
    logout(request)
    messages.info(request, "Has cerrado sesión.")
    return redirect('login')
