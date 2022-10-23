const PORT = 3000;
const SERVER_URI = "http://localhost:4000";
export default function (fastify: any) {}

function atob2(base64: any) {
  return Buffer.from(base64, "base64").toString();
}
