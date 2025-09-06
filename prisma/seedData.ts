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
        stripePriceId: 'price_1S3nHMKA1oovtT3Z2n9tmGL0'

      },
      {
        id: 2,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 2600,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 1,
        stripePriceId: 'price_1S1F0hKA1oovtT3Z0sIQpKiz'
      },
      {
        id: 3,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 1,
        stripePriceId: 'price_1S3nHMKA1oovtT3Z2n9tmGL0'
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
        stripePriceId: 'price_1S3nMsKA1oovtT3ZUqzOmnl2'
      },
      {
        id: 5,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 2,
        stripePriceId: 'price_1S3nMGKA1oovtT3ZfWLooNWD'
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
        stripePriceId: 'price_1S3nO6KA1oovtT3Zm5dExpe1'
      },
      {
        id: 7,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 3,
        stripePriceId: 'price_1S3nOUKA1oovtT3Z9hRBIPCM'
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
        stripePriceId: 'price_1S3nOzKA1oovtT3ZMYEdAYiH'
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
        stripePriceId: 'price_1S3nPqKA1oovtT3Z2X3fWkTu'
      },
      {
        id: 10,
        size: Size.LARGE,
        minQuantity: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 5,
        stripePriceId: 'price_1S3nQBKA1oovtT3ZWFbtAoGk'
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
        stripePriceId: 'price_1S441pKA1oovtT3Za3LLIuL3'
      },
      {
        id: 12,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 6,
        stripePriceId: 'price_1S442KKA1oovtT3Z4iLJ06pW'
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
        stripePriceId: 'price_1S445kKA1oovtT3ZexnIkDOP'
      },
      {
        id: 14,
        size: Size.LARGE,
        minQuantity: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 7,
        stripePriceId: 'price_1S446BKA1oovtT3ZzIDlMIHS'
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
        stripePriceId: 'price_1S447CKA1oovtT3Z2bTtHeqg'
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
        stripePriceId: 'price_1S447kKA1oovtT3ZJQNpHUR8'
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
        stripePriceId: 'price_1S448KKA1oovtT3ZtBYTwBBF'
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
        stripePriceId: 'price_1S448wKA1oovtT3ZZy84omh4'
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
        stripePriceId: 'price_1S449YKA1oovtT3Z6iXMvQ84'
      },
      {
        id: 20,
        size: Size.MEDIUM,
        minQuantity: 1,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 12,
        stripePriceId: 'price_1S44A3KA1oovtT3ZuNYf5PxJ'
      },
      {
        id: 21,
        size: Size.LARGE,
        minQuantity: 1,
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
        foodId: 12,
        stripePriceId: 'price_1S44AZKA1oovtT3ZN0Ik2NNo'
      },
    ],
  },
];
