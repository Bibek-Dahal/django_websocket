from django.urls import path
from django.urls.conf import include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('blog',views.BlogView,basename="blog")
router.register('users',views.UserView,basename="user")
from .views import MyTokenObtainPairView
app_name = 'api'


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('',include("blog.urls",namespace="blog")),
    path('add/',views.BlogImageView.as_view()),
    path('',include(router.urls)),
]


