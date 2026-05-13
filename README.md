# Branch 03 
 
Passo 3 — Order Service
Neste passo você vai criar o segundo microserviço: o Order Service. Ele gerencia pedidos de forma completamente independente do Product Service — por enquanto.

Objetivo deste passo
Entender que cada microserviço é um processo separado, com sua própria porta, suas próprias dependências e seus próprios dados. O Order Service ainda não sabe nada sobre produtos — e isso é intencional.

O que será adicionado
apps/
└── order-service/
    ├── package.json    ← dependências isoladas
    ├── tsconfig.json   ← herda configurações da raiz
    └── src/
        └── server.ts   ← servidor Fastify na porta 3002
 

Entendendo o código
1. Serviço isolado na porta 3002
Enquanto o Product Service usa a porta 3001, o Order Service usa a 3002. Dois processos Node.js rodando simultaneamente, totalmente independentes.
2. Interface do pedido
interface Order {
  id: number;
  productId: number;  // só guarda o ID — ainda não busca detalhes
  quantity: number;
  createdAt: string;
}
Perceba que o pedido só armazena o productId. Ele ainda não busca o nome ou preço do produto. Isso será corrigido no próximo passo.
3. Rota POST tipada
app.post<{ Body: { productId: number; quantity: number } }>('/orders', async (req, reply) => {
  // req.body é tipado automaticamente pelo Fastify + TypeScript
});
O Fastify permite tipar Body, Params, Querystring e Headers via generics, evitando any.

Problema visível neste passo
Crie um pedido e veja o que acontece:
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
Resposta:
{
  "id": 1,
  "productId": 1,
  "quantity": 2,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
O pedido foi criado, mas não sabemos qual produto foi pedido nem qual o valor total. O Order Service está isolado demais — ele precisa conversar com o Product Service.
Essa é exatamente a tensão central dos microserviços: isolamento vs. colaboração.

Como executar os dois serviços juntos
Abra dois terminais:
# Terminal 1
npm run product
 
# Terminal 2
npm run order

