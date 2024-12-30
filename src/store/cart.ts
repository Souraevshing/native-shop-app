import { create } from "zustand";
import { CartItem, CartState } from "../../types/store";

const useCartStore = create<CartState>((set, get) => ({
  items: [] as CartItem[],

  // Add a product to the cart
  addProducts: (product: CartItem) => {
    const existingProduct = get().items.find((item) => item.id === product.id);
    if (existingProduct) {
      // If the product already exists, increment its quantity
      set((state) => ({
        items: state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + product.quantity,
                  item.maxQuantity
                ),
              }
            : item
        ),
      }));
    } else {
      // Otherwise, add the product to the cart
      set((state) => ({
        items: [...state.items, product],
      }));
    }
  },

  // Remove a product from the cart
  removeProducts: (id: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Increment the quantity of an item
  addItems: (id: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  // Decrement the quantity of an item
  removeItems: (id: number) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0), // Remove items with quantity 0
    }));
  },

  // Get the total price of items in the cart
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // Get the total number of items in the cart
  getTotalItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  resetCart() {
    set({ items: [] });
  },
}));

export default useCartStore;
