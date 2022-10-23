import {FastifyInstance} from "fastify";
import pray from "./pray";
import user from "./pray/user";

export default async function (fastify: FastifyInstance) {
  fastify.register(pray, {prefix: "/pray"});
  fastify.register(user, {prefix: "/:userid/pray"});
}
