import {FastifyReply, FastifyRequest, FastifyInstance} from "fastify";
import {getPrayArticleList} from "src/service/PrayArticleService";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const prays = await getPrayArticleList();
    reply.send(prays);
  });
}
