# Bella Store 

> E-commerce completo construido com **React + TypeScript + Node/Express + Tailwind CSS**. Inclui exibicao de produtos, filtros por categoria, carrinho de compras, login e **criacao de contas Cliente/Fornecedor**.
> Incluindo o cypress como ferramenta de automacao.
---

## Avisos:

> Este projeto **NAO** usa banco de dados, os dados são armazenados em localstorage
---

## Funcionalidades

- **Pagina Inicial** com banner, categorias em destaque e grid de produtos
- **Modal de Navegacao** (menu hamburguer): Home, Categorias, Carrinho, Login e **Criar Conta**
- **Filtro por Categorias** (Roupas, Acessorios, Eletronicos, Casa)
- **Carrinho de Compras** em modal e pagina dedicada (ajustar qtd, remover, subtotal)
- **Login de usuarios**
  - Contas mock de demonstracao via API
  - Contas cadastradas no cache do navegador
- **Criar Conta** com **toggle (selecao)** entre:
  - **Cliente** (nome, telefone, endereco)
  - **Fornecedor** (nome da loja, telefone, endereco)
  - Os campos mudam automaticamente conforme a opcao selecionada
- **Exibicao do nome do usuario logado** no cabecalho
- **Responsivo** (desktop, tablet e mobile)
- **Persistencia** de carrinho e sessao no `localStorage`

---

## Stack Tecnologica

**Frontend**
- React 19 + TypeScript
- Vite (build tool)
- React Router v6 (roteamento)
- Tailwind CSS 3 (estilos)
- Zustand (gerenciamento de estado)
- Lucide React (icones)
- Fontes: Playfair Display (titulos) + Poppins (corpo)
- **Cadastros 100% locais via `localStorage`** (sem backend persistente)

**Backend (API)**
- Node.js + Express 4
- TSX (execucao TypeScript em modo watch)
- Dados mockados em memoria (sem banco de dados)

---

## Como Executar

### 1. Pre-requisitos

- Node.js (versao 18+ recomendada)
- npm (vem junto com Node.js)

### 2. Instalar dependencias

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

No Windows PowerShell, use a versao `.cmd` caso haja restricao de execucao:

```powershell
npm.cmd install
```

### 3. Iniciar o projeto (FRONTEND + API juntos - recomendado)

```bash
npm run dev
```

No Windows PowerShell:

```powershell
npm.cmd run dev
```

Isso iniciara:

- **Frontend (Vite):** http://localhost:5173/
- **API (Express + TSX watch):** http://localhost:4000

> O Vite faz proxy automatico de `/api/* -> localhost:4000` no frontend.

#### Outros comandos

| Comando               | Descricao                                       |
|-----------------------|-------------------------------------------------|
| `npm run dev:web`     | Inicia SOMENTE o frontend (Vite)                |
| `npm run dev:api`     | Inicia SOMENTE a API (Express + TSX watch)      |
| `npm run check`       | Valida os tipos TypeScript                      |
| `npm run build`       | Gera build de producao                          |
| `npm run preview`     | Visualiza a build de producao                   |
| `npm run lint`        | Roda o ESLint                                   |
| `npm run cy:open`     | Abre o Cypress em modo interativo               |
| `npm run cy:run`      | Executa a suite Cypress em modo headless        |
| `npm run test:e2e`    | Sobe a aplicacao e roda os testes E2E           |

---

## Testes E2E com Cypress

Estrutura utilizada para os testes automatizados:


---

## Credenciais de Demonstracao (Login via API)

Estes usuarios vem mockados da API (servidor). Eles nao ficam no cache do navegador - existem enquanto o servidor da API estiver rodando.

| E-mail                 | Senha     | Tipo da conta   | Nome exibido                   |
|--------------------------|-----------|------------------|---------------------------------|
| `usuario@exemplo.com`    | `123456`  | **Cliente**      | Maria Silva                     |
| `admin@exemplo.com`      | `admin`   | **Fornecedor**   | Joao Administrador (Bella Store Fornecedores) |

> Voce pode logar tanto com essas credenciais quanto com contas criadas no proprio site (salvas no cache do seu navegador).

---

## Como Criar Conta (Cliente ou Fornecedor)

A criacao de conta e feita **atraves de um Modal** e possui um **toggle (botao de selecao)** no topo para voce escolher o tipo de usuario. Os campos do formulario **mudam automaticamente** conforme a opcao selecionada.

### Como abrir o modal de Criar Conta:

1. **Menu hamburguer (Navegacao):**
   - Clique no botao de menu no canto superior esquerdo -> **Criar conta**

2. **Modal de Login:**
   - Clique em **"Entrar"** (cabecalho) ou **"Fazer login"** (menu)
   - No rodape do modal clique no botao **"Nao tem conta? Criar agora"**

