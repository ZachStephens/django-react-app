from django.conf.urls import include, url  # noqa
from django.urls import re_path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views
from . import views


urlpatterns = [
    re_path(r'.*', include("exampleapp.urls"), name="exampleapp"),
    re_path(r'test', views.current_datetime),
    re_path("admin/", admin.site.urls, name="admin"),
    re_path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    re_path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
]
