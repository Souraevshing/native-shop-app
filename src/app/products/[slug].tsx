import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import useCartStore from "../../store/cart";
import { PRODUCTS } from "../../utils/products";

export default function ProductDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const toast = useToast();

  const { items, addItems, removeItems, addProducts } = useCartStore();

  const product = PRODUCTS.find((product) => product.slug === slug);

  // fetch cart details
  const cartItems = items.find((item) => item.id === product?.id);

  const [quantity, setQuantity] = useState(
    (cartItems && cartItems.quantity) || 1
  );

  // add items from cart
  const increaseItems = () => {
    if (quantity < product?.maxQuantity!) {
      setQuantity((quantity) => quantity + 1);
      addItems(product?.id!);
    }
  };

  // remove items from cart
  const decreaseItems = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
      removeItems(product!.id);
    }
  };

  // add products to cart
  const addProductsToCart = () => {
    addProducts({
      id: product?.id!,
      title: product?.title!,
      heroImage: product?.heroImage!,
      price: product?.price!,
      quantity,
      maxQuantity: product?.maxQuantity!,
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: string | ImageSourcePropType }) => {
      const imageSource = typeof item === "string" ? { uri: item } : item;
      return <Image source={imageSource} style={styles.image} />;
    },
    []
  );

  // show 404 if product not found
  if (!product) {
    return <Redirect href="/404" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.title,
          headerTitleAlign: "center",
        }}
      />
      <Image source={product.heroImage} style={styles.heroImage} />
      <View style={{ padding: 15, flex: 1 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.slug}>Slug: {slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            <FontAwesome
              name="inr"
              size={24}
              color="black"
              style={styles.priceSymbol}
            />{" "}
            {product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>
            Total:{" "}
            <FontAwesome
              name="inr"
              size={24}
              color="black"
              style={styles.priceSymbol}
            />{" "}
            {(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <FlatList
          data={product.imageUrl}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={decreaseItems}
            disabled={quantity <= 1}
            style={[
              styles.quantityButton,
              quantity <= 1 && styles.disabledButton,
            ]}
          >
            <Text
              style={
                quantity <= 1
                  ? styles.disabledButtonText
                  : styles.quantityButtonText
              }
            >
              <MaterialCommunityIcons name="minus" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={increaseItems}
            disabled={quantity >= product.maxQuantity!}
            style={[
              styles.quantityButton,
              quantity >= product.maxQuantity! && styles.disabledButton,
            ]}
          >
            <Text
              style={
                quantity >= product.maxQuantity!
                  ? styles.disabledButtonText
                  : styles.quantityButtonText
              }
            >
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              {
                opacity: quantity === 0 ? 0.5 : 1,
              },
            ]}
            onPress={addProductsToCart}
            disabled={quantity === 0}
          >
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceSymbol: { fontSize: 14 },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  disabledButtonText: {
    color: "#a9a9a9",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});