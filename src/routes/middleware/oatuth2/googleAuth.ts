import oauth from "@fastify/oauth2";
import zionConfig from "@config/config.json";

const clientConfig = zionConfig.oauth;
export default function (
  fastify: {
    register: (
      arg0: any,
      arg1: {
        name: string;
        scope: string[];
        credentials: {client: any; auth: any};
        startRedirectPath: string;
        callbackUri: string;
      },
    ) => void;
    get: (arg0: string, arg1: (req: any, reply: any) => Promise<void>) => void;
    googleOAuth2: {getAccessTokenFromAuthorizationCodeFlow: (arg0: any) => any};
  },
  SERVER_URI: any,
  afterCallback: (arg0: any, arg1: any) => void,
) {
  fastify.register(oauth, {
    name: "googleOAuth2",
    scope: ["email"],
    credentials: {
      client: clientConfig,
      auth: oauth.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    // callbackUri: "http://localhost:3000/login/google/callback",
    callbackUri: `${SERVER_URI}/login/google/callback`,
  });
  fastify.get("/login/google/callback", async (req: any, reply: any) => {
    console.log("login/google/callback");
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    afterCallback(token, reply);
  });
}
