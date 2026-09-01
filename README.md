# BVF API

Backend oficial da **BVF — Bad Vibes Forever**, uma plataforma de música construída para artistas, ouvintes e criadores.

A API fornece autenticação, gestão de utilizadores, artistas, músicas, álbuns, playlists, favoritos, reprodução, downloads e armazenamento de ficheiros através do **Cloudflare R2**.

## Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **TypeORM**
* **JWT**
* **bcrypt**
* **Swagger**
* **Docker**
* **Cloudflare R2**

---

## Funcionalidades

### Autenticação

* Registo de utilizadores
* Login
* Autenticação baseada em JWT
* Proteção de rotas privadas
* Hash seguro de passwords com bcrypt
* Alteração de password

### Utilizadores

* Perfil do utilizador
* Atualização de perfil
* Upload de avatar
* Alteração de password
* Consulta de músicas favoritas
* Histórico de reprodução
* Histórico de downloads

### Artistas

* Perfil de artista
* Criação e gestão de perfil
* Seguidores
* Seguir e deixar de seguir artistas
* Consulta das músicas do artista
* Consulta de álbuns do artista

### Música

* Upload de músicas
* Criação de músicas
* Atualização de músicas
* Eliminação de músicas
* Reprodução
* Contagem de reproduções
* Likes
* Remoção de likes
* Contagem de likes
* Downloads
* Contagem de downloads
* Géneros musicais
* Capas das músicas
* Associação a álbuns

### Álbuns

* Criação de álbuns
* Atualização de álbuns
* Eliminação de álbuns
* Associação de músicas
* Gestão de capas

### Playlists

* Criação de playlists
* Atualização de playlists
* Eliminação de playlists
* Adição de músicas
* Remoção de músicas
* Gestão de playlists do utilizador

### Favoritos

* Adicionar música aos favoritos
* Remover música dos favoritos
* Consultar músicas favoritas
* Persistência dos favoritos por utilizador

### Reprodução

* Registo de reproduções
* Histórico de reprodução
* Contagem de reproduções
* Tracks em tendência

### Downloads

* Download de músicas
* Registo de downloads
* Histórico de downloads
* Contagem de downloads

---

## Arquitetura

A API está organizada por módulos seguindo a arquitetura do NestJS:

```text
src/
├── auth/
├── users/
├── artists/
├── tracks/
├── albums/
├── playlists/
├── genres/
├── common/
├── database/
├── app.module.ts
└── main.ts
```

Cada domínio possui a sua própria responsabilidade, mantendo a API modular e fácil de evoluir.

---

## Requisitos

Antes de executar a API localmente, certifique-se de ter instalado:

* Node.js
* npm
* PostgreSQL
* Docker e Docker Compose — opcional

---

## Instalação

Clone o repositório e entre na pasta da API:

```bash
git clone <repository-url>
cd bvf-api
```

Instale as dependências:

```bash
npm install
```

Crie o ficheiro `.env`:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente.

---

## Variáveis de ambiente

Exemplo de configuração:

```env
NODE_ENV=development
PORT=3333

DATABASE_URL=postgres://bvf:bvf_password@localhost:5432/bvf

JWT_SECRET=replace-with-at-least-32-random-characters
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000

UPLOAD_DIR=./storage
MAX_UPLOAD_SIZE=52428800

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

### Descrição

| Variável               | Descrição                                  |
| ---------------------- | ------------------------------------------ |
| `NODE_ENV`             | Ambiente da aplicação                      |
| `PORT`                 | Porta utilizada pela API                   |
| `DATABASE_URL`         | URL de ligação ao PostgreSQL               |
| `JWT_SECRET`           | Chave utilizada para assinar os tokens JWT |
| `JWT_EXPIRES_IN`       | Tempo de expiração dos tokens              |
| `CORS_ORIGIN`          | Origem permitida para requests             |
| `UPLOAD_DIR`           | Diretório de armazenamento local           |
| `MAX_UPLOAD_SIZE`      | Tamanho máximo permitido para uploads      |
| `R2_ACCOUNT_ID`        | ID da conta Cloudflare                     |
| `R2_ACCESS_KEY_ID`     | Access Key do Cloudflare R2                |
| `R2_SECRET_ACCESS_KEY` | Secret Key do Cloudflare R2                |
| `R2_BUCKET_NAME`       | Nome do bucket utilizado pela BVF          |
| `R2_PUBLIC_URL`        | URL pública dos ficheiros armazenados      |

### Cloudflare R2

A BVF utiliza **Cloudflare R2** para armazenar os ficheiros enviados para a plataforma, incluindo:

* Ficheiros de áudio
* Capas de músicas
* Imagens de artistas
* Avatares
* Outros ficheiros associados ao conteúdo

As credenciais do R2 devem permanecer exclusivamente no backend.

Nunca exponha:

```env
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

