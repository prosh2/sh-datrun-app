import { AppUser } from "@/components/model/User";
import { createContext, PropsWithChildren, use, useState } from "react";

const UserContext = createContext<{
  setUser: (user: AppUser | null) => void;
  setDisplayPhoto: (photo: string | null) => void;
  displayPhoto: string | null;
  user: AppUser | null;
}>({
  setUser: () => null,
  setDisplayPhoto: () => null,
  displayPhoto: null,
  user: null,
});

export function getUserContext() {
  const value = use(UserContext);
  if (!value) {
    throw new Error("getUserContext must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function UserContextProvider({ children }: PropsWithChildren) {
  const [displayPhoto, setDisplayPhoto] = useState<string | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);

  return (
    <UserContext.Provider
      value={{ displayPhoto, setDisplayPhoto, setUser, user }}
    >
      {children}
    </UserContext.Provider>
  );
}
