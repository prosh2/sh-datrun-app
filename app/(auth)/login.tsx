import { useSession } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function LoginPage() {
  const { storeToken } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      storeToken();
      router.replace("/(protected)/(tabs)");
      console.log("User logged in successfully");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User created:", user.uid);
      storeToken();
      router.replace("/(protected)/(tabs)"); // Navigate to home after signup
      // Optionally store user info, navigate, etc.
    } catch (error: any) {
      console.error("Error signing up:", error.code, error.message);
      // Handle errors like:
      // auth/email-already-in-use
      // auth/invalid-email
      // auth/weak-password
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/signin-bg.jpg")}
      style={styles.container}
      blurRadius={2}
      resizeMode="cover" // <-- Add this line
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>DatRun</Text>
        <Text style={styles.tagline}>Find your perfect running partner</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#ccc"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ccc"
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#fff" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSignUp(email, password)}>
          <Text style={styles.signUpText}>
            Don’t have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(46, 143, 94, 0.58)",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255, 255, 250, 0.76)",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: "rgba(24, 123, 153, 0.9)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  signInText: { color: "#fff", fontWeight: "bold" },
  forgotPassword: { color: "#fff", textAlign: "center", marginBottom: 20 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 123, 153, 0.9)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  socialText: { color: "#fff", marginLeft: 10 },
  signUpText: { color: "#fff", textAlign: "center", marginTop: 10 },
});
