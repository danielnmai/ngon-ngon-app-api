import { Prisma, Size } from "@prisma/client";

const foodWithOptions = Prisma.validator<Prisma.FoodDefaultArgs>()({
  include: { options: true },
});

type FoodWithOptions = Prisma.FoodGetPayload<typeof foodWithOptions>;

export const foods: FoodWithOptions[] = [
  {
    id: 1,
    name: "Bún Đậu Mắm Tôm Chả Cốm",
    description:
      "A traditional Northern Vietnamese platter featuring rice vermicelli noodles, crispy fried tofu, boiled pork, and fresh herbs. Served with a bold fermented shrimp paste dipping sauce, balanced with lime, chili, and sugar. A rustic yet vibrant dish full of authentic flavor.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/bun-dau-mam-tom-1.jpeg'],
    options: [
      {
        id: 1,
        size: Size.SMALL,
        minQuantity: 1,
        price: 1400,
        foodId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 2600,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 1,
      },
      {
        id: 3,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Mì Xào Hải Sản",
    description:
      "Wok-tossed egg noodles with a medley of fresh seafood, including shrimp, squid, and scallops, stir-fried with crisp seasonal vegetables in a savory garlic-soy sauce. A flavorful and aromatic seafood noodle dish with a satisfying balance of texture and taste.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/mi-xao-hai-san-1.jpeg'],
    options: [
      {
        id: 4,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 2,
      },
      {
        id: 5,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Gỏi Tiến Vua Lỗ Tai Heo",
    description:
      "A refreshing salad combining tender slices of pork ear and crunchy “king” vegetable, tossed in a tangy fish sauce dressing with garlic, lime, and chili. Garnished with fresh herbs, roasted peanuts, and fried shallots for a harmony of texture and flavor.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/goi-tien-vua-1.jpeg'],
    options: [
      {
        id: 6,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 3,
      },
      {
        id: 7,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Bánh Mì Xíu Mại",
    description:
      "A crusty baguette served with tender pork meatballs simmered in a rich tomato sauce. Accompanied by fresh herbs, pickled vegetables, and optional chili for a savory, comforting Vietnamese twist on the classic meatball sandwich.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/banh-mi-xiu-mai-1.jpeg'],
    options: [
      {
        id: 8,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 4,
      },
    ],
  },
  {
    id: 5,
    name: "Nui Xào Bò",
    description:
      "Stir-fried macaroni pasta with marinated beef slices, sautéed with garlic, onions, and vegetables in a flavorful soy-based sauce. A fusion of Vietnamese stir-fry and Western pasta, perfect for a hearty meal.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/nui-xao-bo-1.jpeg'],
    options: [
      {
        id: 9,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 5,
      },
      {
        id: 10,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 5,
      },
    ],
  },
  {
    id: 6,
    name: "Cánh Gà Chiên Nước Mắm",
    description:
      "Crispy golden chicken wings glazed in a rich, caramelized fish sauce reduction with hints of garlic and chili. A savory-sweet favorite packed with bold Vietnamese flavor.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/canh-ga-nuoc-mam-1.jpeg'],
    options: [
      {
        id: 11,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 6,
      },
      {
        id: 12,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 6,
      },
    ],
  },
  {
    id: 7,
    name: "Cánh Gà Rô Ti",
    description:
      "Marinated chicken wings slowly braised and roasted in a fragrant soy-garlic sauce with a touch of caramel. Tender, juicy, and deeply flavorful with a hint of sweetness.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/canh-ga-ro-ti-1.jpeg'],
    options: [
      {
        id: 13,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 7,
      },
      {
        id: 14,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 7,
      },
    ],
  },
  {
    id: 8,
    name: "Chả Giò Chay",
    description:
      "Crispy-fried spring rolls filled with a savory blend of vegetables, mung bean noodles, and tofu. Served with fresh herbs and a light soy or vegan dipping sauce.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/cha-gio-chay.jpeg', 'https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/cha-gio-chay-1.jpeg' ],
    options: [
      {
        id: 15,
        size: Size.MEDIUM,
        minQuantity: 20,
        price: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 8,
      },
    ],
  },
  {
    id: 9,
    name: "Chả Giò Mặn Chiên",
    description:
      "Golden-fried spring rolls filled with a savory mixture of ground pork, shrimp, vegetables, and vermicelli noodles. Served with fresh herbs and a tangy fish sauce dipping sauce. Crispy on the outside, flavorful and juicy on the inside — a classic Vietnamese appetizer.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/cha-gio-man.jpeg'],
    options: [
      {
        id: 16,
        size: Size.MEDIUM,
        minQuantity: 20,
        price: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 9,
      },
    ],
  },
  {
    id: 10,
    name: "Bì Cuốn Chay",
    description:
      "Delicate rice paper rolls wrapped around shredded tofu skin, vermicelli noodles, pickled vegetables, and fresh herbs. Served with a tangy vegan dipping sauce.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/bi-cuon-chay-1.jpeg'],

    options: [
      {
        id: 17,
        size: Size.MEDIUM,
        minQuantity: 10,
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 10,
      },
    ],
  },
  {
    id: 11,
    name: "Tôm Chiên Xù",
    description:
      "Plump shrimp coated in crispy panko breadcrumbs and lightly fried until golden. Served with a sweet chili dipping sauce for a crunchy, juicy bite.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/tom-chien-xu-1.jpeg'],

    options: [
      {
        id: 18,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 11,
      },
    ],
  },
  {
    id: 12,
    name: "Bắp Xào",
    description:
      "Sweet corn kernels sautéed with butter, green onions, and dried shrimp or vegetarian seasoning. A simple yet flavorful street food classic with a buttery, savory finish.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photos: ['https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/bap-xao.jpeg', 'https://ngon-ngon-app.s3.us-east-1.amazonaws.com/photos/bap-xao-1.jpeg'],

    options: [
      {
        id: 19,
        size: Size.SMALL,
        minQuantity: 1,
        price: 700,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 12,
      },
      {
        id: 20,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 12,
      },
      {
        id: 21,
        size: Size.LARGE,
        minQuantity: 1,
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 12,
      },
    ],
  },
];
