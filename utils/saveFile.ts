import { config } from "dotenv";
import { existsSync } from "deno-fs";
import mimeExtension from "./mimeExtension.ts";

// NOTE: fix decission process
export default async (payload, id: string, isFile = true) => {
  let data, extension, fileType
  const filename = Math.floor(new Date().getTime() / 1000);
  if (isFile) {
    data = new Uint8Array(await payload.arrayBuffer());
    fileType = payload.type;
    extension = mimeExtension[payload.type] ?? extension;
  } else {
    data = JSON.stringify(payload)
    extension = typeof payload === "object" ? "json" : "txt"
    fileType = typeof payload === "object" ? "application/json" : "text/plain"
  }
  const path = config().TMP_PATH + filename + "." + extension;
  const getPath = `${config().TMP_PATH + id}.${extension}`;
  if (config().TMP_PATH !== "/tmp/" && !existsSync(config().TMP_PATH)) {
    await Deno.mkdir(config().TMP_PATH, { recursive: true });
  }
  // upload to storage
  isFile ? Deno.writeFileSync(path, data) : Deno.writeTextFileSync(path, data)
  // for caching "get" data
  isFile ? Deno.writeFileSync(getPath, data) : Deno.writeTextFileSync(getPath, data)

  return {
    path,
    ext: extension,
    filename,
    fileType,
  };
};
