import { Size } from "@prisma/client";

export type CartItemType = {
  quantity: number;
  size: Size;
  foodId: number;
  specialRequest?: string;
  totalPrice: number;
  name: string;
  optionPrice: number;
  optionQuantity: number;
  photo: string;
  stripePriceId: string;
};
