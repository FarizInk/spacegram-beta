import { Context, HTTPException } from "hono";
import connect from "../utils/clientConnect.ts";
import authenticate from "../utils/authenticate.ts";
import getMessageById from "../utils/getMessageById.ts";
import { config } from "dotenv";
import { existsSync } from "deno-fs";
import { get as getFileInfo } from "../utils/format.ts"

export default async (context: Context) => {
  authenticate(context);
  const client = await connect();

  const identifier = context.req.param("identifier");
  const result = await getMessageById(identifier, client)

  if (!result) {
    await client.disconnect();
    throw new HTTPException(404, { message: "File Not Found!" });
  }

  const fileInfo = getFileInfo(result.message)

  await client.deleteMessages(config().GROUP_ID, [result.id], {
    revoke: false,
  });
  await client.disconnect();

  const basePath = config().TMP_PATH + (fileInfo.permission === 'private' ? 'private/' : '')
  const filename = `${fileInfo.id}.${fileInfo.extension}`;
  const path = basePath + filename

  if (existsSync(path)) {
    Deno.removeSync(path, { recursive: true });
  }

  return context.json(fileInfo);
};
