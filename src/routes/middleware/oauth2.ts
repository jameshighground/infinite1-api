import oauth2 from "@fastify/oauth2";
import {oauth} from "@config/config.json";

const PORT = 3000;
const SERVER_URI = "http://localhost:4000";
export default function (fastify: any) {
  fastify.register(oauth2, {
    name: "googleOAuth2",
    scope: ["email", "profile"],
    credentials: {
      client: {id: oauth.client_id, secret: oauth.client_secret},
      auth: oauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: `${SERVER_URI}/login/google/callback2`,
    callbackUriParams: {
      access_type: "offline",
    },
  });
  fastify.get("/login/google/callback2", async (req: any, reply: any) => {
    console.log("login/google/callback");
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    // console.log(":token >>>", JSON.stringify(token));
    reply.redirect(`http://localhost:3000/admin/check?token=${JSON.stringify(token)}`);
  });
}

export function parseJwt(token: any) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob2(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return jsonPayload;
}

function atob2(base64: any) {
  return Buffer.from(base64, "base64").toString();
}
