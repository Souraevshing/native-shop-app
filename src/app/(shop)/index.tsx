import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { Product } from "../../types/global";
import Auth from "../auth";
import ProductListItem from "../products/_components/product-list-item";

const Shop = () => {
  // render individual items
  const renderItem = useCallback(({ item }: { item: Product }) => {
    return <ProductListItem products={item} />;
  }, []);

  return (
    <>
      <Auth />
      {/* <View>
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
      </View> */}
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
