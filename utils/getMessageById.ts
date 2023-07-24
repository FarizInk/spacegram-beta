import { Api } from "gramjs";
import { config } from "dotenv";
import connect from "./clientConnect.ts";

export default async (id: string, cl = null) => {
  const client = cl ?? (await connect());
  const query = await client.invoke(
    new Api.messages.Search({
      peer: config().GROUP_ID,
      q: id,
      filter: new Api.InputMessagesFilterEmpty(),
      limit: 1,
    })
  );

  const secQuery = await client.invoke(
    new Api.messages.Search({
      peer: config().GROUP_ID,
      q: "",
      filter: new Api.InputMessagesFilterDocument(),
      limit: 50,
    })
  );

  const findIdByLatestMsg = secQuery.messages.find(
    (a) => a.message.trim() === id.trim()
  );

  if (!cl) {
    await client.disconnect();
  }

  if (query.messages.length === 0 && !findIdByLatestMsg) {
    return false;
  }

  return query.messages.length >= 1 ? query.messages[0] : findIdByLatestMsg;
};
