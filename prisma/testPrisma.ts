import prisma from '../app/libs/prismadb';

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      hashedPassword: 'testpassword',
    },
  });
  console.log(newUser);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
