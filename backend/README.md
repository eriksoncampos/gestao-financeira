# 💰 API de Controle Financeiro

API RESTful desenvolvida em **Node.js** e **Express** para gerenciamento de finanças pessoais. O sistema permite a autenticação de usuários e o registro detalhado de movimentações financeiras (entradas e saídas), contando com documentação interativa via **Swagger** e monitoramento estruturado com **Pino**.

---

## 🚀 Funcionalidades

- **Autenticação e Segurança:** Cadastro de usuários, login com geração de token JWT e proteção de rotas privadas.
- **Gestão de Transações:** Criação, listagem, atualização e exclusão (CRUD) de registros financeiros.
- **Categorização:** Classificação de movimentações entre **Entradas** (receitas) e **Saídas** (despesas).
- **Resumo Financeiro:** Cálculo de saldo total, total de entradas e total de saídas por usuário.
- **Documentação Interativa:** Rotas e schemas documentados automaticamente com **Swagger**.
- **Observabilidade:** Logs estruturados de requisições HTTP e erros com **Pino** (com suporte a rotação de arquivos em produção).

---

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org)** & **[Express](https://expressjs.com)** — Estrutura base da API REST
- **[JWT (JSON Web Token)](https://jwt.io)** — Autenticação e controle de acesso
- **[Swagger (swagger-autogen / swagger-ui-express)](https://swagger.io)** — Documentação interativa da API
- **[Pino](https://getpino.io) & [pino-http](https://github.com)** — Sistema de logs de alta performance
- **[Nodemon](https://nodemon.io)** — Reinicialização automática em ambiente de desenvolvimento

---

## 📁 Estrutura do Projeto

```text
backend/
|__ __tests__                          # Configuração de testes   
├── logs/                              # Arquivos de log gerados em produção (ignorado no Git)
├── src/
│   ├── modules/                       # Regras de entrada e saída das requisições, modelos, rotas e serviços
│       ├── controle-financeiro/       
│       ├── users/                     
│   ├── shared/
│   │   └── database/                  # Configuração do DB, migrations e seeders
│   │   └── logger/                    # Configuração do Pino e pino-http
│   │   └── middlewares/               # Configuração de segurança em rotas
│   ├── app.js             # Configuração do Express e middlewares
│   └── server.js          # Inicialização do servidor
├── .env                   # Variáveis de ambiente
├── .sequelizerc           # Configuração do sequelize
├── swagger.js             # Script gerador da documentação Swagger
├── swagger-output.json    # Arquivo gerado com as especificações OpenAPI
├── .env.example           # Exemplo de variáveis de ambiente
└── package.json
```

---

## ⚙️ Pré-requisitos e Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com
   cd SEU_REPOSITORIO/backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz da pasta `backend` baseado no `.env.example`:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=sua_chave_secreta_aqui
   DATABASE_URL=sua_string_de_conexao_aqui
   LOG_LEVEL=debug
   ```

4. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *(Este comando gera automaticamente a documentação do Swagger e inicia o servidor com Nodemon).*

---

## 📚 Documentação da API (Swagger)

Com o servidor rodando, acesse a interface interativa do Swagger para testar todas as rotas diretamente pelo navegador:

👉 **http://localhost:3000/api-docs** *(ajuste caso sua rota do Swagger seja `/docs`)*

### Principais Endpoints

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `POST` | `/users/register` | Cadastra um novo usuário | Não |
| `POST` | `/users/login` | Realiza login e retorna o token JWT | Não |
| `GET` | `/transacoes` | Lista todas as entradas e saídas do usuário | Sim |
| `POST` | `/transacoes` | Registra uma nova entrada ou saída | Sim |
| `PUT` | `/transacoes/:id` | Atualiza uma movimentação existente | Sim |
| `DELETE` | `/transacoes/:id` | Remove uma movimentação | Sim |

---

## 📝 Monitoramento e Logs (Pino)

A aplicação utiliza o **Pino** para rastreamento de requisições HTTP, alertas e erros internos:

- **Desenvolvimento (`NODE_ENV=development`):** Os logs são formatados no terminal com cores (`pino-pretty`) a partir do nível `debug`.
- **Produção (`NODE_ENV=production`):** Os logs são gravados em formato JSON estruturado na pasta `/logs` na raiz do projeto, com rotação diária automática (`pino-roll`):
  - `logs/app.*.log` — Registra requisições HTTP e eventos gerais (`info`, `warn`, `error`, `fatal`).
  - `logs/error.*.log` — Isola apenas falhas e exceções críticas (`error` e `fatal`).

---

## 👨‍💻 Autor

Desenvolvido por **Erikson** — [GitHub](https://github.com/eriksoncampos/gestao-financeira.git)
