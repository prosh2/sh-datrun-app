import { webClientId } from "@/constants/Constants";
import { getAuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function LoginPage() {
  const { loginWithEmailAndPassword, loginWithGoogle } = getAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  return (
    <LinearGradient colors={["#34d399", "#059669"]} style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/prosh2-logo-removebg.png")} //TODO: change to constant
          style={styles.logo}
        />

        {/* Tagline */}
        <Text style={styles.tagline}>It's DatRun</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => loginWithEmailAndPassword(email, password)}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* OR divider */}
        <Text style={styles.divider}>── OR ──</Text>

        {/* Social Sign In */}
        <View style={styles.socialButtons}>
          {/* TODO: APPLE Sign In */}
          {/* <TouchableOpacity style={styles.appleButton}>
            <Ionicons name="logo-apple" size={20} color="#fff" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>  */}

          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => loginWithGoogle()}
          >
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={[styles.socialText, { color: "#000" }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Prompt */}
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  tagline: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 32,
    marginTop: -32,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  passwordContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 4 : 4,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  signInButton: {
    backgroundColor: "#065f46",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.64)",
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#f0fdf4",
    textAlign: "center",
    marginBottom: 16,
  },
  divider: {
    textAlign: "center",
    color: "#fff",
    marginVertical: 16,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  appleButton: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialText: {
    color: "#fff",
    fontWeight: "600",
  },
  signUpText: {
    color: "#f0fdf4",
    textAlign: "center",
  },
});
