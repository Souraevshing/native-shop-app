import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCustomToast } from "../../../hooks/use-toast";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../providers/auth-provider";
import useCartStore from "../../../store/cart";
import { Category } from "../../../types/global";
import { CATEGORIES } from "../../../utils/categories";

export default function ProductHeader() {
  const { getTotalItemsCount } = useCartStore();
  const { user } = useAuth();
  const { showError, showSuccess } = useCustomToast();

  // render category as memoized fn to optimize performance
  const renderItem = useCallback(({ item }: { item: Category }) => {
    return (
      <Link asChild href={`/categories/${item.slug}`}>
        <Pressable style={styles.category}>
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </Pressable>
      </Link>
    );
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showSuccess("Logged out successfully");
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <FontAwesome6
              name="user-circle"
              size={24}
              color="black"
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>
              Hello {user?.email.split("@")[0]}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href="/cart" asChild>
            <Pressable delayHoverIn={50} delayHoverOut={50}>
              {({ pressed }) => (
                <View>
                  <MaterialCommunityIcons
                    name="shopping"
                    size={30}
                    color="black"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />

                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getTotalItemsCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}
            delayPressIn={50}
            delayPressOut={50}
          >
            <MaterialCommunityIcons name="logout" size={30} color="#FB5607" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require("../../../../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={renderItem}
          initialNumToRender={5}
          windowSize={3}
          removeClippedSubviews={true}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
