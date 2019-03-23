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

    id_concert = str(req['id_concert'])
    response = {'RESPONSE': []}

    all_data = Tasks.objects.all()
    arr_tasks = []
    for field in all_data:
        item = {}
        if field.id_concert == id_concert:
            item['id_task'] = field.id
            item['gift_title'] = field.gift_title
            item['task_point'] = field.task_point
            item['task_time'] = field.task_time
            item['task_title'] = field.task_title
            item['type_task'] = field.type_task
            item['list_id_users'] = field.list_id_users

            arr_tasks.append(item)
        response['RESPONSE'] = arr_tasks
    return JsonResponse(response)


def take_part_in(request):

    req = json.loads(str(request.body, encoding='utf-8'))
    print('RECIVEWD', req)
    id_vk = req['id_vk']
    id_task = req['id_task']

    try:
        all_data = Users_vk.objects.all()

        active_tasks = []
        for field in all_data:
            if instance(field.active_tasks, list):
                for i in range(len(field.activeactive_tasks)):
                    active_tasks.append(field.active_tasks[i])
                active_tasks.append(id_task)
            elif (id_task in active_tasks):
                for i in range(len(field.activeactive_tasks)):
                    active_tasks.append(field.active_tasks[i])
            else:
                active_tasks.append(id_task)

        for field in all_data:
            if id_vk == field.id_vk:
                userVk = Users_vk(id_vk=str(id_vk),
                                  active_tasks=str(active_tasks))
                userVk.save()
        return JsonResponse({'RESPONSE': 'SUCCESS'})
    except:
        return JsonResponse({'RESPONSE': 'error while add task'})
