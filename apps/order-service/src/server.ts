import Fastify from 'fastify'; 
import type { FastifyInstance } from 'fastify';
import type { Order } from './interfaces/order.interface.ts';

const fastify = Fastify({
    logger: true // Traz algumas informações de log do sistema. Utilizar na fase de desenvolvimento para depuração.
});


fastify.get('/t', async function handler (request, reply) {
    return { hello: 'world'}
})

const orders: Order[] = [];
let orderCounter = 0; // Contador para gerar IDs únicos

fastify.get('/orders', async () => orders);

fastify.post<{ Body: { productId: number; quantity: number } }>(
    '/orders', async (req, reply) => {
    const { productId, quantity } = req.body;
    const newOrder: Order = {
        id: ++orderCounter,
        productId,
        quantity,
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    return reply.status(201).send(newOrder);

});


try {
    await fastify.listen({ port: 3002, host: '0.0.0.0' });
} catch (e) {
    fastify.log.error(e)
    process.exit(1)
}