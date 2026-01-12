import { prisma } from "@coordina/database";

//import { posthog } from "@coordina/posthog/server";
//import * as Sentry from "@sentry/nextjs";

const getActiveSpaceForUser = async ({ userId }: { userId: string }) => {
  const spaceMember = await prisma.spaceMember.findFirst({
    where: {
      userId,
    },
    select: {
      spaceId: true,
    },
    orderBy: {
      lastSelectedAt: "desc",
    },
  });
  return spaceMember?.spaceId;
};

export const linkAnonymousUser = async ({
  authenticatedUserId,
  anonymousUserId,
}: {
  authenticatedUserId: string;
  anonymousUserId: string;
}) => {
  console.log("++ linkAnonymoustUser - entry ----------");
  // const spaceId = await getActiveSpaceForUser({ userId: authenticatedUserId });

  // if (!spaceId) {
  //   console.error(`User ${authenticatedUserId} has no active space`);
  //   return;
  // }

  // try {
  //   await prisma.$transaction(async (tx) => {
  //     // Transfer all data from anonymous user to authenticated user
  //     await Promise.all([
  //       // Transfer polls
  //       tx.poll.updateMany({
  //         where: {
  //           userId: anonymousUserId,
  //         },
  //         data: {
  //           userId: anonymousUserId,
  //           spaceId,
  //         },
  //       }),

  //       // Transfer participants
  //       tx.participant.updateMany({
  //         where: {
  //           userId: anonymousUserId,
  //         },
  //         data: {
  //           userId: authenticatedUserId,
  //         },
  //       }),

  //       // Transfer comments
  //       tx.comment.updateMany({
  //         where: {
  //           userId: anonymousUserId,
  //         },
  //         data: {
  //           userId: authenticatedUserId,
  //         },
  //       }),
  //     ]);
  //   });

  //   // Merge user identities in PostHog
  //   posthog?.capture({
  //     distinctId: authenticatedUserId,
  //     event: "$merge_dangerously",
  //     properties: { alias: anonymousUserId },
  //   });
  // } catch (error) {
  //   Sentry.captureException(error);
  // }
  console.log("---------- linkAnonymoustUser - end ++");
};
