# Setup

## Install dependencies

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

# Nico's configuration

## .env used

```
NUXT_SESSION_PASSWORD="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
NUXT_DB_FILE_NAME=file:local.db
NUXT_OMDB_API_KEY='c6bfa3ef'
```

## User and Password for login

```
nicolas.martin.rojo@gmail.com // 123123
```

## Comandos útiles (Docker)

A continuación hay comandos útiles para construir, ejecutar y compartir la imagen Docker de la aplicación.

Construir y levantar con docker compose:

```bash
# Usa tu .env o crea uno desde .env.example
docker compose up --build
```

Levantar en background (detached):

```bash
docker compose up --build -d
```

Ver logs:

```bash
docker compose logs --follow
```

Parar y eliminar contenedores/recursos creados por compose:

```bash
docker compose down
```

Exportar la imagen a un archivo tar para compartir:

```bash
docker save verimubi:local -o verimubi.tar
```

Taggear y subir a un registro (ej. Docker Hub):

```bash
# reemplaza yourrepo/verimubi por tu repositorio
docker tag verimubi:local yourrepo/verimubi:latest
docker push yourrepo/verimubi:latest
```

Eliminar imagen localmente:

```bash
docker image rm verimubi:local
```

Inspeccionar contenedores y estado:

```bash
docker ps -a
docker inspect <container-id>
```

Si necesitás que agregue instrucciones para `docker secret` o CI/CD, decime y las añado.
