import { Context, HTTPException } from "hono";
import { Api } from "gramjs";
import connect from "../utils/clientConnect.ts";
import { config } from "dotenv";
import { existsSync } from "deno-fs";

export default async (c: Context) => {
  const filename = c.req.param("filename");
  const splitFilename = filename.split(".");
  const ulid = splitFilename[0];
  const path = config().TMP_PATH + filename;

  if (existsSync(path)) {
    const result = Deno.readFileSync(path);
    return c.body(result);
  }

  await getStorageFile(ulid, path);

  if (existsSync(path)) {
    const result = Deno.readFileSync(path);
    return c.body(result);
  }

  throw new HTTPException(404, { message: "File Not Found!" });
};

const getStorageFile = async (ulid: string, path: string) => {
  const client = await connect();

  const query = await client.invoke(
    new Api.messages.Search({
      peer: config().GROUP_ID,
      q: ulid,
      filter: new Api.InputMessagesFilterEmpty(),
      limit: 1,
    })
  );

  if (query.messages.length >= 1) {
    const media = query.messages[0].media;
    const buffer = await client.downloadMedia(media, {
      workers: 2,
    });
    const file = new Uint8Array(buffer);
    if (config().TMP_PATH !== "/tmp/" && !existsSync(config().TMP_PATH)) {
      await Deno.mkdir(config().TMP_PATH, { recursive: true });
    }
    Deno.writeFileSync(path, file);
  }

  await client.disconnect();
};
