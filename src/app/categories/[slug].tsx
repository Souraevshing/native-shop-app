import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import { Tables } from "../../../types/database";
import { useFetchCategoriesAndProducts } from "../../api/api";
import ProductListItem from "../products/_components/product-list-item";

// render single category based on slug
export default function Category() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data, error, isLoading } = useFetchCategoriesAndProducts(slug);

  // show not-found page for category not exist
  if (!data?.category && !data?.products) {
    return <Redirect href={"/404"} />;
  }

  if (isLoading) {
    return <ActivityIndicator size="small" color="blue" />;
  }

  if (error) {
    return (
      <Text style={{ textAlign: "center", color: "red" }}>{error.message}</Text>
    );
  }

  const { category, products } = data;

  const renderItem = useCallback(({ item }: { item: Tables<"product"> }) => {
    return <ProductListItem product={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: category.name,
          headerTitleAlign: "center",
        }}
      />

      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
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
