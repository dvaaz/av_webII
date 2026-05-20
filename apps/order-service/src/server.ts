import Fastify from 'fastify'; 
import type { Order } from './interfaces/order.interface.ts';
import type { Product } from './interfaces/product.interface.ts';

const fastify = Fastify({
    logger: true // Traz algumas informações de log do sistema. Utilizar na fase de desenvolvimento para depuração.
});

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';;


fastify.get('/t', async function handler (request, reply) {
    return { hello: 'world'}
})

const orders: Order[] = [];
let nextId = 0; // Contador para gerar IDs únicos

fastify.get('/orders', async () => orders);

fastify.post<{ Body: { productId: number; quantity: number } }>(
    '/orders', async (req, reply) => {
    const { productId, quantity } = req.body;
   
    const productResponse = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`);
    if (!productResponse.ok) {
        return reply.status(404).send({ error: 'Produto não encontrado' });
    }

    const product: Product = await productResponse.json();

        const order: Order = {
            id: nextId++,
            productId,
            productName: product.name,
            quantity,
            total: product.price * quantity,
            createdAt: new Date().toISOString(),
        };
    orders.push(order);
    return reply.status(201).send(order);

});


try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
} catch (e) {
    fastify.log.error(e)
    process.exit(1)
}