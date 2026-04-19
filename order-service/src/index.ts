import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.status(200).send({ 
    start: "ok",
    uptime:process.uptime(),
    timestamp: Date.now()
   })
})

const start = async () => {
  try {
    await fastify.listen({ port: 8888 })
    console.log(`Order Service running on PORT:8888`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};
start();