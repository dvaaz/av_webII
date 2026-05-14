import Fastify from 'fastify'; 
import type { FastifyInstance } from 'fastify';
import type {Order} from '../interface/order.interface.js'

const fastify = Fastify({
    logger: true // Traz algumas informações de log do sistema. Utilizar na fase de desenvolvimento para depuração.
});


fastify.get('/t', async function handler (request, reply) {
    return { hello: 'world'}
})

const order: Order = {
    id: 1,
    items: [],
    total: 0
};

fastify.get('/orders', async () => order);