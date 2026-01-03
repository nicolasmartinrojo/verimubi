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

Descargar y ejecutar desde Docker Hub (ejemplo para `nicolasrojo/verimubi`):

```bash
# Pull desde Docker Hub
docker pull docker.io/nicolasrojo/verimubi:latest

# Ejecutar la imagen en el puerto 3000
docker run -p 3000:3000 \
	-e NUXT_SESSION_PASSWORD '<una-clave-larga-de-32-o-mas-caracteres>' \
	-e NUXT_DB_FILE_NAME 'file:local.db' \
	-e NUXT_OMDB_API_KEY '<tu-omdb-api-key>' \
	--name verimubi-run \
	docker.io/nicolasrojo/verimubi:latest
```

Etiquetas alternativas:

```bash
# Tag semántica / versión
docker tag verimubi:local docker.io/nicolasrojo/verimubi:v1.0.0
docker push docker.io/nicolasrojo/verimubi:v1.0.0
```

Notas:

- Asegurate de usar una contraseña para `NUXT_SESSION_PASSWORD` de al menos 32 caracteres (requisito de Nitro para sesiones).
- El `NUXT_DB_FILE_NAME` apunta a un archivo SQLite local; si corres en contenedor considera montar un volumen para persistencia.
- Si el repositorio es privado, ejecuta `docker login` antes de `docker push`.

Inspeccionar contenedores y estado:

```bash
docker ps -a
docker inspect <container-id>
```

Si necesitás que agregue instrucciones para `docker secret` o CI/CD, decime y las añado.
