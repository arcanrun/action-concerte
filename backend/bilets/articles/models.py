from django.db import models

# Create your models here.
class Articles(models.Model):
    title=models.CharField(max_length=100)
    body=models.TextField()
    date=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    def snippet(self):
        return self.body[:50]
    
class Users_vk(models.Model):
    id_vk=models.TextField()
    Firstname=models.TextField()
    Lastname=models.TextField()
    points=models.TextField()
    active_tasks=models.TextField()
    failed_tasks=models.TextField()
    wasted=models.TextField()
    concerts=models.TextField()
    def __str__(self):
        return self.id_vk

class Tasks(models.Model):
   # id_task=models.IntegerField()
    task_point=models.TextField()
    task_title=models.TextField()
    id_concert=models.TextField()
    name_concert=models.TextField()
    list_id_users=models.TextField()
    winner=models.TextField()
    task_time=models.TextField()#timer
    

    gift_title=models.TextField()
    gift_description=models.TextField()
    gift_timeleft=models.TextField()
    gift_main=models.TextField()
    gift_points=models.TextField()
    def __str__(self):
        return self.gift_title
    



