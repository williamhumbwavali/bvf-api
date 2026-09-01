# bvf API

API REST modular para a plataforma musical bvf, construída com NestJS, TypeScript, PostgreSQL e TypeORM.

## Desenvolvimento

```bash
cp .env.example .env
npm install
npm run start:dev
```

Com Docker: `docker compose up -d --build`.

- API: `http://localhost:3333/api`
- Swagger: `http://localhost:3333/docs`
- Banco: PostgreSQL em `localhost:5432`

## Autenticação

`POST /api/auth/register` e `POST /api/auth/login` retornam um JWT. Envie-o como `Authorization: Bearer <token>`. O segredo deve ter pelo menos 32 caracteres.


## Música

Artistas usam `POST /api/tracks` com JSON inicialmente (`title`, `genre`, `durationSec`, `audioUrl`, `coverUrl`). 

## Álbuns e playlists

Artistas podem criar um álbum e associar músicas próprias numa única chamada: `POST /api/albums` com `title`, campos opcionais `year` e `coverUrl`, e `trackIds` (array de UUIDs). Para adicionar mais músicas depois, use `POST /api/albums/:id/tracks` com `{ "trackIds": ["..."] }`; `DELETE /api/albums/:id/tracks/:trackId` remove a associação.

Para playlists autenticadas, `POST /api/playlists/:id/tracks` aceita várias músicas com `{ "trackIds": ["..."] }` e `DELETE /api/playlists/:id/tracks/:trackId` remove uma música. Apenas o dono pode modificar a playlist.

## Dados e migrations

Em desenvolvimento, `synchronize` é habilitado para permitir boot sem scripts externos. Para produção, desabilite-o e gere/aplique migrations com TypeORM usando `DATABASE_URL`.

## Testes

`npm test`.
