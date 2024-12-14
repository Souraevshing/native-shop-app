import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, Divider } from "react-native-paper";

export default function NotFoundScreen() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonPress = () => {
    setIsPressed(true); // Update button state
    setTimeout(() => {
      router.back(); // Navigate back after a small delay for effect
    }, 200);
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
              onPress={handleButtonPress}
              style={[styles.button, isPressed && styles.buttonPressed]}
              labelStyle={[
                styles.buttonLabel,
                isPressed && styles.buttonLabelPressed,
              ]}
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
    height: 5,
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
