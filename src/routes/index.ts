import {FastifyInstance} from "fastify";
import loader from "@routes/middleware/loader";
import api from "@routes/api";
import pages from "./pages";

export default async function (fastify: FastifyInstance) {
  //middleware
  loader(fastify);
  //api
  fastify.register(pages, {prefix: "/"});
  fastify.register(api, {prefix: "/api/v1"});
}
