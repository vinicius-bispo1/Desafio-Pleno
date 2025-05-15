# 📊 Projeto Financeiro - API de Transações

API desenvolvida com **NestJS** para registro, estatísticas e remoção de transações financeiras com base nos últimos 60 segundos, seguindo os princípios de **Clean Architecture** e **SOLID**.

---

### 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- TypeScript
- Class Validator
- Swagger
- Dotenv (variáveis de ambiente)

---

### 📁 Estrutura do Projeto

```
financeiro/
└── src/
    └── transactions/
        ├── controllers/
        │   └── transactions.controller.ts
        ├── use-cases/
        │   ├── create-transaction.use-case.ts
        │   ├── delete-all-transactions.use-case.ts
        │   └── get-statistics.use-case.ts
        ├── entities/
        │   └── transaction.entity.ts
        ├── repositories/
        │   └── in-memory-transaction.repository.ts
        ├── interfaces/
        │   └── transaction.repository.interface.ts
        ├── dto/
        │   └── create-transaction.dto.ts
        └── transactions.module.ts
```

---

### ⚙️ Configuração

1. **Clone o projeto**:

```bash
git clone https://github.com/seu-usuario/financeiro.git
cd financeiro
```

2. **Instale as dependências**:

```bash
yarn install
```

3. **Configure as variáveis de ambiente** criando um arquivo `.env`:

```
PORT=3000
NODE_ENV=development
```

---

### 🐳 Docker

1. **Build e execução com Docker Compose**:

```bash
docker-compose up --build
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

### 🧪 Testes

```bash
# Unitários
yarn test

# E2E
yarn test:e2e
```

---

### 📄 Documentação Swagger

Disponível em: [http://localhost:3000/api](http://localhost:3000/api)

---

### 🔌 Endpoints da API

#### ➕ Criar Transação

`POST /transactions`

**Body:**

```json
{
  "amount": 150.75,
  "timestamp": "2025-05-15T12:00:00.000Z"
}
```

- **201 Created**: Transação registrada
- **422**: Valor negativo ou timestamp no futuro

---

#### ❌ Deletar Transações

`DELETE /transactions`

- Remove todas as transações
- **200 OK**

---

#### 📊 Obter Estatísticas

`GET /statistics`

**Resposta:**

```json
{
  "count": 10,
  "sum": 1234.56,
  "avg": 123.45,
  "min": 12.34,
  "max": 456.78
}
```

- Apenas transações dos últimos 60 segundos são consideradas
- **200 OK**

---

### 👨‍💻 Autor

Desenvolvido por [Vinicius Bispo](https://github.com/vinicius-bispo1)
