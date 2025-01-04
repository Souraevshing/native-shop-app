import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import { Tables } from "../../../types/database";
import { useFetchProductsAndCategories } from "../../api/api";
import ProductHeader from "../products/_components/product-list-header";
import ProductListItem from "../products/_components/product-list-item";

const Shop = () => {
  const { data, error, isLoading } = useFetchProductsAndCategories();

  // render individual items
  const renderItem = useCallback(({ item }: { item: Tables<"product"> }) => {
    return <ProductListItem product={item} />;
  }, []);

  if (error) {
    return (
      <Text style={{ textAlign: "center", color: "red" }}>{error.message}</Text>
    );
  }

  if (isLoading) {
    return (
      <ActivityIndicator style={{ width: 50, height: 50 }} color={"blue"} />
    );
  }

  return (
    <>
      <View>
        <FlatList
          data={data?.products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={5}
          windowSize={3}
          removeClippedSubviews={true}
          numColumns={1}
          ListHeaderComponent={
            <ProductHeader categories={data?.categories ?? []} />
          }
          contentContainerStyle={styles.flatListContent}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});

export default Shop;
