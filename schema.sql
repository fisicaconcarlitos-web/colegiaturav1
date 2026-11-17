create table if not exists public.respuestas (id bigint generated always as identity primary key,nombre text not null,respuesta text not null check (respuesta in ('si','no')),created_at timestamptz not null default now());
create table if not exists public.visitas (id bigint generated always as identity primary key,evento text not null check (evento in ('open','invitation_opened','respond_si','respond_no')),created_at timestamptz not null default now());
alter table public.respuestas enable row level security;
alter table public.visitas enable row level security;
-- No habilitar políticas públicas. Las escrituras se hacen solo en funciones del servidor.
