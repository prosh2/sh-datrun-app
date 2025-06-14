import { useStorageState } from "@/hooks/useStorageState";
import { auth } from "@/lib/firebase";
import { userExistsInDB, writeUserToDB } from "@/utils/firebase-utils";
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
  firebaseUser: User | null;
}>({
  loginWithGoogle: () => null,
  loginWithEmailAndPassword: () => null,
  logout: () => null,
  session: null,
  isLoading: false,
  firebaseUser: null,
});

// This hook can be used to access the user info.
export function getAuthContext() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("getAuthContext must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const storeTokenAndNavigate = (token: string) => {
    setSession(token);
    router.replace("/(protected)/(home)");
    console.log("User logged in successfully");
  };

  const loginWithGoogle = async () => {
    // Perform sign-in logic here potentially using Firebase or another auth provider
    // For example, you might use Firebase Auth to sign in a user
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const result = await signInWithCredential(
          auth,
          GoogleAuthProvider.credential(response.data.idToken),
        );
        const token = await result.user.getIdToken();
        const hasUser = await userExistsInDB(result.user.uid);
        if (!hasUser) {
          console.log("First time logging in");
          await writeUserToDB(result.user);
        }
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
      const hasUser = await userExistsInDB(result.user.uid);
      if (!hasUser) {
        console.log("First time logging in");
        await writeUserToDB(result.user);
      }
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
    const unsub = onAuthStateChanged(auth, setFirebaseUser);
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
        firebaseUser,
      }}
    >
      {children}
    </AuthContext>
  );
}
