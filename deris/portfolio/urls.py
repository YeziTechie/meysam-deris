from django.urls import path
from portfolio import views


urlpatterns = [
    path('', views.profile_page, name='profile'),
    path('photography/', views.photography_list, name='photography'),
    path('videography/', views.videography_list, name='videography'),
    path('contact/', views.contact_us, name='contact'),
    path('ai/', views.ai_list, name='ai'),
    path('carrier/', views.carrier, name='carrier'),
]
