# Adonis Delivery API

API RESTful para sistema de delivery construída com AdonisJS 6, TypeScript e SQLite.

## 🚀 Tecnologias

- **AdonisJS 6** - Framework Node.js
- **TypeScript** - Tipagem estática
- **Lucid ORM** - ORM do AdonisJS
- **SQLite** - Banco de dados
- **Access Tokens** - Autenticação por token

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/andrepfdev/adonis-delivery.git

# Entre no diretório
cd adonis-delivery

# Instale as dependências
npm install

# Configure o arquivo .env
cp .env.example .env

# Execute as migrations
node ace migration:run

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📚 Endpoints da API

### Autenticação

#### Registrar Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com"
  },
  "token": {
    "type": "Bearer",
    "value": "oat_MQ.example_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login com sucesso",
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com"
  },
  "token": {
    "type": "Bearer",
    "value": "oat_MQ.example_token_here"
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "message": "Logout com sucesso"
}
```

#### Obter Usuário Autenticado
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-11-15T10:30:00.000Z"
  }
}
```

---

### Clientes

> **Nota:** Todos os endpoints de clientes requerem autenticação via token Bearer.

#### Listar Clientes
```http
GET /api/customers
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Maria Santos",
      "email": "maria@example.com",
      "phoneNumber": "11987654321",
      "cpf": "12345678900",
      "address": "Rua das Flores",
      "number": "123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01234-567",
      "status": true,
      "createdAt": "2025-11-15T10:30:00.000Z",
      "updatedAt": "2025-11-15T10:30:00.000Z"
    }
  ]
}
```

#### Obter Cliente por ID
```http
GET /api/customers/:id
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phoneNumber": "11987654321",
    "cpf": "12345678900",
    "address": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "status": true,
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-15T10:30:00.000Z"
  }
}
```

#### Criar Cliente
```http
POST /api/customers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phoneNumber": "11987654321",
  "cpf": "12345678900",
  "address": "Rua das Flores",
  "number": "123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "status": true
}
```

**Resposta (201):**
```json
{
  "message": "Customer created successfully",
  "data": {
    "id": 1,
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phoneNumber": "11987654321",
    "cpf": "12345678900",
    "address": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "status": true,
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-15T10:30:00.000Z"
  }
}
```

#### Atualizar Cliente
```http
PUT /api/customers/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Maria Santos Silva",
  "email": "maria.silva@example.com",
  "phoneNumber": "11987654321",
  "cpf": "12345678900",
  "address": "Rua das Flores",
  "number": "123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "status": true
}
```

**Resposta (200):**
```json
{
  "message": "Customer updated successfully",
  "data": {
    "id": 1,
    "name": "Maria Santos Silva",
    "email": "maria.silva@example.com",
    "phoneNumber": "11987654321",
    "cpf": "12345678900",
    "address": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "status": true,
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-16T14:20:00.000Z"
  }
}
```

#### Deletar Cliente
```http
DELETE /api/customers/:id
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "message": "Customer deleted successfully"
}
```

---

### Pedidos

> **Nota:** Todos os endpoints de pedidos requerem autenticação via token Bearer.

#### Criar Pedido
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2,
  "address": "Rua das Palmeiras, 456"
}
```

**Resposta (200):**
```json
{
  "message": "Pedido criado com sucesso!",
  "orderData": {
    "product_id": 1,
    "quantity": 2,
    "address": "Rua das Palmeiras, 456"
  },
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com"
  }
}
```

#### Obter Pedido por ID
```http
GET /api/orders/:id
Authorization: Bearer {token}
```

**Resposta (200):**
```json
{
  "message": "Order details",
  "orderId": 1,
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com"
  }
}
```

---

## 🔐 Autenticação

A API utiliza **Bearer Token** para autenticação. Após fazer login ou registro, você receberá um token que deve ser incluído no header de todas as requisições protegidas:

```
Authorization: Bearer {seu_token_aqui}
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **users** - Usuários do sistema
- **auth_access_tokens** - Tokens de acesso
- **customers** - Clientes
- **orders** - Pedidos
- **order_items** - Itens dos pedidos
- **products** - Produtos
- **payments** - Pagamentos

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Executar migrations
node ace migration:run

# Reverter migrations
node ace migration:rollback

# Limpar banco de dados
node ace migration:fresh

# Executar testes
npm test
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## ✨ Autor

**André** - [andrepfdev](https://github.com/andrepfdev)
