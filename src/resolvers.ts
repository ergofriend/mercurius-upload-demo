import { IResolvers } from "mercurius";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { writeFile } from "./util";

const  uploadImage =  async (_root, { image }) => {
  const { filename, createReadStream }: FileUpload = await image
  const rs = createReadStream();
  const path = await writeFile({ key: filename, file: rs });
  let data = "";

  for await (const chunk of rs) {
    data += chunk;
  }

  return path + data;
};

export const resolvers: IResolvers = {
  Upload: GraphQLUpload,
  Query: {
    hello: () => "world",
  },
  Mutation: {
    uploadImage,
  },
};
