import { config } from "dotenv";
import { existsSync } from "deno-fs";
import mimeExtension from "./mimeExtension.ts";

// NOTE: fix decission process
export default async (payload, id: string, isFile = true) => {
  let data, extension, fileType
  const time = Math.floor(new Date().getTime() / 1000);
  if (isFile) {
    data = new Uint8Array(await payload.arrayBuffer());
    fileType = payload.type;
    extension = mimeExtension[payload.type] ?? extension;
  } else {
    data = JSON.stringify(payload)
    extension = typeof payload === "object" ? "json" : "txt"
    fileType = typeof payload === "object" ? "application/json" : "text/plain"
  }
  const path = `${config().TMP_PATH + id}.${extension}`;
  if (config().TMP_PATH !== "/tmp/" && !existsSync(config().TMP_PATH)) {
    await Deno.mkdir(config().TMP_PATH, { recursive: true });
  }
  // upload to tmp folder
  isFile ? Deno.writeFileSync(path, data) : Deno.writeTextFileSync(path, data)

  return {
    path,
    ext: extension,
    time,
    fileType
  };
};
