from django.db import models


class BaseWork(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    show_on_profile = models.BooleanField(default=False)
    priority = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ['-priority']

    def __str__(self):
        return self.title


class AIPost(BaseWork):
    image = models.ImageField(upload_to='ai/images/', blank=True, null=True)
    video = models.FileField(upload_to='ai/videos/', blank=True, null=True)


class PhotographyPost(BaseWork):
    image = models.ImageField(upload_to='photography/', blank=False)


class VideographyPost(BaseWork):
    video = models.FileField(upload_to='videography/', blank=False)
