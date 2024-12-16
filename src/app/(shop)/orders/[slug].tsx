import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { ORDERS } from "../../../utils/orders";

export default function OrderDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  console.log(slug);
  const order = ORDERS.find((order) => order.slug === slug);

  if (!order) {
    return <Redirect href={"/404"} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `${order?.item}`, headerTitleAlign: "center" }}
      />
      <Text style={styles.details}>{order?.details}</Text>

      <View
        style={[styles.statusBadge, styles[`statusBadge${order?.status!}`]]}
      >
        <Text style={styles.statusText}>{order?.status}</Text>
      </View>
      <Text style={styles.date}>{order.createdAt}</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              <Image source={item.heroImage} style={styles.heroImage} />
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

const styles = StyleSheet.create({
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
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusBadgePending: {
    backgroundColor: "orange",
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
