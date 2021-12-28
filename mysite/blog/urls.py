from django.urls import path
from django.urls.conf import include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('blog',views.BlogView,basename="blog")
router.register('users',views.UserView,basename="user")

app_name = "blog"
urlpatterns = [
    path('',include(router.urls)),
    # path('user/register/',views.UserView.as_view(),name="create_user"),
    # path('user/',views.UserListView.as_view()),
    
]