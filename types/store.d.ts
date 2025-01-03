export type CartItem = {
  id: number;
  title: string;
  heroImage: string;
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
