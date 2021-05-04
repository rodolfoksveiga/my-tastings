from django.shortcuts import render


def home_view(request, *args, **kwargs):
    return render(request, 'home.html', {})


def about_view(request, *args, **kwargs):
    return render(request, 'about.html', {})


def login_view(request, *args, **kwargs):
    return render(request, 'login.html', {})
