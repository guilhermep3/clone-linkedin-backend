# Clone LinkedIn - Back-End (EM DESENVOLVIMENTO)

Este projeto é um back-end de um clone do LinkedIn, desenvolvido com Node.js, Express, TypeScript e Prisma, com autenticação JWT e arquitetura organizada em rotas, controllers e middlewares.

O objetivo é recriar as principais funcionalidades de uma rede social profissional, como cadastro de usuários, empresas, experiências, certificados, vagas de emprego e sistema de seguidores.


## Tecnologias Utilizadas

- Node.js
- Express- Framework web
- Prisma ORM - Comunicação da API com o Banco de Dados
- Typescript - Tipagem estática
- JWT (jsonwebtoken) - Autenticação
- Zod - Validação de dados
- Helmet - Segurança no servidor
- CORS - Controle de acessos
- Multer - Upload de arquivos
- Bcrypt-ts - Criptografia de senhas


## Rotas principais

- **/auth** - autenticação (signup / signin)
- **/users**
- **/companies**
- **/posts**
- **/vacancies**
- **/notifications**
- **/feed**
- **/searching**
- **/trendings**
- **/suggestions**


## Tabelas do Banco de dados MySQL

- certificates
- companies
- company_employees
- educations
- experience_skills
- experience_validations
- experiences
- following
- post_comments
- post_likes
- post_media
- post_shares
- posts
- user_skills
- users
- vacancies


## Middlewares

- **verifyJWT**: Verfica o Token de autenticação e guarda o username do usuário
- **userMiddleware**: Guarda os dados do usuário autenticado


## Como usar

1. - **Clone o repositório e instale as dependências**

```bash
git clone https://github.com/seu-usuario/api_pratica_linkedin.git
cd api_pratica_linkedin
npm install
```

2. - **Criar arquivo .env na raíz do projeto**

```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/linkedin_clone"
JWT_SECRET="seu_segredo_aqui"
BASE_URL="http://localhost:3000"
PORT=3000
```

3. - **Rodar em modo desenvolvimento**

```bash
npm run dev
```