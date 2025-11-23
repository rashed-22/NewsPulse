from django.urls import path
from .views import ArticleList, ArticleDetail, ArticleDelete, proxy_news, image_proxy

urlpatterns = [
    path('', ArticleList.as_view()),
    path('<int:pk>/', ArticleDetail.as_view()),
    path('<int:pk>/delete/', ArticleDelete.as_view(), name='article-delete'),
    path('proxy/', proxy_news),
    path("image/", image_proxy),
]
