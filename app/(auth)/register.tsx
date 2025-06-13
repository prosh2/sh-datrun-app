import { useSession } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

const SignUpScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithEmailAndPassword } = useSession();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      loginWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error("Error signing up:", error.code, error.message);
      // Handle errors like:
      // auth/email-already-in-use
      // auth/invalid-email
      // auth/weak-password
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient colors={["#34d399", "#059669"]} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign Up
          </Button>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#ffffff",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#065f46",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default SignUpScreen;
