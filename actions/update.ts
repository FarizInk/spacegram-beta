import { Context, HTTPException } from "hono";
import connect from "../utils/clientConnect.ts";
import saveFile from "../utils/saveFile.ts";
import authenticate from "../utils/authenticate.ts";
import getMessageById from "../utils/getMessageById.ts";
import { config } from "dotenv";
import {get as getFileInfo, generate as generateFormat} from '../utils/format.ts'

export default async (c: Context) => {
  // authenticate(c);

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
  } = await saveFile(body.content, identifier, body.content instanceof Blob, body.permission === 'private');

  const createdAt = getFileInfo(result.message, 'created_at')

  const fileInfo = {
    id: identifier,
    type: fileType,
    extension: fileExt,
    permission: body.permission ?? 'public',
    updated_at: time,
    created_at: createdAt !== null ? parseInt(createdAt) : null,
    updated_at_date: new Date(time * 1000).toISOString().split("T")[0],
    created_at_date: createdAt !== null ? new Date(createdAt * 1000).toISOString().split("T")[0] : null,
  }

  await client.editMessage(config().GROUP_ID, {
    message: result.id,
    text: generateFormat(fileInfo),
    forceDocument: true,
    file: path,
    progressCallback: (progress) => { // NOTE: progress not work
      console.log(progress);
    },
  });

  await client.disconnect();

  return c.json(fileInfo);
};
