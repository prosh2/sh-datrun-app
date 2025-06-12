import { useStorageState } from "@/hooks/useStorageState";
import { auth } from "@/lib/firebase";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Alert } from "react-native";

const AuthContext = createContext<{
  loginWithGoogle: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  logout: () => void;
  session?: string | null;
  isLoading: boolean;
  user: User | null;
}>({
  loginWithGoogle: () => null,
  loginWithEmailAndPassword: () => null,
  logout: () => null,
  session: null,
  isLoading: false,
  user: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<User | null>(null);

  const storeTokenAndNavigate = (token: string) => {
    setSession(token);
    router.replace("/(protected)/(tabs)");
    console.log("User logged in successfully");
  };

  const loginWithGoogle = async () => {
    // Perform sign-in logic here potentially using Firebase or another auth provider
    // For example, you might use Firebase Auth to sign in a user
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const credential = GoogleAuthProvider.credential(response.data.idToken);
        const result = await signInWithCredential(auth, credential);
        const token = await result.user.getIdToken();
        storeTokenAndNavigate(token);
      } else {
        console.log("cancelled");
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log("in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            console.log("play services not available");
            break;
          default:
            // some other error happened
            console.error(error);
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      storeTokenAndNavigate(token);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setSession(null);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <AuthContext
      value={{
        loginWithGoogle,
        loginWithEmailAndPassword,
        logout,
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext>
  );
}
