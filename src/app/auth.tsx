import { Redirect } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useCustomToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-provider";
import { AuthForm, useAuthForm } from "../schema/auth.schema";

export default function Auth() {
  const { showSuccess, showError } = useCustomToast();

  const { control, formState, handleSubmit, reset } = useAuthForm();

  const { session } = useAuth();

  if (session) {
    return <Redirect href="(shop)" />;
  }

  const handleLogIn = async ({ email, password }: AuthForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError(`${error.message}`);
    } else {
      showSuccess(`Logged in successfully `);
    }

    reset();
  };

  const handleSignUp = async ({ email, password }: AuthForm) => {
    const { error } = await supabase.auth.signUp({ email, password });

    showSuccess(`Account created successfully`);

    if (error) {
      showError(`${error.message}`);
    }

    reset();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/auth-bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Welcome</Text>

        {/* Email Address */}
        <Text style={styles.emailLabel}>
          Email <Text style={styles.asterisk}>*</Text>
        </Text>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                autoFocus
                placeholderTextColor={"#b5c6e0"}
                placeholder="Enter email address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                editable={!formState.isSubmitting}
                style={styles.input}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
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
            fieldState: { invalid, error, isTouched },
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
                style={styles.input}
              />

              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        {/* Login Button */}
        <TouchableOpacity
          disabled={formState.isSubmitting}
          focusable
          role="button"
          accessibilityLabel="Log In"
          accessibilityHint="log in"
          accessibilityRole="button"
          onPress={handleSubmit(handleLogIn)}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={[styles.buttonText]}>Log In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          disabled={formState.isSubmitting}
          focusable
          role="button"
          accessibilityLabel="Sign Up"
          accessibilityHint="sign up"
          accessibilityRole="button"
          onPress={handleSubmit(handleSignUp)}
          style={[styles.button, styles.signUpButton]}
        >
          <Text style={[styles.buttonText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
  asterisk: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "90%",
    padding: 16,
    borderRadius: 99999,
    marginBottom: 16,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#2454FF",
    shadowColor: "#2454FF",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderColor: "#2454FF",
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
    textAlign: "left",
    width: "90%",
  },
});
