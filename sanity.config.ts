"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "jbt",
  title: "Jeff Builds Tech",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), codeInput()],
});
