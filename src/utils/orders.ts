import { headSetImage1, iPhoneImage1 } from "../../assets";
import { Order } from "../../types/global";

export const ORDERS: Order[] = [
  {
    id: 1,
    item: "Order 1",
    details: "Details about order 1",
    status: "pending",
    slug: "order-1",
    createdAt: "2024-07-01",
    items: [
      {
        id: 1,
        title: "Product 1",
        slug: "product-1",
        image: ["url1"],
        price: 10.0,
        heroImage: iPhoneImage1,
      },
      {
        id: 2,
        title: "Product 2",
        slug: "product-2",
        image: ["url2"],
        price: 20.0,
        heroImage: headSetImage1,
      },
    ],
  },
  {
    id: 2,
    item: "Order 2",
    details: "Details about order 2",
    status: "completed",
    slug: "order-2",
    createdAt: "2024-07-02",
    items: [
      {
        id: 3,
        title: "Product 3",
        slug: "product-3",
        image: ["url3"],
        price: 30.0,
        heroImage: headSetImage1,
      },
      {
        id: 4,
        title: "Product 4",
        slug: "product-4",
        image: ["url4"],
        price: 40.0,
        heroImage: headSetImage1,
      },
    ],
  },
  {
    id: 3,
    item: "Order 3",
    details: "Details about order 3",
    status: "shipped",
    slug: "order-3",
    createdAt: "2024-07-03",
    items: [
      {
        id: 5,
        title: "Product 5",
        slug: "product-5",
        image: ["url5"],
        price: 50.0,
        heroImage: headSetImage1,
      },
      {
        id: 6,
        title: "Product 6",
        slug: "product-6",
        image: ["url6"],
        price: 60.0,
        heroImage: headSetImage1,
      },
    ],
  },
  {
    id: 4,
    item: "Order 4",
    details: "Details about order 4",
    status: "in-transit",
    slug: "order-4",
    createdAt: "2024-07-04",
    items: [
      {
        id: 7,
        title: "Product 7",
        slug: "product-7",
        image: ["url7"],
        price: 70.0,
        heroImage: headSetImage1,
      },
      {
        id: 8,
        title: "Product 8",
        slug: "product-8",
        image: ["url8"],
        price: 80.0,
        heroImage: headSetImage1,
      },
    ],
  },
];
