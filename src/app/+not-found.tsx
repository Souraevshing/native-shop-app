import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, Divider } from "react-native-paper";

import { RootStackParamList } from "../types/navigation";

export default function NotFoundScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleButtonPress = () => {
    navigation.navigate("(shop)");
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Not found", headerShown: false, animation: "fade" }}
      />
      <ImageBackground
        source={require("../../assets/images/not-found.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.text}>Page not found!</Text>

          {/* Divider for separating content */}
          <Divider
            theme={{ roundness: 10, animation: { scale: 5 } }}
            style={styles.divider}
            bold
          />

          {/* Back Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained-tonal"
              textColor="white"
              rippleColor={"gray"}
              buttonColor="black"
              onPressIn={handleButtonPress}
            >
              Back to home
            </Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  divider: {
    width: "30%",
    height: 3,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: "#91A3B0",
  },
  buttonPressed: {
    backgroundColor: "#000",
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonLabelPressed: {
    color: "#FFF",
  },
});
