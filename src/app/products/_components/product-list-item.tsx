import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Tables } from "../../../../types/database";

export default function ProductListItem({
  product,
}: {
  product: Tables<"product">;
}) {
  return (
    <Link asChild href={`/products/${product.slug}`}>
      <Pressable>
        <View style={styles.itemImageContainer}>
          <Image source={{ uri: product.heroImage }} style={styles.itemImage} />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{product.title}</Text>
          <Text style={styles.itemPrice}>
            <FontAwesome
              name="inr"
              size={24}
              color="black"
              style={styles.itemPrice}
            />{" "}
            {product.price}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "48%",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 50,
    overflow: "hidden",
  },
  itemImageContainer: {
    borderRadius: 10,
    width: "100%",
    height: 150,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemTextContainer: {
    padding: 8,
    alignItems: "flex-start",
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    color: "#888",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "condensed",
  },
});
