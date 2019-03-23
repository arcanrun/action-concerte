from django.shortcuts import render
from .models import Tasks, Users_vk, Articles


from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.models import User, Group


import json


# Create your views here.
def article_list(request):
    # Users_vk.objects.get(id_vk='12122663').update(id_vk='22')
    articles = Articles.objects.all().order_by('id')
    return render(request, 'articles/article_list.html', {'articl': articles})


def addd(request):
    if request == 'qwe':

        return render(request, 'articles/article_list.html', {'articl': articles})


def get_tasks(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('--------', request)
    id_concert = str(req['id_concert'])
    print('--->', id_concert)
    response = {'RESPONSE': []}

    all_data = Tasks.objects.all()
    arr_tasks = []
    for field in all_data:
        item = {}
        if field.id_concert == id_concert:
            item['gift_title'] = field.gift_title
            item['task_point'] = field.task_point
            item['task_time'] = field.task_time
            item['task_title'] = field.task_title

            arr_tasks.append(item)
        response['RESPONSE'] = arr_tasks
    print(response)
    return JsonResponse(response)
