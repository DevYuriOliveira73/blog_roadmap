# Blogging Platform API

API REST para gerenciamento de posts de blog, com autenticação de usuários. Baseado no projeto [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) do roadmap.sh, estendido com autenticação e uma arquitetura em camadas mais robusta.

## Objetivo do projeto

O foco principal deste projeto **não foi só entregar um CRUD de blog**, mas usar esse CRUD como pretexto para praticar uma arquitetura com melhor separação de responsabilidades — organizando o código em camadas bem definidas, cada uma com um único motivo para mudar.

O fluxo de uma requisição sempre segue a mesma direção, de fora para dentro:

```
Controller → Service → Repository → Prisma → Database
```

Essa estrutura foi escolhida já com um olho em arquiteturas mais avançadas, como **Clean Architecture**: o anel mais externo (Controller, que lida com HTTP) depende do anel logo abaixo (Service, que concentra a regra de negócio), que por sua vez depende do próximo anel (Repository, que abstrai o acesso a dados). Nenhuma camada pula direto para uma camada não adjacente, e a regra de negócio nunca depende de detalhes de infraestrutura como o Prisma ou o formato da requisição HTTP.

Outro objetivo pontual do projeto foi aprender a usar o **Prisma** na prática — desde a modelagem do schema até a geração de migrations e a integração com PostgreSQL — já que era uma ferramenta nova neste momento de aprendizado.

## Arquitetura

| Camada | Responsabilidade |
|---|---|
| **Route** | Define qual URL + método HTTP aciona qual Controller |
| **Controller** | Lida com entrada e saída HTTP: extrai dados da requisição, chama o Service, formata a resposta e o status code |
| **Service** | Concentra a regra de negócio: validações de domínio, orquestração de operações, decisões de permissão |
| **Repository** | Abstrai o acesso a dados, expondo métodos específicos (`findAll`, `create`, etc.) sem expor detalhes do ORM ao Service |
| **Prisma / Database** | Persistência dos dados, via PostgreSQL |

Camadas transversais que dão suporte às camadas principais, sem fazer parte da hierarquia acima:

- **DTOs + Zod** — schemas de validação de entrada, aplicados via middleware antes da requisição alcançar o Controller
- **Middlewares** — validação de payload e autenticação (JWT)
- **Utils** — funções auxiliares reutilizáveis (ex: remoção de senha do retorno de usuário)

## Stack

- **Runtime:** Node.js, com [tsx](https://github.com/privatenumber/tsx) para execução direta de TypeScript
- **Framework:** Express 5
- **Linguagem:** TypeScript
- **Gerenciador de pacotes:** Yarn
- **Módulos:** ESM (`"type": "module"`)
- **ORM:** Prisma
- **Banco de dados:** PostgreSQL, via Docker Compose
- **Validação:** Zod
- **Autenticação:** JWT (`jsonwebtoken`) + hash de senha com `bcrypt`

## Estrutura de pastas

```
src/
├── app.ts                 # monta o Express: middlewares, rotas, error handler
├── server.ts               # conecta ao banco e sobe o servidor
│
├── config/
│   ├── env.ts               # variáveis de ambiente centralizadas
│   └── database.ts          # conexão do Prisma com o banco
│
├── routes/
│   ├── index.ts              # agrega todas as rotas
│   ├── user.route.ts
│   ├── post.route.ts
│   └── auth.route.ts
│
├── controllers/
│   ├── user/
│   ├── post/
│   └── auth/
│
├── services/
│   ├── user/
│   ├── post/
│   └── auth/
│
├── repositories/
│   ├── user/
│   └── post/
│
├── dtos/                    # schemas Zod + tipos derivados
│
├── middleware/
│   ├── validation.middleware.ts
│   └── auth.middleware.ts
│
├── utils/
│
└── database/
    └── prisma.ts

prisma/
└── schema.prisma
```

## Modelagem do banco

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String
  password String
  posts    Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  subtitle  String?
  content   String
  category  String
  tags      String[]
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Todo `Post` está obrigatoriamente atrelado a um `User` (autor), via `authorId`.

## Endpoints

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Autentica usuário e retorna um JWT |

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/users/register` | Cria um novo usuário (senha é hasheada com bcrypt) |
| GET | `/api/users` | Lista todos os usuários (sem retornar senha) |
| GET | `/api/users/search-email?email=termo` | Busca usuários por trecho do email |

### Posts

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/users/:idUser/posts` | Cria um post vinculado a um usuário |
| GET | `/api/users/:idUser/posts` | Lista os posts de um usuário |
| GET | `/api/users/:idUser/posts/:idPost` | Busca um post específico |
| PATCH | `/api/users/:idUser/posts/:idPost` | Atualiza um post |
| DELETE | `/api/users/:idUser/posts/:idPost` | Remove um post |

## Autenticação

O fluxo de autenticação segue os seguintes passos:

1. **Cadastro** — a senha é hasheada com `bcrypt` antes de ser salva; nunca é armazenada em texto puro.
2. **Login** — compara a senha enviada com o hash salvo via `bcrypt.compare`; se válida, gera um JWT contendo o `id` do usuário.
3. **Rotas protegidas** — um middleware de autenticação decodifica o JWT enviado no header `Authorization`, validando o token e disponibilizando o `id` do usuário autenticado para o restante da requisição.

Por segurança, tanto "usuário não encontrado" quanto "senha incorreta" retornam a mesma mensagem de erro genérica no login, evitando que seja possível descobrir quais emails estão cadastrados.


## Como rodar o projeto

```bash
# entrar no diretorio
cd backend

# instalar dependências
yarn install

# subir o banco de dados via Docker
yarn docker:up

# rodar as migrations
npx prisma migrate dev

# subir o servidor em modo desenvolvimento
yarn dev

# Pode usar os arquivos que estão
- backend/REST_Client
```

## Melhorias futuras
1. Melhorar a robustez da autenticação (refresh token, expiração configurável, revogação de token)
1. Trabalhar a centralização e apresentação dos erros (hierarquia de classes de erro customizadas)
1. Trocar :idUser na URL das rotas de post pelo id extraído do JWT, evitando que um usuário crie posts em nome de outro
1. Adicionar paginação em GET /posts e GET /users
1. Implementar testes automatizados (unitários nos Services, integração nos endpoints)
