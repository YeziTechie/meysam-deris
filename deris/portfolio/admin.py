from django.contrib import admin
from .models import AI, Photography, Videography
from django.utils.html import format_html


@admin.register(Photography)
class PhotographyAdmin(admin.ModelAdmin):
    list_display = ('title', 'show_on_profile', 'priority', 'image_preview')
    list_editable = ('show_on_profile', 'priority')
    search_fields = ('title', 'description')
    ordering = ('-priority',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" style="border-radius:6px;">', obj.image.url)
        return "-"
    image_preview.short_description = "Preview"


@admin.register(Videography)
class VideographyAdmin(admin.ModelAdmin):
    list_display = ('title', 'show_on_profile', 'priority', 'video_preview')
    list_editable = ('show_on_profile', 'priority')
    search_fields = ('title', 'description')
    ordering = ('-priority',)

    def video_preview(self, obj):
        if obj.video:
            return format_html(
                '<video width="120" height="70" controls><source src="{}" type="video/mp4"></video>',
                obj.video.url
            )
        return "-"
    video_preview.short_description = "Preview"


@admin.register(AI)
class AIAdmin(admin.ModelAdmin):
    list_display = ('title', 'show_on_profile', 'priority', 'image_preview', 'video_preview')
    list_editable = ('show_on_profile', 'priority')
    search_fields = ('title', 'description')
    ordering = ('-priority',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" style="border-radius:6px;">', obj.image.url)
        return "-"
    image_preview.short_description = "Image"

    def video_preview(self, obj):
        if obj.video:
            return format_html(
                '<video width="120" height="70" controls><source src="{}" type="video/mp4"></video>',
                obj.video.url
            )
        return "-"
    video_preview.short_description = "Video"
