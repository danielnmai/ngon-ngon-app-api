import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { foods } from "./seedData";

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      email: "test@email.com",
      name: "Test User",
      password: bcrypt.hashSync("1234", 10),
    },
  });
  await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      description: "Co Tu",
      total: 50000,
      paymentStatus: true,
      userId: user.id,
    },
  });
  for await (const food of foods) {
    const { id, ...fields } = food;
    await prisma.food.upsert({
      where: { id: food.id },
      update: { ...food },
      create: { ...fields },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
