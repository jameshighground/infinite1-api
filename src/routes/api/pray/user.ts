import {authHandler} from "@utils/OAuth2Utils";
import {FastifyReply, FastifyRequest, FastifyInstance} from "fastify";
import PrayArticle from "src/entity/PrayArticle";
import {addPrayArticle, getPrayArticleByUserid} from "src/service/PrayArticleService";

export default async function (fastify: FastifyInstance) {
  fastify.addHook("preHandler", authHandler);

  fastify.post("/", async (req: FastifyRequest<{Body: PrayArticle}>, reply: FastifyReply) => {
    const article = req.body;
    const prays = await addPrayArticle(article);
    reply.send(prays);
  });
  fastify.get("/", async (req: FastifyRequest<{Params: {userid: string}}>, reply: FastifyReply) => {
    const {userid} = req.params;
    const prays = await getPrayArticleByUserid(userid);
    reply.send(prays);
  });
}