### Opcao: Sou Cliente - campos do formulario
| Campo                  | Obrigatorio |
|--------------------------|-------------|
| E-mail                   | Sim           |
| Senha (min. 4 caracteres) | Sim           |
| Confirmar senha          | Sim           |
| Nome completo            | Sim           |
| Telefone                 | Sim           |
| Endereco completo        | Sim           |

### Opcao: Sou Fornecedor - campos do formulario
| Campo                      | Obrigatorio |
|------------------------------|-------------|
| E-mail                       | Sim           |
| Senha (min. 4 caracteres)   | Sim           |
| Confirmar senha              | Sim           |
| **Nome da loja** (no lugar do nome pessoal) | Sim |
| Telefone                     | Sim           |
| Endereco completo            | Sim           |

### Funcionamento interno:
1. **Validacao** (e-mail formato valido, senha >= 4 caracteres, confirmacao igual a senha)
2. **Busca por duplicatas** (verifica se ja existe uma conta com o mesmo e-mail salva no cache do navegador)
3. **Salva no localStorage**
   - Chave `loja-simples:usuarios-cadastrados` -> lista de usuarios cadastrados
   - Chave `loja-simples:usuario` -> sessao do usuario atualmente logado
4. **Ja loga automaticamente** apos cadastro com sucesso

---

## API REST

Base URL: `http://localhost:4000` (ou `/api` diretamente no frontend)

> Observacao: o endpoint `/api/cadastro` **existe na API** por conveniencia, mas o **frontend nao o usa**. O cadastro e feito 100% no cache.

### 1. Health Check
```
GET /api/health
```

**Exemplo:**
```bash
curl http://localhost:4000/api/health
```
**Resposta (200):**
```json
{ "status": "ok" }
```

---

### 2. Listar todos os produtos
```
GET /api/produtos
```

**Query params (opcional):**

| Parametro   | Tipo   | Descricao                                                               |
|-------------|--------|-------------------------------------------------------------------------|
| `categoria` | string | Filtra por slug de categoria (`roupas`, `acessorios`, `eletronicos`, `casa`) |

**Exemplos:**
```bash
# Todos os produtos
curl http://localhost:4000/api/produtos

# Apenas roupas
curl "http://localhost:4000/api/produtos?categoria=roupas"

# Apenas eletronicos
curl "http://localhost:4000/api/produtos?categoria=eletronicos"
```

**Resposta (200) - array de produtos:**
```json
[
  {
    "id": 1,
    "nome": "Blusa Linho Bege",
    "preco": 149.9,
    "categoria": "Roupas",
    "categoriaSlug": "roupas",
    "imagem": "https://...",
    "descricao": "Blusa confeccionada em linho, leve e elegante."
  }
]
```

---

### 3. Detalhar um produto
```
GET /api/produtos/:id
```

**Exemplo:**
```bash
curl http://localhost:4000/api/produtos/5
```

**Resposta (200):**
```json
{
  "id": 5,
  "nome": "Relogio Minimalista",
  "preco": 389.0,
  "categoria": "Acessorios",
  "categoriaSlug": "acessorios",
  "imagem": "https://...",
  "descricao": "Relogio de pulso com design atemporal."
}
```

**Resposta (404) se o produto nao existir:**
```json
{ "erro": "Produto nao encontrado" }
```

---

### 4. Listar categorias
```
GET /api/categorias
```

**Exemplo:**
```bash
curl http://localhost:4000/api/categorias
```

**Resposta (200):**
```json
[
  { "slug": "roupas",      "nome": "Roupas",      "icone": "Shirt" },
  { "slug": "acessorios",  "nome": "Acessorios",  "icone": "Watch" },
  { "slug": "eletronicos", "nome": "Eletronicos", "icone": "Smartphone" },
  { "slug": "casa",        "nome": "Casa",        "icone": "Sofa" }
]
```

---

### 5. Autenticar usuario - Login (mock via API)
Usado para contas demonstrativas do servidor (Maria e Joao). O login de contas criadas no site e feito localmente.

```
POST /api/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "senha": "123456"
}
```

**Exemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@exemplo.com","senha":"123456"}'
```

**Resposta sucesso (200):**
```json
{
  "sucesso": true,
  "usuario": {
    "email": "usuario@exemplo.com",
    "nome": "Maria Silva",
    "tipo": "cliente",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua das Flores, 123 - Sao Paulo/SP"
  }
}
```

**Resposta erro (400) se faltar dados:**
```json
{ "sucesso": false, "erro": "Informe email e senha." }
```

**Resposta erro (401) se credenciais invalidas:**
```json
{ "sucesso": false, "erro": "Credenciais invalidas." }
```

---

## Report do Cypress

Ultilizei o junit com xml para o retorno dos testes, incluindo evidencia dos screenchots do inicio o fim do fluxo.

---

## Licenca

Projeto criado para fins de demonstracao e aprendizado.
