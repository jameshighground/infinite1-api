import {FastifyReply} from "fastify";
import {FastifyInstance, FastifyRequest} from "fastify";
export default async function (fastify: FastifyInstance) {
  fastify.get("/moving", (_: FastifyRequest, reply: FastifyReply) => {
    reply.view("/views/moving.html");
  });
  fastify.get("/", (_: FastifyRequest, reply: FastifyReply) => {
    reply.view("/views/main.html");
  });
}
