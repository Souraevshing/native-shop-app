import { Session } from "@supabase/supabase-js";
import { ImageSourcePropType } from "react-native";

export declare type Category = {
  name: string;
  image: string;
  slug: string;
  imageUrl: string;
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
  imageUrl: string[] | null;
  price: number;
  heroImage: ImageSourcePropType;
  category?: Omit<Category, "products">;
  maxQuantity?: number;
};

export type User = {
  avatar_url: string;
  created_at: string | null;
  email: string;
  expo_notification_token: string | null;
  id: string;
  stripe_customer_id: string | null;
  type: string | null;
};

export type AuthState = {
  session: Session | null;
  mount: boolean;
  user: User | null;
};
