import {FastifyReply} from "fastify";
import {FastifyRequest} from "fastify";
import {USER_ERROR_AUTH, USER_ERROR_JWT} from "src/constants/UserConstants";
function parseJwt(token: string): JSON {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return JSON.parse(jsonPayload);
}

export const authHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const {authorization} = req.headers;
  const Bearer: string[] | undefined = authorization?.split(" ");
  console.log("Bearer >>", Bearer);
  if (Bearer) {
    const idToken = Bearer[1];
    try {
      const data: any = parseJwt(idToken);
      return data;
    } catch (err) {
      reply.code(USER_ERROR_JWT.status).send(USER_ERROR_JWT.data);
    }
  } else {
    reply.code(USER_ERROR_AUTH.status).send(USER_ERROR_AUTH.data);
  }
};
