import { Hono } from "hono";
import { logger, serveStatic } from "hono-middleware";
import { config } from "dotenv";
import createTicket from "./utils/createTicket.ts";
import store from "./actions/store.ts";
import get from "./actions/get.ts";
import update from "./actions/update.ts";
import deleteFile from "./actions/delete.ts";
import {generate as generateFormat} from "./utils/format.ts"

const app = new Hono();
const api = app.basePath("/api");
if (config().APP_ENV === "local") {
  app.use("*", logger());
}

app.get("/", (c) => c.body('Hello World!'))

// app.get("/", (c) => {

//   // for await (const dirEntry of Deno.readDir(config().TMP_PATH)) {
//   //   console.log(dirEntry);
//   // }
//   // console.log(new TextDecoder().decode(Deno.readFileSync('./dist/client/index.html')));

//   return c.html(new TextDecoder().decode(Deno.readFileSync('./dist/client/index.html')))
// });

app.get("/file/:filename", async (c) => await get(c));

api.get("/ticket", (c) => {
  const ticket = createTicket();
  return c.json({ ticket });
});
api.post("/store", async (c) => await store(c));
api.post("/update/:identifier", async (c) => await update(c));
api.delete("/delete/:identifier", async (c) => await deleteFile(c));

Deno.serve({ port: parseInt(config().PORT) }, app.fetch);
