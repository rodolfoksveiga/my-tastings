from django.shortcuts import render, get_object_or_404, redirect
from .models import Category
from .forms import CategoryForm


def categories_view(request, *args, **kwargs):
    queryset = Category.objects.all()
    context = {
        'obj_list': queryset
    }
    return render(request, 'category/categories.html', context)


def category_view(request, id):
    obj = get_object_or_404(Category, id=id)
    context = {
        'obj': obj
    }
    return render(request, 'category/category.html', context)


def create_category_view(request, *args, **kwargs):
    form = CategoryForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'category/create_category.html', context)


def update_category_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Category, id=id)
    form = CategoryForm(request.POST or None, instance=obj)
    if form.is_valid():
        form.save()
        return redirect('../')
    context = {
        'form': form
    }
    return render(request, 'category/update_category.html', context)


def delete_category_view(request, id, *args, **kwargs):
    obj = get_object_or_404(Category, id=id)
    if request.method == 'POST':
        obj.delete()
        return redirect('../../')
    context = {
        'obj': obj
    }
    return render(request, 'category/delete_category.html', context)
