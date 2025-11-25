import { PrismaClient } from "@prisma/client/extension";
export type * from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

export type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

// biome-ignore lint/suspicious/noShadowRestrictedNames: Fix this later
declare const globalThis: {
  prismaGlobal: ExtendedPrismaClient;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export { prisma };
