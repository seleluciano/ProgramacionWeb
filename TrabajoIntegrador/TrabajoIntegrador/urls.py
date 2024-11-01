from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('checklist/', include('appchecklist.urls')),  # Incluye las URLs de appchecklist

]