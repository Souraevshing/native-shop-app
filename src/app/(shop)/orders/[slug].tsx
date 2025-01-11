import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { useFetchOrder } from "../../../api/api";

export default function OrderDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data, error, isLoading, refetch } = useFetchOrder(slug);

  console.log(data);

  const orderItems = data?.order_items.map((orderItem) => {
    return {
      id: orderItem.id,
      title: orderItem.products.title,
      heroImage: orderItem.products.heroImage,
      price: orderItem.products.price,
      quantity: orderItem.quantity,
    };
  });

  if (!data) {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "red", fontWeight: "400" }}>
          {error?.message}
        </Text>
        <Button onPress={() => refetch()}>
          <Text>Try again</Text>
        </Button>
      </View>
    );
  }

  if (isLoading) {
    <ActivityIndicator size={"small"} color="blue" animating />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `${data.slug}`, headerTitleAlign: "center" }}
      />
      <Text style={styles.details}>{data.description}</Text>

      <View style={[styles.statusBadge, styles[`statusBadge${data.status}`]]}>
        <Text style={styles.statusText}>{data.status}</Text>
      </View>
      <Text style={styles.date}>
        {moment(data.created_at).format("MMMM Do YYYY, h:mm:ss A")}
      </Text>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              <Image
                source={{ uri: item.heroImage }}
                style={styles.heroImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>
                  Price:{" "}
                  <FontAwesome
                    name="inr"
                    size={24}
                    color="black"
                    style={styles.priceSymbol}
                  />{" "}
                  {item.price}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 8,
    borderRadius: 99,
    alignSelf: "flex-start",
  },
  statusBadgePending: {
    backgroundColor: "#fca311",
  },
  statusBadgeCompleted: {
    backgroundColor: "green",
  },
  statusBadgeShipped: {
    backgroundColor: "blue",
  },
  statusBadgeInTransit: {
    backgroundColor: "purple",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 16,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  heroImage: {
    width: "50%",
    height: 100,
    borderRadius: 10,
  },
  itemInfo: {},
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  priceSymbol: {
    fontSize: 14,
  },
});
