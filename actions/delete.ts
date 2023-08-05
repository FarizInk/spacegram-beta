import { Context, HTTPException } from "hono";
import connect from "../utils/clientConnect.ts";
import authenticate from "../utils/authenticate.ts";
import getMessageById from "../utils/getMessageById.ts";
import { config } from "dotenv";

export default async (context: Context) => {
  authenticate(context);
  const client = await connect();

  const identifier = context.req.param("identifier");
  const result = await getMessageById(identifier, client);

  if (!result) {
    await client.disconnect();
    throw new HTTPException(404, { message: "File Not Found!" });
  }

  await client.deleteMessages(config().GROUP_ID, [result.id], {
    revoke: false,
  });
  await client.disconnect();

  context.json({
    id: identifier,
  });
};
