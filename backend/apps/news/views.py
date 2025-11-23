from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

import requests
from django.http import JsonResponse
from django.conf import settings

import base64
from django.http import HttpResponse



def image_proxy(request):
    url = request.GET.get("url")
    if not url:
        return HttpResponse(status=400)

    try:
        img = requests.get(url, timeout=5)
        return HttpResponse(img.content, content_type=img.headers.get("content-type"))
    except:
        return HttpResponse(status=404)
    


def proxy_news(request):
    API_KEY = settings.NEWS_API_KEY

    page = request.GET.get("page", "1")
    query = request.GET.get("q", "")
    category = request.GET.get("category", "")

    # Base URL
    base_url = "https://newsapi.org/v2/top-headlines"

    # Build dynamic query params
    params = {
        "apiKey": API_KEY,
        "country": "us",
        "page": page,
        "pageSize": 20,
    }

    # Add category if provided
    if category:
        params["category"] = category

    # OR search mode
    if query:
        base_url = "https://newsapi.org/v2/everything"
        params.pop("country", None)
        params["q"] = query

    response = requests.get(base_url, params=params)
    return JsonResponse(response.json(), safe=False)




class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDelete(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
