import { config } from "dotenv";
import { existsSync } from "deno-fs";
import mimeExtension from "./mimeExtension.ts";

export default async (payload, id: string, isFile = true, isPrivate = false) => {
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
  const basePath = config().TMP_PATH + (isPrivate ? 'private/' : '')
  const filename = `${id}.${extension}`;
  if (!existsSync(basePath)) {
    await Deno.mkdir(basePath, { recursive: true });
  }

  const path = basePath + filename

  // upload to tmp folder
  isFile ? Deno.writeFileSync(path, data) : Deno.writeTextFileSync(path, data)

  return {
    path,
    ext: extension,
    time,
    fileType
  };
};
