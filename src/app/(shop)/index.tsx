import { memo, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Product } from "../../../types/global";
import { PRODUCTS } from "../../utils/products";
import ProductHeader from "../products/_components/product-list-header";
import ProductListItem from "../products/_components/product-list-item";

const Shop = () => {
  // render individual items
  const renderItem = useCallback(({ item }: { item: Product }) => {
    return <ProductListItem products={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={5}
        windowSize={3}
        removeClippedSubviews={true}
        numColumns={1}
        ListHeaderComponent={memo(ProductHeader)}
        contentContainerStyle={styles.flatListContent}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    </View>
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
