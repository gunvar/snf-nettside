import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "snf-studio",
  title: "Skudeneshavn Næringsforening",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
