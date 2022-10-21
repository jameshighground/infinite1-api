import statics from "@fastify/static";
import formbody from "@fastify/formbody";
import cors, {FastifyCorsOptions} from "@fastify/cors";
import fastifyView from "@fastify/view";
import path from "path";
import ejs from "ejs";
import {FastifyInstance} from "fastify";
import multipart from "@fastify/multipart";
export default async function (fastify: FastifyInstance) {
  /* FormBody */
  fastify.register(formbody);
  fastify.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 1000000, // For multipart forms, the max file size in bytes
      files: 10, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });
  /* VIEWS */
  // view engine 정의
  // fastify.register(pointOfView, {engine: {ejs}});
  fastify.register(fastifyView, {engine: {ejs}});
  /* STATIC */
  fastify.register(statics, {root: path.join(__dirname, "../../../dist/assets"), prefix: "/assets/", decorateReply: false});
  fastify.register(statics, {root: path.join(__dirname, "../../../public"), prefix: "/public/", decorateReply: false});
  fastify.register(statics, {
    root: path.join(__dirname, "../../../node_modules"),
    prefix: "/node_modules/",
    decorateReply: false,
  });

  /* CORS */
  fastify.register(cors, _ => {
    return (_, callback: (error: Error | null, options: FastifyCorsOptions) => void) => {
      let corsOption: FastifyCorsOptions = {origin: true};
      return callback(null, corsOption);
    };
  });
}
