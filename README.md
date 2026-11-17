# Invitación Colegiatura V2 · Dánery

## Publicar sin Codespaces

1. En GitHub, reemplaza los archivos de la versión anterior con los de esta carpeta. Conserva `index.html`, `styles.css`, `script.js`, `admin.html`, `privacidad.html`, `schema.sql`, `package.json` y la carpeta `api` en la raíz.
2. En Vercel usa Framework Preset **Other**, Root Directory `./`, y sin Build Command ni Output Directory personalizados.
3. El push a la rama `main` debería generar un despliegue automático si Git está conectado.

## Guardar respuestas y estadísticas opcionales

1. Crea un proyecto Supabase y ejecuta `schema.sql` en SQL Editor. Si ya tenías la tabla `respuestas` de V1, se conserva.
2. En Vercel > Settings > Environment Variables configura `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` y `ADMIN_TOKEN` (una contraseña larga y única).
3. Vuelve a desplegar. Visita `/admin.html` para consultar respuestas.
4. Las estadísticas solo se registran si la visitante acepta. No se almacena IP en la aplicación. El panel incluido muestra respuestas, no el detalle de visitas. Para contar visitas puedes consultar la tabla `visitas` en Supabase.

## Consideraciones

- La invitación está dirigida a Dánery, pero cualquiera que tenga el enlace puede abrirla. No hay forma fiable de identificar a una persona solo por IP; redes compartidas, VPN y conexiones móviles alteran esa información.
- El botón «No» se desplaza cuatro veces como animación lúdica, luego permite rechazar. Existe una alternativa accesible visible para rechazar directamente.
- La ceremonia está indicada como miércoles 25/11/2026, ingreso 18:00, inicio 19:00, auditorio Pedro Paulet Mostajo, Av. Independencia 150, Arequipa. No se ha incluido la instrucción de confirmación presencial del colegiado porque es distinta de la respuesta personal a esta invitación.
- Las respuestas no se almacenarán hasta conectar Supabase. El mensaje de la interfaz lo indicará.


## Versión 3
Se ajustaron textos para Dánery, se eliminó el enlace alternativo de rechazo y se aplicó una paleta minimalista azul grisáceo, marfil y salvia. La respuesta negativa sigue disponible mediante el botón «No podré» (con movimiento limitado).
