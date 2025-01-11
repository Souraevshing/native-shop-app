import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../types/navigation";
import { useCreateOrder, useCreateOrderItem } from "../api/api";
import { useCustomToast } from "../hooks/use-toast";
import useCartStore from "../store/cart";

const CartItemComponent = ({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: {
  item: {
    id: number;
    title: string;
    heroImage: string;
    price: number;
    quantity: number;
    maxQuantity: number;
  };
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}) => {
  const { showInfo } = useCustomToast();

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.heroImage }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          <FontAwesome
            name="inr"
            size={24}
            color="grey"
            style={{ fontSize: 14, fontWeight: 400 }}
          />{" "}
          {item.price.toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>
              <MaterialCommunityIcons name="minus" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onIncrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          onRemove(item.id);
          showInfo("Item removed");
        }}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Cart() {
  const {
    items,
    addItems,
    removeItems,
    getTotalPrice,
    getTotalItemsCount,
    removeProducts,
    resetCart,
  } = useCartStore();

  const { showSuccess } = useCustomToast();

  const { mutateAsync: createSupabaseOrder } = useCreateOrder();
  const { mutateAsync: createSupabaseOrderItem } = useCreateOrderItem();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (getTotalItemsCount() === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={styles.totalText}>Your cart is empty!</Text>
        <Button
          mode="contained-tonal"
          textColor="white"
          rippleColor={"gray"}
          buttonColor="black"
          onPress={() => navigation.navigate("(shop)")}
        >
          Shop Now
        </Button>
      </View>
    );
  }

  const handleCheckout = async () => {
    const totalPrice = getTotalPrice();
    try {
      await createSupabaseOrder(
        {
          totalPrice,
        },
        {
          onSuccess(data) {
            createSupabaseOrderItem(
              items.map((item) => ({
                orderId: data.id,
                productId: item.id,
                quantity: item.quantity,
              })),
              {
                onSuccess() {
                  Alert.alert("Success", "Order created successfully");
                  resetCart();
                },
                onError() {
                  Alert.alert("Error", "Order not created");
                },
              }
            );
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          style={Platform.OS === "android" ? "dark" : "auto"}
          hideTransitionAnimation="slide"
          animated
        />

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CartItemComponent
                item={item}
                onRemove={removeProducts}
                onIncrement={addItems}
                onDecrement={removeItems}
              />
            );
          }}
          contentContainerStyle={styles.cartList}
        />
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total:{" "}
            <FontAwesome
              name="inr"
              size={24}
              color="black"
              style={styles.priceSymbol}
            />{" "}
            {getTotalPrice()}
          </Text>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.checkoutButton}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 20,
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#ff5252",
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#007bff",
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  disabledButtonText: {
    color: "#a9a9a9",
  },
  priceSymbol: {
    fontSize: 16,
  },
});
