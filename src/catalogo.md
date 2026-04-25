---
layout: layouts/base.njk
title: Catálogo
---

{% from "partials/catalog-tree.njk" import renderTree %}

## Navegación por materia y año

Para acceder a los textos alternativos, desplegá cada materia y luego el año correspondiente.

<div class="catalog-wrapper">
  {{ renderTree(collections.catalogTree) }}
</div>
