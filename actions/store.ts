import { Context, HTTPException } from "hono";
import connect from "../utils/clientConnect.ts";
import generateId from "../utils/generateId.ts";
import saveFile from "../utils/saveFile.ts";
import authenticate from "../utils/authenticate.ts";
import getMessageById from "../utils/getMessageById.ts";
import { config } from "dotenv";
import {generate as generateFormat} from "../utils/format.ts"

export default async (c: Context) => {
  // authenticate(c);

  const contentType = c.req.header("content-type");
  const body = contentType === "application/json"
    ? await c.req.json()
    : await c.req.parseBody();

  if (body.content === undefined) {
    throw new HTTPException(403, { message: "Content must be filled" });
  }

  const client = await connect();
  let id = null;

  if (body.custom_id !== undefined && body.custom_id !== null) {
    const checkCustomId = await getMessageById(body.custom_id, client);
    if (typeof checkCustomId === "object") {
      await client.disconnect();
      throw new HTTPException(403, { message: "Custom ID used." });
    }
    id = body.custom_id;
  } else {
    id = await generateId(client);
  }

  const {
    path,
    ext: fileExt,
    time,
    fileType,
  } = await saveFile(body.content, id, body.content instanceof Blob, body.permission === 'private');

  const fileInfo = {
    id: id,
    type: fileType,
    extension: fileExt,
    permission: body.permission ?? 'public',
    updated_at: time,
    created_at: time,
    updated_at_date: new Date(time * 1000).toISOString().split("T")[0],
    created_at_date: new Date(time * 1000).toISOString().split("T")[0],
  }

  await client.sendFile(config().GROUP_ID, {
    caption: generateFormat(fileInfo),
    file: path,
    forceDocument: true, // send file with uncompressed
    progressCallback: (progress) => {
      console.log(progress);
    },
  });

  await client.disconnect();

  return c.json(fileInfo);
};
