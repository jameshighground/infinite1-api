import {authHandler} from "@utils/OAuth2Utils";
import {FastifyReply, FastifyRequest, FastifyInstance} from "fastify";
import {USER_ERROR_LATLNG} from "src/constants/UserConstants";
import PrayArticle from "src/entity/PrayArticle";
import {addPrayAmen} from "src/service/PrayAmenService";
import {addPrayArticle, getPrayArticleByUserid, getPrayArticleListByLatLng} from "src/service/PrayArticleService";

export default async function (fastify: FastifyInstance) {
  fastify.addHook("preHandler", authHandler);

  /*
  latitude value: 
  must be between -90 and 90
  lng : -180 and 180
  */
  fastify.post("/", async (req: FastifyRequest<{Params: {userid: string}; Body: PrayArticle}>, reply: FastifyReply) => {
    const {userid} = req.params;
    const article = req.body;
    if ((article.lat < -90 || article.lat > 90) && (article.lng < -180 || article.lng > 180)) {
      reply.code(USER_ERROR_LATLNG.status).send(USER_ERROR_LATLNG.data);
    } else {
      const prays = await addPrayArticle({...article, userid});
      reply.send(prays);
    }
  });
  fastify.post("/:articleid", async (req: FastifyRequest<{Params: {userid: string; articleid: number}}>, reply: FastifyReply) => {
    const {userid, articleid} = req.params;
    const amen = await addPrayAmen({articleid, userid});
    reply.send(amen);
  });

  fastify.get("/", async (req: FastifyRequest<{Params: {userid: string}}>, reply: FastifyReply) => {
    const {userid} = req.params;
    const prays = await getPrayArticleByUserid(userid);
    reply.send(prays);
  });

  fastify.get("/:lat/:lng", async (req: FastifyRequest<{Params: {userid: string; lat: number; lng: number}}>, reply: FastifyReply) => {
    const {userid, lat, lng} = req.params;
    const prays = await getPrayArticleListByLatLng({userid, lat, lng});
    reply.send(prays);
  });
}
