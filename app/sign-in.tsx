import { useSession } from "@/contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <ImageBackground
      source={require("../assets/images/signin-bg.jpg")}
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
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#fff" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signIn();
            router.replace("/protected");
          }}
        >
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