no frontend ou no repositório.

A aplicação utiliza:

```env
R2_PUBLIC_URL=
```

para disponibilizar os ficheiros armazenados através da URL pública configurada.

### Limite de upload

O limite máximo configurado atualmente é de **50 MB**:

```env
MAX_UPLOAD_SIZE=52428800
```

---

## Base de dados

A BVF utiliza PostgreSQL como base de dados principal.

Exemplo:

```env
DATABASE_URL=postgres://bvf:bvf_password@localhost:5432/bvf
```

Em desenvolvimento, a aplicação pode sincronizar a estrutura das entidades automaticamente.

Para produção, recomenda-se utilizar migrations e:

```text
synchronize=false
```

---

## Executar PostgreSQL com Docker

Se preferir executar apenas o PostgreSQL através do Docker:

```bash
docker compose up -d postgres
```

Verifique os containers:

```bash
docker compose ps
```

---

## Seeds

A BVF possui um seed para popular os géneros musicais iniciais.

Execute:

```bash
npm run seed:genres
```

O comando utilizado internamente é:

```bash
ts-node src/database/seeds/run.ts
```

---

## Executar em desenvolvimento

Depois de configurar o `.env`:

```bash
npm install
```

Execute os géneros:

```bash
npm run seed:genres
```

Inicie a API:

```bash
npm run start:dev
```

A API estará disponível em:

```text
http://localhost:3333
```

A base da API é:

```text
http://localhost:3333/api
```

---

## Docker

Para executar toda a aplicação através do Docker Compose:

```bash
docker compose up -d --build
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para parar os serviços:

```bash
docker compose down
```

---

## API

A API utiliza REST e JSON.

Base URL:

```text
/api
```

### Autenticação

As rotas privadas utilizam:

```http
Authorization: Bearer <token>
```

Exemplo:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Principais recursos

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Utilizadores

```text
GET   /api/users/me
PATCH /api/users/me
PATCH /api/users/me/password
GET   /api/users/me/likes
GET   /api/users/me/history
GET   /api/users/me/downloads
```

### Artistas

```text
GET   /api/artists
GET   /api/artists/:id
GET   /api/artists/me
POST  /api/artists
PATCH /api/artists/:id
DELETE /api/artists/:id
```

### Música

```text
GET    /api/tracks
GET    /api/tracks/:id
POST   /api/tracks
PATCH  /api/tracks/:id
DELETE /api/tracks/:id
```

Operações relacionadas:

```text
POST /api/tracks/:id/play
POST /api/tracks/:id/like
DELETE /api/tracks/:id/like
GET /api/tracks/:id/likes
```

Uploads:

```text
POST /api/tracks/upload-url
```

### Álbuns

```text
GET    /api/albums
GET    /api/albums/:id
POST   /api/albums
PATCH  /api/albums/:id
DELETE /api/albums/:id
```

### Playlists

```text
GET    /api/playlists
GET    /api/playlists/:id
POST   /api/playlists
PATCH  /api/playlists/:id
DELETE /api/playlists/:id
```

### Géneros

```text
GET /api/genres
```

> A lista acima representa os principais recursos da API. Consulte o Swagger para obter a documentação completa e atualizada dos endpoints, parâmetros, DTOs e respostas.

---

## Uploads

Os uploads de ficheiros utilizam o Cloudflare R2.

O fluxo de upload permite que a aplicação obtenha uma URL de upload e depois envie o ficheiro diretamente para o storage.

Exemplo de resposta:

```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://...",
    "publicUrl": "https://...",
    "key": "tracks/example.mp3"
  },
  "message": "Upload URL generated successfully"
}
```

A API mantém as referências aos ficheiros através das URLs, enquanto os ficheiros binários são armazenados no R2.

---

## Segurança

A API implementa diversas medidas de segurança:

* JWT para autenticação
* Passwords armazenadas com bcrypt
* Proteção de endpoints privados
* Validação de DTOs
* CORS configurável
* Verificação de propriedade dos recursos
* Limite de tamanho de uploads
* Credenciais de storage mantidas no backend
* Separação entre frontend e backend

Operações como editar ou eliminar músicas, álbuns e playlists são protegidas no backend para garantir que apenas o proprietário autorizado possa modificar os recursos.

---

## Swagger

A API possui documentação interativa através do Swagger.

Com a aplicação em execução, acesse:

```text
http://localhost:3333/docs
```

A documentação permite:

* Consultar endpoints
* Visualizar DTOs
* Testar requests
* Consultar respostas
* Autorizar requests utilizando JWT

Depois de fazer login, utilize o token através do botão **Authorize** no Swagger.

---

## Estrutura de dados

A API utiliza entidades relacionadas para representar os principais recursos da plataforma:

```text
User
 ├── Likes
 ├── Playlists
 ├── Playback History
 └── Download History

