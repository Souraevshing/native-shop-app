export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addProducts: (product: CartItem) => void;
  removeProducts: (id: number) => void;
  addItems: (id: number) => void;
  removeItems: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItemsCount: () => number;
};
