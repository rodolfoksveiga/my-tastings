from django.shortcuts import render, get_object_or_404, redirect
from .models import Tasting
from .forms import TastingForm


def tastings_view(request, *args, **kwargs):
    queryset = Tasting.objects.all()
    context = {
        'obj_list': queryset
    }
    return render(request, 'tasting/tastings.html', context)


def tasting_view(request, id):
    obj = get_object_or_404(Tasting, id=id)
    context = {
        'obj': obj
    }
    return render(request, 'tasting/tasting.html', context)


def create_tasting_view(request, *args, **kwargs):
    form = TastingForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'tasting/create_tasting.html', context)


def update_tasting_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Tasting, id=id)
    form = TastingForm(request.POST or None, instance=obj)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'tasting/update_tasting.html', context)


def delete_tasting_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Tasting, id=id)
    if request.method == 'POST':
        obj.delete()
        return redirect('../../')
    context = {
        'obj': obj
    }
    return render(request, 'tasting/delete_tasting.html', context)
