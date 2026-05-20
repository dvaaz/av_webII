import Fastify from 'fastify';
import httpProxy from '@fastify/http-proxy';

const app = Fastify({ logger: true });

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE ?? 'http://localhost:3001';
const ORDER_SERVICE = process.env.ORDER_SERVICE ?? 'http://localhost:3001';

const PORT = Number(process.env.PORT ?? 3000);


app.register(httpProxy, {
  upstream: PRODUCT_SERVICE,   // para onde encaminhar
  prefix: '/products',         // qual prefixo de rota capturar
  rewritePrefix: '/products',  // prefixo mantido na URL encaminhada

});

app.register(httpProxy, {
    upstream: ORDER_SERVICE,
    prefix: '/orders',
    rewritePrefix: '/orders',
});

app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

app.listen({ port: PORT, host: '0.0.0.0' }).catch((err) => {
	app.log.error(err);
	process.exit(1);
});


