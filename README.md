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

Artistas usam `POST /api/tracks` com JSON inicialmente (`title`, `genre`, `durationSec`, `audioUrl`, `coverUrl`). A camada `LocalStorageService` valida extensões e está pronta para ser substituída por S3/R2/MinIO; o controller de upload pode ser conectado ao mesmo serviço usando `multipart/form-data`.

## Dados e migrations

Em desenvolvimento, `synchronize` é habilitado para permitir boot sem scripts externos. Para produção, desabilite-o e gere/aplique migrations com TypeORM usando `DATABASE_URL`.

## Testes

`npm test`.
