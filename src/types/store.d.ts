import { ImageSourcePropType } from "react-native";

export type CartItem = {
  id: number;
  title: string;
  heroImage: ImageSourcePropType;
  price: number;
  quantity: number;
  maxQuantity: number;
};

export type CartState = {
  items: CartItem[];
  addProducts: (product: CartItem) => void;
  removeProducts: (id: number) => void;
  addItems: (id: number) => void;
  removeItems: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItemsCount: () => number;
  resetCart: () => void;
};
