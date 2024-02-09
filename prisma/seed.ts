import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'Admin',
      email: 'admin@google.com',
      password: bcrypt.hashSync('admin', 10),
    },
  });

  console.log({ admin });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
