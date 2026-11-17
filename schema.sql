create table if not exists public.respuestas (
 id bigint generated always as identity primary key,
 nombre text not null check (char_length(nombre) between 2 and 90),
 respuesta text not null check (respuesta in ('si','no')),
 created_at timestamptz not null default now()
);
alter table public.respuestas enable row level security;
-- No crear políticas públicas: la API del servidor usa una clave privada.
