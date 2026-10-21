import { createContext, useContext, useState, type ReactNode } from "react";
import { clearStoredUser, getStoredUser, setStoredUser } from "../storage";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";

interface AuthContextValue {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => getStoredUser());

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setStoredUser(username);
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }
  return ctx;
}
