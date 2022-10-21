import {FastifyReply, FastifyRequest, FastifyInstance} from "fastify";
import {getPrayArticleList} from "src/service/PrayArticleService";
import user from "./user";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const prays = await getPrayArticleList();
    reply.send(prays);
  });
  fastify.register(user, {prefix: "/:userid"});
}
