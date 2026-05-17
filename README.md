# Branch 04
 
* Passo 4 — Comunicação HTTP entre Serviços
Neste passo você vai fazer o Order Service consultar o Product Service via HTTP para obter os detalhes do produto ao criar um pedido.

Objetivo deste passo
Implementar a comunicação síncrona entre microserviços usando HTTP/REST nativo (fetch). Entender os trade-offs desse modelo e como usar variáveis de ambiente para tornar as URLs configuráveis.

O que mudou
O arquivo apps/order-service/src/server.ts foi atualizado. As principais diferenças em relação ao passo anterior:
Antes (step 03)
Agora (step 04)
Order salva só productId
Order salva productName e total
Nenhuma chamada externa
Chama GET /products/:id no Product Service
URL hardcoded inexistente
URL lida de variável de ambiente


Entendendo o código
1. URL configurável por variável de ambiente
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
Em desenvolvimento, usa localhost:3001. Em produção com Docker, a variável de ambiente apontará para o nome do container (http://product-service:3001). Essa é a forma correta de configurar URLs em microserviços.
2. A chamada HTTP
const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`);
 
if (!response.ok) {
  return reply.status(404).send({ error: 'Produto não encontrado no Product Service' });
}
 
const product = await response.json() as Product;
O fetch nativo (disponível no Node.js 18+) é usado para chamar o Product Service. Se o produto não existe, o Order Service retorna 404 — propagando o erro do serviço de origem.
3. Pedido enriquecido
const order: Order = {
  id: nextId++,
  productId,
  productName: product.name,   // vem do Product Service
  quantity,
  total: product.price * quantity,  // calculado com o preço real
  createdAt: new Date().toISOString(),
};

Testando a comunicação
Com os dois serviços rodando em terminais separados:
# Terminal 1
npm run product
 
# Terminal 2
npm run order
Crie um pedido:
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 3}'
Resposta esperada:
{
  "id": 1,
  "productId": 1,
  "productName": "Notebook Pro",
  "quantity": 3,
  "total": 10500,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
Teste com um produto inexistente:
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 999, "quantity": 1}'

Trade-offs da comunicação síncrona
Vantagens:
Simples de implementar e entender
Resposta imediata com confirmação
Desvantagens:
Se o Product Service cair, o Order Service falha junto
Aumenta o acoplamento entre serviços
Latência acumulada em chamadas encadeadas
Em sistemas mais robustos, comunicação assíncrona (filas como RabbitMQ) resolve esses problemas — mas foge do escopo dessa AV.

