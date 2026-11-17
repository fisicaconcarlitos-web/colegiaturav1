# Invitación para Dánery — Versión 6

Invitación responsive en dos pantallas, con apertura animada, detalles de ceremonia, cuenta regresiva, botones de respuesta y celebración visual.

## Publicación

Sube **el contenido** de esta carpeta a la raíz del repositorio de GitHub conectado a Vercel (Framework: Other). Incluye `api/rsvp.js`. Vercel publica los cambios de `main` automáticamente si la integración está activa.

## Registro

`POST /api/rsvp` envía la respuesta a Google Apps Script y a la hoja de Google Sheets configurada previamente. El servidor usa `GOOGLE_SCRIPT_URL` si existe en las variables de entorno de Vercel y, en su defecto, la URL incluida en `api/rsvp.js`. Antes de compartir la invitación, prueba una respuesta y comprueba la hoja.

La página no registra IP ni rastrea a otras personas. El enlace es compartible y el nombre de Dánery está fijo en la invitación: una respuesta no verifica la identidad de quien pulsó el botón. El aviso largo bajo la confirmación fue eliminado; conserva `privacidad.html` como página informativa accesible por URL.

## Cambios V6

- Eliminado el párrafo «Al responder, se registra tu elección...» de la pantalla final.
- Animación sutil del sobre y brillo en botón de apertura.
- Aparición escalonada de datos de ceremonia y contador de días.
- Confeti discreto cuando se selecciona «Sí».
- Botón afirmativo destacado y botón negativo limitado a su propia zona móvil.
- Respeto a la preferencia de movimiento reducido.
