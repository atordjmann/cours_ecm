from django.contrib import admin

from jobs.models import Offer, Company


class OfferAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["title"]}),
        (None, {"fields": ["company"]}),
        (None, {"fields": ["location"]}),
        (None, {"fields": ["srcImgCompany"]}),
        (None, {"fields": ["sector"]}),
        (None, {"fields": ["type"]}),
        (None, {"fields": ["description"]}),
        (None, {"fields": ["remuneration"]}),
        (None, {"fields": ["duration"]}),
        (None, {"fields": ["softSkills"]}),
        (None, {"fields": ["domains"]}),
        (None, {"fields": ["start_date"]}),
        ("Date information", {"fields": ["created_date"], "classes": ["collapse"]}),
    ]
    inlines = []
    list_display = ["title", "company", "created_date", "was_published_recently"]
    list_filter = ["created_date"]
    search_fields = ["title"]


class CompanyAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["login"]}),
        (None, {"fields": ["hash"]}),
        (None, {"fields": ["name"]}),
        ("Date information", {"fields": ["createdDate"], "classes": ["collapse"]}),
    ]
    inlines = []
    list_display = ["name"]
    list_filter = ["name"]
    search_fields = ["name"]


admin.site.register(Offer, OfferAdmin)
admin.site.register(Company, CompanyAdmin)
