import { prisma } from "../src/lib/prisma.js";

async function main() {
  // await prisma.category.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
