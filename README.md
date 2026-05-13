# Branch 02
 
Passo 2 — Product Service
Neste passo você vai criar o primeiro microserviço real: o Product Service. Ele é responsável exclusivamente pelo catálogo de produtos, expondo uma API REST com Fastify.

Objetivo deste passo
Construir um servidor HTTP com Fastify que responde a requisições sobre produtos. O foco está em entender a estrutura de um serviço isolado antes de conectá-lo a outros.

O que será adicionado
apps/
└── product-service/
    └── src/
        └── server.ts   ← servidor Fastify com rotas de produtos
 

Entendendo o código
1. Tipagem com TypeScript
Definimos uma interface para garantir que todos os produtos tenham a mesma estrutura:
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
Por que isso importa? Em um sistema com múltiplos serviços, contratos claros de dados evitam bugs silenciosos quando um serviço muda sua estrutura.


2. Dados em memória
Por enquanto, os produtos são armazenados em um array em memória. Isso é intencional — o foco é na estrutura do serviço, não no banco de dados.
const products: Product[] = [
  { id: 1, name: 'Notebook Pro', price: 3500, stock: 10 },
  ...
];
3. Rotas REST
Duas rotas simples:
GET /products — retorna todos os produtos
GET /products/:id — retorna um produto pelo ID, ou 404 se não existir
4. Porta dedicada
O serviço escuta na porta 3001. Em microserviços, cada serviço tem sua própria porta (ou container). Isso permite escalar cada serviço de forma independente.
app.listen({ port: 3001, host: '0.0.0.0' });
O host: '0.0.0.0' é necessário para que o serviço seja acessível dentro de um container Docker no futuro.

Como executar
# Na raiz do projeto, instale as dependências
npm install
 
# Execute o product-service
npm run product
Teste com curl ou navegador:
curl http://localhost:3001/products
curl http://localhost:3001/products/1
curl http://localhost:3001/products/999  # retorna 404

