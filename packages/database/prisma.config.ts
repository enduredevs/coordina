import * as path from "node:path";
import { defineConfig, env } from "prisma/config";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: path.resolve(__dirname, "prisma"),
  migrations: {
    path: path.resolve(__dirname, "prisma/migrations"),
    seed: "pnpm --filter db:seed",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
