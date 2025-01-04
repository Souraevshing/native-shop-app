import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Tables } from "../../../../types/database";
import { useCustomToast } from "../../../hooks/use-toast";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../providers/auth-provider";
import useCartStore from "../../../store/cart";

export default function ProductHeader({
  categories,
}: {
  categories: Tables<"category">[];
}) {
  const { getTotalItemsCount } = useCartStore();
  const { user } = useAuth();
  const { showError, showSuccess } = useCustomToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // render category as memoized fn to optimize performance
  const renderItem = useCallback(({ item }: { item: Tables<"category"> }) => {
    return (
      <Link asChild href={`/categories/${item.slug}`}>
        <Pressable style={styles.category}>
          <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </Pressable>
      </Link>
    );
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      showSuccess("Logged out successfully");
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    } finally {
      setIsSigningOut(false);
    }
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
            <Text
              style={[
                styles.avatarText,
                { fontWeight: "600", color: "#4a4e69" },
              ]}
            >
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
                    size={25}
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
            disabled={isSigningOut}
          >
            <MaterialIcons
              name="logout"
              size={25}
              color="#eb5e28"
              role="button"
            />
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
          data={categories}
          renderItem={renderItem}
          initialNumToRender={5}
          windowSize={3}
          removeClippedSubviews={true}
          keyExtractor={(item) => item.id.toString()}
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
    fontWeight: 900,
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
    backgroundColor: "#fca311",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
