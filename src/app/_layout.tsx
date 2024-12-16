import {
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../providers/auth-provider";

export default function RootLayout() {
  return (
    <ToastProvider
      swipeEnabled={true}
      placement="top"
      duration={1000}
      animationType="slide-in"
      animationDuration={300}
      successColor="green"
      dangerColor="red"
      warningColor="#FFDB58"
      normalColor="gray"
      style={{ borderRadius: 500 }}
      successIcon={
        <MaterialCommunityIcons name="check-decagram" size={24} color="green" />
      }
      dangerIcon={<MaterialIcons name="error" size={24} color="red" />}
      warningIcon={<MaterialIcons name="warning" size={24} color="#FFDB58" />}
      icon={<Fontisto name="shopping-store" size={14} color="#F8F4FF" />}
    >
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(shop)"
            options={{
              headerShown: false,
              title: "Shop",
              headerTitleAlign: "center",
              sheetElevation: 10,
              animation: "fade",
              statusBarTranslucent: false,
              statusBarStyle: "dark",
              statusBarAnimation: "fade",
            }}
          />

          <Stack.Screen
            name="categories"
            options={{
              headerShown: false,
              title: "Categories",
              headerTitleAlign: "center",
              sheetElevation: 10,
              animation: "fade",
              statusBarTranslucent: false,
              statusBarStyle: "dark",
              statusBarAnimation: "fade",
            }}
          />

          <Stack.Screen
            name="products"
            options={{
              headerShown: false,
              title: "Product",
              headerTitleAlign: "center",
              sheetElevation: 10,
              animation: "fade",
              statusBarTranslucent: false,
              statusBarStyle: "dark",
              statusBarAnimation: "fade",
            }}
          />

          <Stack.Screen
            name="cart"
            options={{
              headerShown: false,
              title: "Cart",
              headerTitleAlign: "center",
              sheetElevation: 10,
              animation: "fade",
              statusBarTranslucent: false,
              statusBarStyle: "dark",
              statusBarAnimation: "fade",
            }}
          />

          <Stack.Screen
            name="auth"
            options={{
              presentation: "modal",
              headerShown: false,
              headerTitleAlign: "center",
              sheetElevation: 10,
              animation: "fade",
              statusBarTranslucent: false,
              statusBarStyle: "dark",
              statusBarAnimation: "fade",
            }}
          />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}
