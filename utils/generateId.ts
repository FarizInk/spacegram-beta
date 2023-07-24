import { ulid } from "ulid";
import connect from "./clientConnect.ts";
import getMessageById from "./getMessageById.ts";

export default async (cl = null) => {
  const client = cl ?? (await connect());
  let loop = true;
  let id = ulid();
  while (loop) {
    const result = await getMessageById(id, client);
    if (!result) {
      loop = false;
    } else {
      id = ulid();
    }
  }

  if (!cl) {
    await client.disconnect();
  }

  return id;
};
