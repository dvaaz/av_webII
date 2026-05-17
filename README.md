# Branch 05
 
* Passo 5 — API Gateway
Neste passo você vai criar o API Gateway: o ponto de entrada único para todos os clientes externos. Em vez de o frontend chamar localhost:3001 e localhost:3002 diretamente, ele fala apenas com o gateway na porta 3000.

Objetivo deste passo
Implementar um API Gateway com Fastify que roteia requisições para os serviços internos corretos, sem que o cliente precise conhecer a topologia interna do sistema.

O que será adicionado
apps/
└── api-gateway/
    ├── package.json    ← inclui @fastify/http-proxy
    ├── tsconfig.json
    └── src/
        └── server.ts   ← gateway na porta 3000
 

Entendendo o código
1. Plugin @fastify/http-proxy
O plugin faz o proxy reverso: recebe a requisição no gateway e a encaminha para o serviço correto, repassando body, headers e retornando a resposta original.
app.register(httpProxy, {
  upstream: PRODUCT_SERVICE,   // para onde encaminhar
  prefix: '/products',         // qual prefixo de rota capturar
  rewritePrefix: '/products',  // prefixo mantido na URL encaminhada
});
2. Rota de health check
app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));
É uma boa prática ter um endpoint /health no gateway para monitoramento e orquestradores como o Kubernetes verificarem se o serviço está vivo.
3. Arquitetura com gateway
Cliente (frontend / curl)
        │
        ▼
   :3000 API Gateway
   ├── /products/* ──► :3001 Product Service
   ├── /orders/*   ──► :3002 Order Service
   └── /health     ──► resposta local
 

Como executar os três serviços
Abra três terminais:
# Terminal 1
npm run product
 
# Terminal 2
npm run order
 
# Terminal 3
npm run gateway
Agora todas as chamadas passam pelo gateway:
# Listar produtos (via gateway → product-service)
curl http://localhost:3000/products
 
# Criar pedido (via gateway → order-service → product-service)
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 2, "quantity": 5}'
 
# Health check
curl http://localhost:3000/health

Por que o API Gateway é importante?
Ponto único de entrada: o cliente nunca acessa serviços internos diretamente
SSL termination: o certificado HTTPS fica só no gateway
Autenticação centralizada: middleware de JWT/auth pode ser adicionado aqui
Rate limiting e logging: aplicados uma única vez para todos os serviços
Flexibilidade interna: serviços podem mudar de porta ou endereço sem impactar o cliente

