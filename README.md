# Aim of this project

This project aimed to help students understand some aspect of long term projects :

-   legacy code
-   _not-so-clean_ code
-   patchwork of developers preferences
-   technical debt

I took the code from a group project that I made when I was a student at Centrale Marseille, with 3 other people. The back was in node.js, so I adapted it in Django in order to make it easier for students. There are some parts that I like about this projects, and some parts that I am not proud of. Anyway that's what I want to talk about: not perfect code, made by other people (including an old version of myself).

The rest of this read.me is the documentation of the project. It is deliberately incomplete: sometimes you will find this kind of documentation when you begin to work in a company.

# Zero XP: an internship website

The back is coded with Django (4.2.7) framework.

The front is coded with Angular 17. It uses Angular material framework.

## Build back

`python manage.py sqlmigrate jobs 0001`

`python manage.py migrate`

`python manage.py createsuperuser`

`python manage.py runserver`

## Build front

`npm i`

`npm run start`
