import { Api } from "gramjs";
import { config } from "dotenv";
import connect from "./clientConnect.ts";

export default async (id: string, cl = null) => {
  const client = cl ?? (await connect());
  const query = await client.invoke(
    new Api.messages.Search({
      peer: config().GROUP_ID,
      q: `id: ${id}`,
      filter: new Api.InputMessagesFilterEmpty(),
      limit: 1,
    })
  );

  let findIdByLatestMsg = null
  if (query.messages.length === 0) {
    const secQuery = await client.invoke(
      new Api.messages.Search({
        peer: config().GROUP_ID,
        q: "",
        filter: new Api.InputMessagesFilterDocument(),
        limit: 50,
      })
    );
  
    findIdByLatestMsg = secQuery.messages.find((a) => {
      const info = a.message.split('\n')
      return info[0].trim() === 'id: ' + id.trim()
    });

    if (!findIdByLatestMsg) {
      if (!cl) {
        await client.disconnect();
      }
      return false
    }
  }

  if (!cl) {
    await client.disconnect();
  }

  return query.messages.length >= 1 ? query.messages[0] : findIdByLatestMsg;
};
