import { Hono } from "hono";
import { logger, serveStatic } from "hono-middleware";
import { config } from "dotenv";
import createTicket from "./utils/createTicket.ts";
import store from "./actions/store.ts";
import get from "./actions/get.ts";
import update from "./actions/update.ts";
import deleteFile from "./actions/delete.ts";
import { existsSync } from "deno-fs";

const app = new Hono();
const api = app.basePath("/api");
if (config().APP_ENV === "local") {
  app.use("*", logger());
}

app.get("/", (c) => {

  // for await (const dirEntry of Deno.readDir(config().TMP_PATH)) {
  //   console.log(dirEntry);
  // }
  // console.log(new TextDecoder().decode(Deno.readFileSync('./dist/client/index.html')));

  if (existsSync('./frontend/dist/index.html') && config().TMP_MODE.toLowerCase() === 'true') {
    return c.html(new TextDecoder().decode(Deno.readFileSync('./frontend/dist/index.html')))
  } else {
    return c.body('Hello World!')
  }
});

app.get(
  '/assets/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path.replace(/^\/assets/, '/frontend/dist/assets/'),
  })
  )


app.get("/file/:filename", async (c) => await get(c));
app.post("/file/:filename", async (c) => await get(c, true));

api.get("/ticket", (c) => {
  const ticket = createTicket();
  return c.json({ ticket });
});

api.post("/store", async (c) => await store(c));
api.post("/update/:identifier", async (c) => await update(c));
api.delete("/delete/:identifier", async (c) => await deleteFile(c));

// For Temporary File
if (config().TMP_MODE.toLowerCase() === 'true') {
  api.post("/tmp/store", async (c) => await store(c));
  api.delete("/tmp/delete/:identifier", async (c) => await deleteFile(c));
}

Deno.serve({ port: parseInt(config().PORT) }, app.fetch);
