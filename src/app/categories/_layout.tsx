import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function CategoriesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={"black"}
                  selectionColor={"gray"}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack>
  );
}
