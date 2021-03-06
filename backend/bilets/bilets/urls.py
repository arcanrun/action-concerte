"""bilets URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from django.urls import path
from articles import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get-tasks/', views.get_tasks),
    path('take-part-in/', views.take_part_in),
    path('get-user/', views.get_user),
    path('get-your-tasks/', views.get_your_tasks),
    path('get-one-task/', views.get_one_task),
    path('get-all-users/', views.get_all_users),
    path('add-task/', views.add_task),
    path('ard/', views.ard),


]
