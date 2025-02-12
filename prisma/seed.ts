import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

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

  await prisma.food.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Bún Đậu Mắm Tôm Chả Cốm",
      description: "Món ăn không thể thiếu",
      price: 1400,
    },
  });

  await prisma.food.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Mì Xào Hải Sản",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Gỏi Tiến Vua Lỗ Tai Heo",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Bánh Mì Xíu Mại",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Nui Xào Bò",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Cánh Gà Chiên Nước Mắm",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Cánh Gà Rô Ti Chiên Xả Ớt",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "Chả Giò Chay",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "Chả Giò Mặn Chiên",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: "Bì Cuốn Chay",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: "Tôm Chiên Xù",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });

  await prisma.food.upsert({
    where: { id: 11 },
    update: {},
    create: {
      name: "Bắp Xào",
      description: "Món ăn không thể thiếu",
      price: 5000,
    },
  });
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
