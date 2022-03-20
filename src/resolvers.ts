import { IResolvers } from "mercurius";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { writeFile } from "./util";

const  uploadImage =  async (_root, { image }) => {
  const { filename, createReadStream }: FileUpload = await image
  const rs = createReadStream();
  const path = await writeFile({ key: filename, file: rs });
  return path;
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
