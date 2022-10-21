import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest<{Body: {refresh_token: string}}>, reply: FastifyReply) => {
    reply.send("hi");
  });
}
