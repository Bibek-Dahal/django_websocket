from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Status
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


# async_to_sync(channel_layer.group_send)("chat", {"type": "chat.force_disconnect"})
@receiver(post_save,sender= Status)
def send_signal(sender,instance,created,**kwargs):
    if not created:
        print(instance.user.username)
        print('updated')
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(f"chat_{instance.user.username}", {
                'type': 'msg',
                'message': f"hello i am from signal {instance.user.username}"
            })
        