import "dotenv/config";
import { defineConfig, env } from "prisma/config";

console.log("Running +++ ");

export default defineConfig({
  schema: "./packages/database/prisma/schema.prisma",
  migrations: {
    path: "./packages/database/prisma/migrations",
    seed: "pnpm --filter @coordina/database db:seed",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