Artist
 ├── Tracks
 ├── Albums
 └── Followers

Track
 ├── Artist
 ├── Album
 ├── Genre
 ├── Likes
 ├── Playback History
 └── Download History

Album
 └── Tracks

Playlist
 └── Tracks

Genre
 └── Tracks
```

---

## Fluxo de autenticação

O fluxo básico de autenticação é:

```text
Register
   ↓
Login
   ↓
JWT
   ↓
Authorization: Bearer <token>
   ↓
Protected API
```

O frontend utiliza o token JWT para realizar requests autenticados.

---

## Fluxo de upload

```text
Frontend
   │
   │ Request upload URL
   ▼
BVF API
   │
   │ Generate R2 upload URL
   ▼
Cloudflare R2
   │
   │ Upload file
   ▼
R2
   │
   │ Public URL
   ▼
Frontend / BVF API
```

Este modelo permite separar o processamento da API do armazenamento dos ficheiros.

---

## Desenvolvimento

Para iniciar rapidamente um ambiente de desenvolvimento:

```bash
cp .env.example .env
npm install
npm run seed:genres
npm run start:dev
```

API:

```text
http://localhost:3333/api
```

Swagger:

```text
http://localhost:3333/docs
```

---

## Produção

Antes de colocar a API em produção:

* Defina um `JWT_SECRET` forte e aleatório.
* Não utilize credenciais de desenvolvimento.
* Configure corretamente o PostgreSQL.
* Configure o Cloudflare R2.
* Utilize migrations.
* Desative `synchronize`.
* Configure corretamente o CORS.
* Mantenha as credenciais do R2 exclusivamente no backend.
* Configure HTTPS através do ambiente de deployment.
* Não faça commit do `.env`.

---

## Estado do projeto

A BVF API encontra-se em desenvolvimento ativo e já possui a infraestrutura principal necessária para alimentar a plataforma BVF.

O backend suporta atualmente:

* Autenticação
* Utilizadores
* Artistas
* Música
* Álbuns
* Playlists
* Favoritos
* Reprodução
* Downloads
* Géneros
* Uploads
* Cloudflare R2
* Swagger
* PostgreSQL
* Docker

---

## Licença

Este projeto é distribuído sob a licença definida no repositório.

Consulte o ficheiro `LICENSE` para obter os termos completos.

---

## BVF

**Bad Vibes Forever**

Uma plataforma de música construída para dar aos artistas e ouvintes uma experiência simples, moderna e independente.
