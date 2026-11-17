# Invitación de colegiatura — V1

## Contenido
- `index.html`: invitación adaptable a móvil.
- `styles.css`: diseño.
- `script.js`: confirmación Sí/No.
- `admin.html`: panel privado con totales y descarga CSV.
- `api/rsvp.js`: API serverless para Vercel.
- `schema.sql`: tabla Supabase.

## Publicación en Vercel
1. Descomprime el ZIP y sube esta carpeta a un repositorio GitHub.
2. En Vercel: **Add New > Project > Import** y selecciona el repositorio.
3. Framework preset: **Other**. Root Directory: raíz del proyecto. Deploy.
4. La página se visualizará, pero las confirmaciones reales **no se guardarán** hasta configurar Supabase.

## Habilitar confirmaciones persistentes
1. Crea un proyecto en Supabase y ejecuta `schema.sql` en SQL Editor.
2. En Vercel > Project Settings > Environment Variables configura:
   - `SUPABASE_URL`: URL de tu proyecto.
   - `SUPABASE_SERVICE_ROLE_KEY`: clave secreta de servicio (nunca poner en HTML o JavaScript público).
   - `ADMIN_TOKEN`: contraseña larga y aleatoria, solo para el administrador.
3. Vuelve a desplegar en Vercel.
4. Abre `/admin.html`, ingresa `ADMIN_TOKEN` y pulsa **Consultar respuestas**. Puedes exportar un CSV.

## Pruebas
- Abriendo `index.html` localmente, las respuestas se guardan **solo en ese navegador** con localStorage; no aparecen en el panel privado. Es un modo demostración.
- En Vercel, si falta configurar Supabase, aparecerá un error claro y no se simulará un registro exitoso.
- Para probar la API localmente con variables de entorno, instala Vercel CLI y ejecuta `vercel dev`.

## Antes de publicar la invitación definitiva
Personalizar: nombre del colegiado, persona destinataria, fecha, hora, ubicación, fotografías y mensaje. Actualmente el formulario permite múltiples respuestas con el mismo nombre; no autentica identidad ni evita duplicados. En una siguiente versión se puede crear un enlace único por invitado, controles de duplicados y límite de acompañantes.

## Seguridad
La clave de servicio se usa exclusivamente en la función serverless; la tabla tiene RLS habilitado sin políticas públicas. El panel requiere `ADMIN_TOKEN`. Para producción de alto tráfico, añadir límites de peticiones, controles antispam y autenticación administrativa más robusta.
