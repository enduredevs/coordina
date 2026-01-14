import { prisma } from "@coordina/database";
import { z } from "zod";
import { publicProcedure, router } from "@/trpc/trpc";

export const auth = router({
  getUserInfo: publicProcedure
    .input(
      z.object({
        email: z.email(),
      })
    )
    .mutation(async ({ input }) => {
      const count = await prisma.user.count({
        where: {
          email: input.email,
        },
      });

      return { isRegistered: count > 0 };
    }),
});
