import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContext } from "@/trpc/context";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;

export const procedureWithAnalytics = t.procedure.use(
  async ({ next, type }) => {
    const analytics = {};
    const res = await next({
      ctx: {
        analytics,
      },
    });

    if (type === "mutation") {
      // wait
    }

    return res;
  }
);

export const publicProcedure = procedureWithAnalytics;
