import * as oak from "@oak/oak";
import { Port } from "../lib/index.ts";
import insightsRoutes from "./rest/insights.ts";
import { DbConnection } from "./db/index.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const router = new oak.Router();

console.log("Initialising database");
DbConnection.init().catch(console.error).then(() => {
  insightsRoutes(router);
});

console.log("Initialising server");

router.get("/_health", (ctx) => {
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
