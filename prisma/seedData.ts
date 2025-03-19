import { Prisma, Size } from "@prisma/client";

const foodWithOptions = Prisma.validator<Prisma.FoodDefaultArgs>()({
  include: { options: true },
});

type FoodWithOptions = Prisma.FoodGetPayload<typeof foodWithOptions>;

export const foods: Partial<FoodWithOptions[]> = [
  {
    id: 1,
    name: "Bún Đậu Mắm Tôm Chả Cốm",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.SMALL,
          minQuantity: 1,
          price: 1400,
        },
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 2600,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 5000,
        },
      ],
    },
  },
  {
    id: 2,
    name: "Mì Xào Hải Sản",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 5000,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 8000,
        },
      ],
    },
  },
  {
    id: 3,
    name: "Gỏi Tiến Vua Lỗ Tai Heo",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 5000,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 8000,
        },
      ],
    },
  },
  {
    id: 4,
    name: "Bánh Mì Xíu Mại",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 600,
        },
      ],
    },
  },
  {
    id: 5,
    name: "Nui Xào Bò",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 5000,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 8000,
        },
      ],
    },
  },
  {
    id: 6,
    name: "Cánh Gà Chiên Nước Mắm",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 2500,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 5000,
        },
      ],
    },
  },
  {
    id: 7,
    name: "Cánh Gà Rô Ti",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 2500,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 5000,
        },
      ],
    },
  },
  {
    id: 8,
    name: "Chả Giò Chay",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 20,
          price: 75,
        },
      ],
    },
  },
  {
    id: 9,
    name: "Chả Giò Mặn Chiên",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 20,
          price: 75,
        },
      ],
    },
  },
  {
    id: 10,
    name: "Bì Cuốn Chay",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 10,
          price: 150,
        },
      ],
    },
  },
  {
    id: 11,
    name: "Tôm Chiên Xù",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 5000,
        },
      ],
    },
  },
  {
    id: 12,
    name: "Bắp Xào",
    description: "Món ăn không thể thiếu",
    options: {
      create: [
        {
          size: Size.SMALL,
          minQuantity: 1,
          price: 700,
        },
        {
          size: Size.MEDIUM,
          minQuantity: 1,
          price: 1500,
        },
        {
          size: Size.LARGE,
          minQuantity: 1,
          price: 3000,
        },
      ],
    },
  },
];
