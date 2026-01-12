import { PrismaClient, TimeFormat } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

export type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

// biome-ignore lint/suspicious/noShadowRestrictedNames: Fix this later
declare const globalThis: {
  prismaGlobal: ExtendedPrismaClient;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export { prisma };
export type { TimeFormat };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export * from "./generated/prisma";
