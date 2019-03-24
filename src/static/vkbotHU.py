# -*- coding: utf-8 -*-
import vk_api
import time
from vk_api.bot_longpoll import VkBotLongPoll, VkBotEventType
import json
import webbrowser







def main():

    vk_session = vk_api.VkApi(token='808167a38dfc3ca097347a9672b73f061077df289069c51b1933a324fb2b7ef3bc9a0f113dec50cbce9f5')
    vk_session._auth_token()
    longpoll = VkBotLongPoll(vk_session, '173756271')


  

    for event in longpoll.listen():

        if event.type == VkBotEventType.MESSAGE_NEW:
            print('Новое сообщение:')

            print('Для меня от: ', end='')

            print(event.obj.from_id)

            print('Текст:', event.obj.text)
            print()

        elif event.type == VkBotEventType.MESSAGE_REPLY:
            print('Новое сообщение:')

            print('От меня для: ', end='')

            print(event.obj.peer_id)

            print('Текст:', event.obj.text)
            print()

        elif event.type == VkBotEventType.MESSAGE_TYPING_STATE:
            print('Печатает ', end='')

            print(event.obj.from_id, end=' ')

            print('для ', end='')

            print(event.obj.to_id)
            print()

        elif event.type == VkBotEventType.GROUP_JOIN:
            print(event.obj.user_id, end=' ')
            #id = (event.obj.peer_id)

            
            print('Вступил в группу!')
            webbrowser.open('http://192.168.43.206:8000/articles/')
            #response = urllib.request.urlopen('http://127.0.0.1:8000/articles/')
            
            print()

        elif event.type == VkBotEventType.GROUP_LEAVE:
            print(event.obj.user_id, end=' ')

            print('Покинул группу!')
            print()

        else:
            print(event.type)
            print()




if __name__ == '__main__':
    main()



