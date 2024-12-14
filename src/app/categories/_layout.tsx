import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function CategoriesLayout() {
  const navigation = useNavigation();

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
                  name="arrow-back-circle-sharp"
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
