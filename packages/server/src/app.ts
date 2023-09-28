import Fastify, { FastifyRequest } from 'fastify';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import fastifyCors from '@fastify/cors';
import path from 'path';
import config from 'config';
import clientRoot from '@ab/client';

const port = Number(process.env.PORT) || 3000;

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ignoreTrailingSlash: true,
  ...process.env.NODE_ENV !== 'development' && {
    http2: true,
  },
});

app.register(helmet, { global: true });

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

app.register(fastifySecureSession, {
  secret: config.get<string>('auth.session.secret'),
  salt: config.get<string>('auth.session.salt'),
});
app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

if (process.env.NODE_ENV !== 'development') {
  // Serve the built Vue.js client
  app.register(fastifyStatic, {
    root: clientRoot,
  });

  // Explicitly set the not found handler to send the Vue.js app
  // so that the Vue.js routing works
  app.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });
}
else {
  // Only bypass CORS for development
  app.register(fastifyCors, () => {
    return (req: FastifyRequest, callback: any) => {
      const corsOptions = {
        // This is NOT recommended for production as it enables reflection exploits
        origin: true,
      };

      // do not include CORS headers for requests from localhost
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false;
      }

      // callback expects two parameters: error and options
      callback(null, corsOptions);
    };
  });
}

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

export default app;
