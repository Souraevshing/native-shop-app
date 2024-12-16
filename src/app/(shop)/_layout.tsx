import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../providers/auth-provider";

const TabIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
  name: React.ComponentProps<typeof FontAwesome6>["name"];
}) => {
  return (
    <MaterialCommunityIcons
      {...props}
      size={24}
      style={{ color: props.focused ? "#66FF00" : "#BBEB5" }}
    />
  );
};

export default function TabsLayout() {
  const { mount, session } = useAuth();

  if (mount) {
    return (
      <ActivityIndicator
        animating
        size={"small"}
        style={{
          flex: 1,
        }}
      />
    );
  }

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#66FF00",
          tabBarInactiveTintColor: "#BEBFC5",
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 5,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Shop",
            tabBarIcon(props) {
              return <TabIcon name="shopping" {...props} color="black" />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon(props) {
              return <TabIcon name="book" {...props} />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
