from django.shortcuts import render, get_object_or_404, redirect
from .models import Producer
from .forms import ProducerForm


def producers_view(request, *args, **kwargs):
    queryset = Producer.objects.all()
    context = {
        'obj_list': queryset
    }
    return render(request, 'producer/producers.html', context)


def producer_view(request, id):
    obj = get_object_or_404(Producer, id=id)
    context = {
        'obj': obj
    }
    return render(request, 'producer/producer.html', context)


def create_producer_view(request, *args, **kwargs):
    form = ProducerForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'producer/create_producer.html', context)


def update_producer_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Producer, id=id)
    form = ProducerForm(request.POST or None, instance=obj)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'producer/update_producer.html', context)


def delete_producer_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Producer, id=id)
    if request.method == 'POST':
        obj.delete()
        return redirect('../../')
    context = {
        'obj': obj
    }
    return render(request, 'producer/delete_producer.html', context)
