import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { Product } from "../../../types/global";
import { CATEGORIES } from "../../utils/categories";
import { PRODUCTS } from "../../utils/products";
import ProductListItem from "../products/_components/product-list-item";

// render single item based on slug
export default function Category() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find((category) => category.slug === slug);

  const products = PRODUCTS.filter(
    (product) => product.category?.slug === slug
  );

  // show not-found page for category not exist
  if (!category) {
    return <Redirect href={"/404"} />;
  }

  const renderItem = useCallback(({ item }: { item: Product }) => {
    return <ProductListItem products={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: category.name,
          headerTitleAlign: "center",
        }}
      />

      <Image source={{ uri: category.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
