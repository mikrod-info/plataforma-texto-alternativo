---
layout: layouts/base.njk
title: Listado de posts
---

## Material disponible

Acá podés encontrar todos los textos alternativos publicados en el sitio.

<ul>
    {% for post in collections.posts %}
    <li>
        <a href="{{ post.url ]]">
            {{ post.data.title }}
        </a>
    </li>
    {% endfor %}
</ul>



