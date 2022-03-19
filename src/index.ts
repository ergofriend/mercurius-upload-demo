import Fastify from "fastify";
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import { codegenMercurius, loadSchemaFiles } from "mercurius-codegen";
import { resolvers } from "./resolvers";

const { schema } = loadSchemaFiles("./schema.graphql");

const app = Fastify({
  logger: true,
});
app.register(mercuriusUpload, { maxFileSize: 100000, maxFiles: 10 });
app.register(mercurius, {
  schema,
  resolvers,
  path: "/graphql",
});
app.listen(3000, '0.0.0.0');

codegenMercurius(app, {
  targetPath: "./src/generated.ts",
}).catch(console.error);
