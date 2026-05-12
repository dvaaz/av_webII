Microserviços com Node.js — AV Guiado
AV prática e incremental para construir uma arquitetura de microserviços com Node.js, TypeScript, Fastify e Docker.

Como usar este guia:
Cada branch representa um passo do desenvolvimento. Ao concluir um passo, faça checkout da branch seguinte e leia o GUIA.md que explica o que foi construído e por quê.
git checkout step/01-setup
Coloque o GUIA.md na raiz do projeto e siga as instruções.

Roteiro de branches
Branch
O que você vai aprender
step/01-setup
Estrutura do monorepo com npm workspaces e TypeScript
step/02-product-service
Primeiro microserviço com Fastify e rotas REST
step/03-order-service
Segundo microserviço independente na própria porta
step/04-http-communication
Comunicação HTTP síncrona entre serviços
step/05-api-gateway
API Gateway como ponto de entrada único
step/06-docker
Containerização com Docker e docker-compose



Arquitetura final
Cliente (frontend / curl)
        │
        ▼ :3000
   [ API Gateway ]
   ├── /products/* ──► :3001 [ Product Service ]
   └── /orders/*   ──► :3002 [ Order Service ]
                                     │
                                     └──► :3001 [ Product Service ]
 
O cliente faz todas as requisições para o API Gateway (porta 3000). O gateway roteia para o serviço correto. O Order Service consulta o Product Service internamente ao criar pedidos.

Stack utilizada
Fastify — framework HTTP de alta performance para Node.js
TypeScript — tipagem estática para contratos claros entre serviços
npm Workspaces — gerenciamento de monorepo nativo do npm
Docker + docker-compose — containerização e orquestração local

Pré-requisitos
Node.js 20+
npm 10+
Docker Desktop (apenas para o passo 6)

