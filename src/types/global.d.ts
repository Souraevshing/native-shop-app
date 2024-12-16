import { ImageSourcePropType } from "react-native";

export declare type Category = {
  name: string;
  image: string;
  slug: string;
  products: Product[];
};

export type Order = {
  id: number;
  slug: string;
  item: string;
  details: string;
  status: "Pending" | "Completed" | "Shipped" | "InTransit";
  createdAt: string;
  items: Product[];
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  imageUrl: ImageSourcePropType[];
  price: number;
  heroImage: ImageSourcePropType;
  category?: Omit<Category, "products">;
  maxQuantity?: number;
};
