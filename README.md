# Plataforma de texto alternativo

## Menú hamburguesa accesible (PicoCSS)

- Estructura: `src/_includes/partials/nav.njk`
- Estilos: `src/css/styles.css`
- Comportamiento: `src/_includes/partials/head.njk` (script inline mínimo)

Contrato de accesibilidad que se debe mantener:

- Botón real (`<button>`) para abrir/cerrar menú.
- `aria-controls="primary-navigation"` para vincular botón y lista.
- `aria-expanded="true|false"` actualizado por JS.
- Cierre por `Escape`.
- Cierre al activar un enlace del menú.
- Cierre al hacer click fuera del `nav` en móvil.

Notas de mantenimiento:

- El estado visual depende solo de `data-open` en `<nav>`.
- Si se cambia el `id` del menú, actualizar también `aria-controls`.
- Mantener el texto oculto `.visually-hidden` para lectores de pantalla (TalkBack/NVDA/VoiceOver).
