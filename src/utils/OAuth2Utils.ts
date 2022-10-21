import {FastifyReply} from "fastify";
import {FastifyRequest} from "fastify";
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
  const {userid}: any = req.params;
  const {authorization} = req.headers;
  const Bearer: string[] | undefined = authorization?.split(" ");
  if (Bearer && Bearer.length > 2) {
    const idToken = Bearer[1];
    console.log("Bearer >>", Bearer, authorization);
  }

  return "asd";
  // if (Bearer) {
  //   const idToken = Bearer[1];
  //   const {email, exp}: any = parseJwt(idToken);
  //   const now = new Date().getTime();
  //   if (String(exp) > String(now)) {
  //     if (userid) {
  //       if (userid == email) {
  //         return "";
  //       } else {
  //         reply.code(503).send("fail authorization");
  //       }
  //     } else {
  //       return "";
  //     }
  //   } else {
  //     reply.code(502).send("expired token");
  //   }
  // } else {
  //   reply.code(501).send("need authorization");
  // }
};
