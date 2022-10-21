import {authHandler} from "@utils/OAuth2Utils";
import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import pray from "./pray";

export default async function (fastify: FastifyInstance) {
  fastify.register(pray, {prefix: "/pray"});

  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send("hi");
  });

  fastify.route({
    method: "GET",
    url: "/test",
    preHandler: authHandler,
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      reply.send("test!!");
    },
  });
}
