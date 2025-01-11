import { Link, Stack } from "expo-router";
import moment from "moment";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { Tables } from "../../../../types/database";
import { useFetchOrders } from "../../../api/api";

const renderItem: ListRenderItem<Tables<"order">> = ({ item }) => {
  return (
    <Link href={`/orders/${item.slug}`} asChild>
      <Pressable style={styles.orderContainer}>
        <View style={styles.orderContent}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderItem}>{item.slug}</Text>
            <Text style={styles.orderDetails}>{item.description}</Text>
            <Text style={styles.orderDate}>
              {" "}
              {moment(item.created_at).format("ddd, DD MMMM yyyy")}
            </Text>
          </View>
          <View
            style={[styles.statusBadge, styles[`statusBadge${item.status}`]]}
          >
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default function Orders() {
  const { data, error, isLoading, refetch } = useFetchOrders();

  if (isLoading) {
    return <ActivityIndicator size="small" color="blue" animating />;
  }

  if (!data) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "red", fontWeight: "400" }}>
          {error?.message || "No data available"}
        </Text>
        <Button onPress={() => refetch()}>
          <Text>Try again</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  statusBadge: {
    width: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  statusBadgePending: {
    backgroundColor: "#ffcc00",
  },
  statusBadgeCompleted: {
    backgroundColor: "#4caf50",
  },
  statusBadgeShipped: {
    backgroundColor: "#2196f3",
  },
  statusBadgeInTransit: {
    backgroundColor: "#ff9800",
  },
});
