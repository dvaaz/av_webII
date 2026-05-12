Branch 01
 
Passo 1 — Configuração do Monorepo
Vamos começar a AV Prática de microserviços com Node.js!
Neste passo você vai configurar a estrutura base do projeto usando npm workspaces, uma funcionalidade nativa do npm que permite gerenciar múltiplos pacotes em um único repositório (monorepo).

Objetivo deste passo
Criar o esqueleto do projeto onde cada microserviço terá sua própria pasta, package.json e configuração TypeScript independente, mas compartilhando a raiz do repositório.

O que será criado
/
├── package.json          ← raiz do monorepo (workspaces)
├── tsconfig.json         ← configuração TypeScript base
└── apps/
    └── product-service/
        ├── package.json  ← dependências isoladas do serviço
        └── tsconfig.json ← herda da raiz, sobrescreve outDir
 

Por que Monorepo?
Em vez de ter repositórios separados para cada serviço, o monorepo permite:
Compartilhar código entre serviços (ex: tipos, utilitários)
Um único npm install na raiz instala tudo
Versionamento unificado — todos os serviços evoluem juntos no mesmo histórico Git




npm Workspaces
O campo "workspaces" no package.json raiz instrui o npm a reconhecer todas as pastas dentro de apps/ como pacotes independentes:
{
  "workspaces": ["apps/*"]
}
Isso significa que cada serviço tem seu próprio package.json com dependências isoladas.

TypeScript Base
O tsconfig.json raiz define as regras que todos os serviços herdarão. Cada serviço tem seu próprio tsconfig.json que usa "extends" para reaproveitar essas configurações:
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}

