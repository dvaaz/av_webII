// configuraçcoes de fastfy
import Fastify from 'fastify';
const fastify = Fastify({
    logger: true // Traz algumas informações de log do sistema. Utilizar na fase de desenvolvimento para depuração.
});
// Rotas
// Teste
fastify.get('/t', async function handler(request, reply) {
    return { hello: 'world' };
});
// Produtos
const products = [
    { id: 1, name: 'Notebook Pro', price: 3500, stock: 10 },
    { id: 2, name: 'Mickey Mouse Mouse', price: 150, stock: 150 },
    { id: 3, name: 'Teclado Mecânico Sem Led', price: 400, stock: 20 },
];
fastify.get('/products', async () => products);
fastify.get('/products/:id', async (req, reply) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        return reply.status(404).send({ error: 'Produto não encontrado' });
    }
    return product;
});
try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
}
catch (e) {
    fastify.log.error(e);
    process.exit(1);
}
//# sourceMappingURL=server.js.map