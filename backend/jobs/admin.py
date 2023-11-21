from django.contrib import admin

from backend.jobs.models import Offer, Company


class OfferAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["jobTitle"]}),
        (None, {"fields": ["company"]}),
        (None, {"fields": ["location"]}),
        ("Date information", {"fields": ["pub_date"], "classes": ["collapse"]}),
    ]
    inlines = []
    list_display = ["jobTitle", "pub_date", "was_published_recently"]
    list_filter = ["pub_date"]
    search_fields = ["jobTitle"]


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
