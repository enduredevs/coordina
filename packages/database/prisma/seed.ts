import { prisma } from "@coordina/database";
import { seedUsers } from "./seed/users";
import { seedPolls } from "./seed/poll";
import { seedScheduledEvents } from "./seed/scheduled-events";

async function main() {
  const users = await seedUsers();

  for (const user of users) {
    await seedPolls(user.id);
    await seedScheduledEvents(user.id);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
