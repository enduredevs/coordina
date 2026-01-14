import { prisma } from "@coordina/database";
import { unstable_cache } from "next/cache";
import { instanceSettingsTag } from "@/features/instance-settings/constants";
import "server-only";

export const getInstanceSettings = unstable_cache(
  async () => {
    const instanceSettings = await prisma.instanceSettings.findUnique({
      where: {
        id: 1,
      },
      select: {
        disableUserRegistration: true,
      },
    });

    return {
      disableUserRegistration:
        instanceSettings?.disableUserRegistration ?? false,
    };
  },
  [],
  {
    tags: [instanceSettingsTag],
  }
);
