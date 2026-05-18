## Branch 06
 
Passo 6 — Docker e docker-compose
Neste passo você vai containerizar todos os serviços com Docker e orquestrá-los com docker-compose. O objetivo é que todo o sistema suba com um único comando, em um ambiente isolado e reproduzível.

Objetivo deste passo
Empacotar cada microserviço em uma imagem Docker e definir como os containers se comunicam entre si usando a rede interna do docker-compose.

O que será adicionado
/
├── docker-compose.yml              ← orquestra os 3 serviços
└── apps/
    ├── product-service/Dockerfile
    ├── order-service/Dockerfile
    └── api-gateway/Dockerfile
 

Entendendo o Dockerfile (multi-stage build)
Todos os serviços usam o mesmo padrão de multi-stage build:
# Stage 1: build — compila TypeScript
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
 
# Stage 2: produção — apenas o JS compilado + deps de produção
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]
Por que dois stages?
O stage de build instala devDependencies (TypeScript, ts-node) que não são necessárias em produção. O stage final copia apenas o dist/ compilado e instala somente as dependências de produção. A imagem final fica muito menor.

Entendendo o docker-compose.yml
Rede interna
O docker-compose cria automaticamente uma rede privada entre os containers. Dentro dessa rede, cada serviço é acessível pelo seu nome (ex: product-service), não por localhost.
Variáveis de ambiente por container
order-service:
  environment:
    - PRODUCT_SERVICE_URL=http://product-service:3001
Note como a URL usa product-service (nome do container) em vez de localhost. É por isso que o código usa process.env.PRODUCT_SERVICE_URL — em dev é localhost, em Docker é o nome do serviço.
depends_on
api-gateway:
  depends_on:
    - product-service
    - order-service
Garante que o gateway só inicia após os outros serviços estarem criados (não garante que estão prontos para receber tráfego, mas é o suficiente para este tutorial).

Como executar com Docker
# Build e inicializa todos os serviços
docker-compose up --build
 
# Em outro terminal, teste o sistema completo
curl http://localhost:3000/products
curl http://localhost:3000/health
 
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
 
# Para encerrar
docker-compose down

Comparativo: dev vs Docker
Aspecto
Desenvolvimento
Docker
Inicialização
3 terminais separados
docker-compose up
URL entre serviços
localhost:300X
nome do container
Compilação
ts-node (direto)
tsc → node dist/
Isolamento
Processo local
Container isolado