import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(shop)"
        options={{ headerShown: false, title: "Shop" }}
      />

      <Stack.Screen
        name="categories"
        options={{ headerShown: true, title: "Categories" }}
      />

      <Stack.Screen
        name="products"
        options={{ headerShown: true, title: "Product" }}
      />

      <Stack.Screen
        name="cart"
        options={{ headerShown: true, title: "Cart" }}
      />

      <Stack.Screen
        name="auth"
        options={{ presentation: "modal", headerShown: true }}
      />
    </Stack>
  );
}
