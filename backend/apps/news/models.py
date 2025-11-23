from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField(null=True, blank=True)
    url = models.URLField()
    source = models.CharField(max_length=100)
    published_at = models.DateTimeField()
    image_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title