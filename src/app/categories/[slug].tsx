import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { ActivityIndicator, Button } from "react-native-paper";
import { Tables } from "../../../types/database";
import { useFetchCategoriesAndProducts } from "../../api/api";
import { useCustomToast } from "../../hooks/use-toast";
import ProductListItem from "../products/_components/product-list-item";

export default function Category() {
  const { showError } = useCustomToast();

  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data, error, isLoading, refetch } =
    useFetchCategoriesAndProducts(slug);

  if (isLoading) {
    return <ActivityIndicator size="small" color="blue" animating />;
  }

  if (!data!.category && !data!.products) {
    showError(error?.message!);

    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "red", fontWeight: "400" }}>
          {error?.message || "No data available"}
        </Text>
        <Button onPress={() => refetch()}>
          <Text>Try again</Text>
        </Button>
      </View>
    );
  }

  // Use `useCallback` to memoize the render function
  const renderItem = ({ item }: { item: Tables<"product"> }) => (
    <ProductListItem product={item} />
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: data!.category?.name || "Category",
          headerTitleAlign: "center",
        }}
      />

      {data!.category?.imageUrl && (
        <Image
          source={{ uri: data!.category?.imageUrl }}
          style={styles.categoryImage}
        />
      )}
      <Text style={styles.categoryName}>{data!.category?.name}</Text>
      <FlatList
        data={data!.products}
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
