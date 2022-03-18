import stream from "stream";
import util from "util";
import { createWriteStream } from "fs";
import { join } from "path";

import { ReadStream } from "fs-capacitor";

const pipeline = util.promisify(stream.pipeline);

export const writeFile = async ({
  key,
  file,
}: {
  key: string;
  file: ReadStream;
}) => {
  const path = join(__dirname, key);
  await pipeline(file, createWriteStream(path));
  return path;
};
