# Invitación de colegiatura · V4

Sitio HTML estático para Vercel (Framework Preset: **Other**). Incluye función serverless `api/rsvp.js` conectada a Google Apps Script.

## Publicación

1. En GitHub, sustituir los archivos V3 por los de este ZIP, incluidos `api/rsvp.js`, `index.html`, `script.js`, `styles.css`, `admin.html` y `privacidad.html`. **Eliminar** `api/visit.js` y `schema.sql` de la V3 si permanecen.
2. Hacer commit en la rama `main`. Vercel debería desplegar automáticamente.
3. Abrir la página y hacer una prueba de Sí o No. Comprobar la fila en Google Sheets. Borrar la fila de prueba antes de compartir.

## Google Apps Script

El backend utiliza la URL /exec suministrada para esta invitación. No hace falta introducirla en la web. Opcionalmente se puede cambiar en Vercel mediante la variable `GOOGLE_SCRIPT_URL`.

El script de Apps Script debe estar implementado como aplicación web con **Ejecutar como: Yo** y **Acceso: Cualquier persona**, y su `doPost` debe aceptar JSON con `invitacion: "danery-colegiatura-2026"` y `respuesta: "Sí"` o `"No"` y devolver `{"ok":true}`. Si se modifica el script, actualizar su implementación.

## Limitaciones

- No hay seguimiento de aperturas ni almacenamiento de IP.
- No es posible asegurar quién pulsa el enlace si se reenvía. Una respuesta se atribuye a Dánery por diseño, no por verificación de identidad.
- El endpoint público admite respuestas no autenticadas y puede ser utilizado por otras personas que conozcan el enlace. Para un evento personal de una invitada es suficiente como prototipo, no como sistema de seguridad fuerte.
- La función confirma el registro solo si Apps Script devuelve `ok: true`. El panel `admin.html` enlaza a Google Sheets, no expone respuestas públicamente.


## Versión 5
El botón afirmativo es más grande. El botón negativo se desplaza solo unos píxeles dentro de la zona de botones, sin salirse de la pantalla del móvil. La conexión de Google Sheets se conserva.
