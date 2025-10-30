from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.core.mail import send_mail

from portfolio.models import Photography, Videography, AI


def photography_list(request):
    photos = Photography.objects.all().order_by('-priority')
    return render(request, 'photography.html', {'photos': photos})

def videography_list(request):
    videos = Videography.objects.all().order_by('-priority')
    return render(request, 'videography.html', {'videos': videos})

def ai_list(request):
    ai_items = AI.objects.all().order_by('-priority')
    return render(request, 'ai.html', {'ai_items': ai_items})

def profile_page(request):
    photos = Photography.objects.filter(show_on_profile=True).order_by('-priority')
    videos = Videography.objects.filter(show_on_profile=True).order_by('-priority')
    ai_items = AI.objects.filter(show_on_profile=True).order_by('-priority')
    return render(request, 'index.html', {
        'photos': photos,
        'videos': videos,
        'ai_items': ai_items
    })

def contact_us(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()

        if not (name and email and message):
            return JsonResponse({'status': 'error', 'message': 'All fields are required.'})

        full_message = f"From: {name} ({email})\n\n{message}"

        print('\n\n' + settings.EMAIL_HOST_USER + settings.EMAIL_HOST_PASSWORD + '\n\n')

        send_mail(
            subject="New Contact Form Message",
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
        )

        return JsonResponse({'status': 'success'})

    return render(request, 'contact-us.html')

