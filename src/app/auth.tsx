import { Redirect } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useCustomToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-provider";
import { AuthForm, useAuthForm } from "../schema/auth.schema";
import SpinningLoader from "./components/loader";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const { showSuccess, showError } = useCustomToast();

  const { control, formState, handleSubmit, reset } = useAuthForm();

  const { session } = useAuth();

  if (session) {
    return <Redirect href="(shop)" />;
  }

  const handleLogIn = async (data: AuthForm) => {
    setLoading(true);
    setIsLoginLoading(true);

    if (!data.email || !data.password) {
      Alert.alert("Mandatory", "All fields are mandatory", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", style: "default", isPreferred: true },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      showSuccess("Logged in successfully");

      if (error) {
        showError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) showError(error.message);
    } finally {
      setLoading(false);
    }
    reset();
  };

  const handleSignUp = async (data: AuthForm) => {
    setLoading(true);
    setIsSignupLoading(true);

    if (!data.email || !data.password) {
      Alert.alert("Mandatory", "All fields are mandatory", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", style: "default", isPreferred: true },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      showSuccess("Account created successfully");

      if (error) {
        showError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color="#0000ff" size="large" animating />
        </View>
      )}

      <ImageBackground
        source={require("../../assets/images/auth-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Hello, Welcome 🎉</Text>

          {/* Email Address */}
          <Text style={styles.emailLabel}>
            Email <Text style={styles.asterisk}>*</Text>
          </Text>
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error, isTouched },
            }) => (
              <>
                <TextInput
                  placeholderTextColor={"#b5c6e0"}
                  placeholder="Enter email address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  editable={!formState.isSubmitting}
                  style={styles.input}
                />
                {error && isTouched && (
                  <Text style={styles.error}>{error.message}</Text>
                )}
              </>
            )}
          />

          {/* Password */}
          <Text style={styles.passwordLabel}>
            Password <Text style={styles.asterisk}>*</Text>
          </Text>
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error, isTouched },
            }) => (
              <>
                <TextInput
                  secureTextEntry
                  placeholderTextColor={"#b5c6e0"}
                  placeholder="Enter password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  editable={!formState.isSubmitting}
                  style={[styles.input]}
                />

                {error && isTouched && (
                  <Text style={styles.error}>{error.message}</Text>
                )}
              </>
            )}
          />

          {/* Login Button */}
          <TouchableOpacity
            disabled={formState.isSubmitting || loading}
            focusable
            role="button"
            accessibilityLabel="Log In"
            accessibilityHint="log in"
            accessibilityRole="button"
            onPress={handleSubmit(handleLogIn)}
            style={[
              styles.button,
              styles.loginButton,
              loading && { opacity: 0.5 },
            ]}
          >
            {isLoginLoading ? (
              <SpinningLoader />
            ) : (
              <Text style={[styles.buttonText]}>Log In</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={formState.isSubmitting || loading}
            focusable
            role="button"
            accessibilityLabel="Sign Up"
            accessibilityHint="sign up"
            accessibilityRole="button"
            onPress={handleSubmit(handleSignUp)}
            style={[
              styles.button,
              styles.signUpButton,
              loading && { opacity: 0.5 },
            ]}
          >
            {isSignupLoading ? (
              <SpinningLoader />
            ) : (
              <Text style={[styles.buttonText]}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  emailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    width: "90%",
    textAlign: "left",
  },
  passwordLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    width: "90%",
    textAlign: "left",
  },
  passwordContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  asterisk: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(16, 16, 16, 0.9)",
    borderRadius: 8,
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    width: "90%",
    padding: 16,
    borderRadius: 99999,
    marginBottom: 16,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#2b2d42",
    borderColor: "#e5e5e5",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: "#403d39",
    borderColor: "#adb5bd",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  signUpText: {
    color: "#2454FF",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "center",
    width: "90%",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
