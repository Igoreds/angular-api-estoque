# 🎨 Frontend do Sistema de Gerenciamento de Estoque
## 📌 Sobre o Projeto
Este é o frontend Angular do sistema de gerenciamento de estoque e vendas, desenvolvido para consumir a API RESTful em Spring Boot. A aplicação fornece uma interface moderna, responsiva e intuitiva para todas as operações de produtos e vendas.

🔗 [Repositório Backend (Spring Boot)](https://github.com/Igoreds/DecolaTech-API-Java)

## 🚀 Tecnologias Utilizadas
<p align="center"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" width="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" width="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rxjs/rxjs-original.svg" width="50" /> </p>


## 📂 Funcionalidades

### 🔹 Gerenciamento de Produtos

Listagem de produtos ➝ Com paginação e ordenação.

Cadastro de produto ➝ Formulário com validações.

Edição de produto ➝ Atualização de dados de produtos existentes.

Exclusão de produto ➝ Remoção com confirmação.

### 🔹 Sistema de Vendas
Registro de vendas ➝ Seleção de produtos com verificação de estoque em tempo real.

Feedback visual ➝ Confirmação de sucesso nas operações.

### 🔹 Relatórios
Extrato de vendas por período ➝ Lista de vendas com filtro por data.

Resumo financeiro ➝ Total de vendas e valores.

Calendário interativo ➝ Para seleção de datas nos filtros.

## 🎨 Interface do Usuário
Design responsivo que se adapta a qualquer dispositivo.

Componentes modernos com Angular Material.

SnackBars e diálogos de confirmação para ações importantes.

## 🔧 Instalação e Execução
### 1️⃣ Pré-requisitos

Node.js v16+

Angular CLI v15+

API backend em execução (padrão: http://localhost:8080)
🔗 [Repositório Backend (Spring Boot)](https://github.com/Igoreds/DecolaTech-API-Java)

### 2️⃣ Clonar o repositório
```
git clone https://github.com/Igoreds/angular-api-estoque

```
### 3️⃣ Instalar dependências
```
npm install
```
### 4️⃣ Configurar ambiente
Edite o arquivo src/environments/environment.ts se necessário:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // Altere para a URL da API
};
```
### 5️⃣ Iniciar a aplicação
```bash
ng serve
```
A aplicação estará disponível em:

```arduino

http://localhost:4200
```
## 📊 O frontend consome os seguintes endpoints da API:

GET /produtos ➝ Listar produtos

POST /produtos ➝ Criar produto

PUT /produtos/{id} ➝ Atualizar produto

DELETE /produtos/{id} ➝ Remover produto

POST /vendas/vender ➝ Registrar venda

GET /vendas/extrato ➝ Obter extrato de vendas

# Desenvolvido por [Igor Silva](https://github.com/igoreds). 🧡
