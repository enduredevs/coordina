import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import toArray from "dayjs/plugin/toArray";
import utc from "dayjs/plugin/utc";
import { auth } from "@/trpc/routers/auth";
import { mergeRouters, router } from "@/trpc/trpc";

// used for creating ics
dayjs.extend(timezone);
dayjs.extend(toArray);
dayjs.extend(utc);

export const appRouter = mergeRouters(
  router({
    auth,
  })
);

export type AppRouter = typeof appRouter;
