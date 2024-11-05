from django import forms
from .models import Lista, Tarea,Avatar
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

# Formulario para la Lista
class ListaForm(forms.ModelForm):
    class Meta:
        model = Lista
        fields = ['nombre']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre de la lista'}),
        }

class TareaForm(forms.ModelForm):
    class Meta:
        model = Tarea
        fields = ['titulo', 'fecha_vencimiento','descripcion', 'prioridad', 'completada', 'lista']
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre de la tarea'}),
            'fecha_vencimiento': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'prioridad': forms.Select(attrs={'class': 'form-select'}),  # Cambiado a Select
            'completada': forms.Select(attrs={'class': 'form-select'}),
            'lista': forms.Select(attrs={'class': 'form-select'}),
            
        }


class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(label="Nombre", widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ingresa tu nombre'}))
    last_name = forms.CharField(label="Apellido", widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ingresa tu apellido'}))
    username = forms.CharField(label="Usuario", widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ingresa tu usuario'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Ingresa tu email'}))
    password1 = forms.CharField(label="Contraseña", widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Ingresa tu contraseña'}))
    password2 = forms.CharField(label="Repetir contraseña", widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Repite tu contraseña'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']
        help_texts = {k: "" for k in fields}
    
class UserEditForm(forms.ModelForm):
    password1 = forms.CharField(label='Contraseña', widget=forms.PasswordInput, required=False)
    password2 = forms.CharField(label='Repetir contraseña', widget=forms.PasswordInput, required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']
        labels = {
            'first_name': 'Nombre',
            'last_name': 'Apellido',
            'username': 'Nombre de usuario',
            'email': 'Correo electrónico',
        }
        help_texts = {k: "" for k in fields}

class AvatarFormulario(forms.ModelForm):
    class Meta:
        model = Avatar
        fields = ['imagen']
        labels = {
            'imagen': 'Imagen de perfil'
        }
        widgets = {
            'imagen': forms.FileInput(attrs={'class': 'form-control'})
        }
