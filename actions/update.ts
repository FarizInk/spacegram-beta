import { Context, HTTPException } from "hono";
import connect from "../utils/clientConnect.ts";
import saveFile from "../utils/saveFile.ts";
import authenticate from "../utils/authenticate.ts";
import getMessageById from "../utils/getMessageById.ts";
import { config } from "dotenv";

export default async (c: Context) => {
  authenticate(c);

  const body = await c.req.parseBody();
  if (body.content === undefined) {
    throw new HTTPException(403, { message: "Content must be filled" });
  }

  const client = await connect();

  const identifier = c.req.param("identifier");
  const result = await getMessageById(identifier, client);

  if (!result) {
    await client.disconnect();
    throw new HTTPException(404, { message: "File Not Found!" });
  }

  const {
    path,
    ext: fileExt,
    time,
    fileType,
  } = await saveFile(body.content, identifier, body.content instanceof Blob);

  await client.editMessage(config().GROUP_ID, {
    message: result.id,
    text:
      `id: ${identifier}\r\ntime: ${time}\r\ntype: ${fileType}\r\nextexsion: ${fileExt}\r\npermission: public`,
    forceDocument: true,
    file: path,
  });

  await client.disconnect();

  return c.json({
    id: identifier,
    time,
    type: fileType,
    extension: fileExt,
  });
};
