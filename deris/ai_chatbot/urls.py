# chat_app/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # This path matches the fetch URL in your JS: '/ai-endpoint/'
    path('ai-endpoint/', views.ai_chat_view, name='ai_chat_endpoint'),
]