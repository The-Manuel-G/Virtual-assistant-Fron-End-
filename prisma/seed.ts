import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

const users = [
    {
      name: 'Ariel Naranjo',
      email: 'arielnaranjoi829@gmail.com',
      password: bcrypt.hashSync('ariel12345', 10),
      role: Role.ADMIN, // Cambia a 'Role.USER' si usas TypeScript
    },
    {
      name: 'Bob',
      email: 'arielmanuel444@gmail.com',
      password: bcrypt.hashSync('ariel12345', 10),
      role: Role.USER, // Cambia a 'Role.ADMIN' si usas TypeScript
    },
  ];

async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: user
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
