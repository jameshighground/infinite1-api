import {FastifyInstance} from "fastify";
import register from "./register";
import lifecycle from "./lifecycle";
import oauth2 from "./oauth2";
export default async function (fastify: FastifyInstance) {
  register(fastify);
  lifecycle(fastify);
  oauth2(fastify);
}
