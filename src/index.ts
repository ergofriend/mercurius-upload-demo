import Fastify from "fastify";
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import { resolvers } from "./resolvers";

const schema = `
scalar Upload

type Query {
  """ hello world """
  hello: String!
}

type Mutation {
  """ return image url """
  uploadImage(image: Upload): String!
}
`

const app = Fastify({
  logger: true,
});
app.register(mercuriusUpload);
app.register(mercurius, {
  schema,
  resolvers,
  path: "/graphql",
});
app.listen(3000, '0.0.0.0');
