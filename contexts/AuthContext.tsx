import { useStorageState } from "@/hooks/useStorageState";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
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
  login: () => void;
  logout: () => void;
  session?: string | null;
  isLoading: boolean;
  user: User | null;
}>({
  login: () => null,
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <AuthContext
      value={{
        login: () => {
          // Perform sign-in logic here potentially using Firebase or another auth provider
          // For example, you might use Firebase Auth to sign in a user
          setSession("xxx");
        },
        logout: async () => {
          await signOut(auth);
          setSession(null);
        },
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext>
  );
}
