import { TelegramClient } from "gramjs";
import { StringSession } from "gramjs-session";
import { config } from "dotenv";

export default async () => {
  const client = new TelegramClient(
    new StringSession(config().SESSION),
    parseInt(config().API_ID),
    config().API_HASH,
    { connectionRetries: 5 }
  );

  await client.connect();

  return client;
};
