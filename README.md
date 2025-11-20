# AsheOs Web

## Resumo

Frontend do projeto AsheOs — uma aplicação web em Next.js que consome a API do serviço de registro de ocorrências. Fornece páginas de autenticação (login/register), listagem e criação/atualização de ocorrências, e integrações para upload/visualização de anexos.

## Principais Recursos

- **Stack:** Next.js (App Router), React, TypeScript, TailwindCSS
- **Autenticação:** fluxos de `login` e `register` com token em cookie
- **Integração:** comunicação com a API backend via `src/lib/axios.ts` e proteção de rotas via `src/proxy.ts`

## Guia de Instalação e Execução

**Pré-requisitos:**

- Node.js 18+ (ou versão compatível com o `next` usado)
- npm, yarn ou pnpm

1. Clone o repositório e entre na pasta do frontend:

```bash
git clone <repo-url>
cd asheos-web
```

2. Instale dependências:

```bash
npm install
# ou
# yarn
# pnpm install
```

3. Executar em desenvolvimento (porta `3004` por padrão):

```bash
npm run dev
```

Abra `http://localhost:3004` no navegador.

4. Build para produção e execução:

```bash
npm run build
npm run start
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do `asheos-web` para configurar a URL do backend e outras variáveis. Exemplo mínimo:

```
BACKEND_API_URL=http://localhost:8084/api
```

- `BACKEND_API_URL`: usada por `src/lib/axios.ts` para chamadas do servidor (RSC / Route Handlers). Ajuste conforme o endereço em que sua API estiver rodando.

Observação: se você precisa expor a URL do backend para o cliente (browser), utilize variáveis com prefixo `NEXT_PUBLIC_` e faça a configuração nos módulos que rodem no cliente.

## Scripts úteis

- `npm run dev` : Executa em modo desenvolvimento (porta `3004`).
- `npm run build` : Gera o build de produção.
- `npm run start` : Inicia o servidor Next.js em modo produção.
- `npm run lint` : Roda o ESLint (conforme `package.json`).

Verifique `package.json` para scripts adicionais.

## Como a API é configurada no projeto

- `src/lib/axios.ts` — instância Axios para uso no servidor; utiliza `process.env.BACKEND_API_URL`.
- `src/proxy.ts` — middleware que protege rotas e realiza redirecionamentos com base no cookie `token`.

Para alterar o endpoint backend, atualize a variável `BACKEND_API_URL` e reinicie o servidor.

## Estrutura resumida do projeto

- `app/` — páginas e rotas (App Router)
- `components/` — componentes compartilhados (botões, inputs, cartões)
- `actions/` — funções para chamadas à API usadas nas páginas
- `lib/` — utilitários, incluindo a instância `axios`
- `zod/` — definições de validação de formulários

## Autenticação

O frontend espera que o backend gere um token JWT e o coloque em cookie (ex.: `token`). O middleware em `src/proxy.ts` usa esse cookie para proteger rotas privadas como `/occurrences`.
