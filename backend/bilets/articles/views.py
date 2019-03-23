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
    # print('RECIVED', req)
    id_vk = req['id_vk']
    id_task = req['id_task']

    # try:
    all_data = Users_vk.objects.all()

    active_tasks = []
    # for field in all_data:

    #     if isinstance(encField, list) and not (id_task in encField):
    #         print(encField)
    #         print(isinstance(encField, list))
    #         print((id_task in encField))

    #         active_tasks.append(id_task)
    #     elif isinstance(encField, list) and (id_task in encField):
    #         pass
    #     # else:
    #     #     print('0----------', active_tasks)
    #     #     active_tasks.append(id_task)
    #     #     print('1----------', active_tasks)

    for field in all_data:
        encField = json.loads(field.active_tasks)
        if str(field.id_vk) == str(id_vk):
            if isinstance(encField, list) and not (id_task in encField):
                encField.append(id_task)
                Users_vk.objects.filter(id_vk=id_vk).update(
                    active_tasks=json.dumps(encField))

            elif not isinstance(encField, list):

                Users_vk.objects.filter(id_vk=id_vk).update(
                    active_tasks=json.dumps([id_task]))

    return JsonResponse({'RESPONSE': 'SUCCESS'})
    # except:
    # return JsonResponse({'RESPONSE': 'error while add task'})
