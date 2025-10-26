from django.urls import path
from portfolio import views

urlpatterns = [
    path('', views.profile_page, name='profile_page'),
    path('photography/', views.photography_list, name='photography_list'),
    path('videography/', views.videography_list, name='videography_list'),
    path('ai/', views.ai_list, name='ai_list'),
    path('contact/', views.contact_form, name='contact_form'),
]
