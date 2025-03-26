# Finance Control Client

![Screenshot da home page](/public/home-page.png)

Este é o repositório do cliente do Finance Control, uma aplicação web para gestão financeira que consome a API `finance-dashboard-server`.

## 🚀 Tecnologias Utilizadas

- React.js
- TypeScript
- Vite
- Material UI
- React Query
- Zustand
- Radix UI

## 📌 Instalação e Execução

Clone este repositório e instale as dependências:

```sh
git clone https://github.com/Cardosofiles/finance-control-client.git
cd finance-control-client
npm install
```

Para rodar a aplicação em modo desenvolvimento:

```sh
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## 📌 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável de ambiente:

```env
VITE_API_URL=http://localhost:9000
```

## 📌 Estrutura do Projeto

```
finance-control-client/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── App.tsx
│   ├── main.tsx
│── public/
│── package.json
│── .env.example
│── README.md
```

## 📌 Funcionalidades Principais

- Dashboard financeiro interativo
- Visualização de KPIs (Indicadores-chave de Desempenho)
- Controle de transações e produtos
- Filtros dinâmicos para análise financeira

## 📌 Autor

Desenvolvido por João Batista 🚀
