import { Category } from "../../types/global";
import { PRODUCTS } from "./products";

export const CATEGORIES: Category[] = [
  {
    name: "Laptops",
    slug: "laptops",
    image: "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg",
    products: PRODUCTS.filter(
      (product) => product.category?.slug === "laptops"
    ),
  },
  {
    name: "Phones",
    slug: "phones",
    image:
      "https://images.pexels.com/photos/40739/mobile-phone-smartphone-tablet-white-40739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    products: PRODUCTS.filter((product) => product.category?.slug === "phones"),
  },
  {
    name: "Gaming",
    slug: "gaming",
    image:
      "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    products: PRODUCTS.filter((product) => product.category?.slug === "gaming"),
  },
  {
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    products: PRODUCTS.filter(
      (product) => product.category?.slug === "accessories"
    ),
  },
];
