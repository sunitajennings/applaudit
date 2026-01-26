"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

const STORAGE_KEY = "applaudit_auth";

export type User = {
  id: string;
  email: string;
  nickname?: string;
  avatarUrl?: string; // URL to selected avatar image, or null for initials-based avatar
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingEmail: string | null;
};

type AuthContextType = AuthState & {
  signInWithEmail: (email: string) => void;
  completeSignIn: () => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  getInitials: (nickname: string) => string;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Helper to get initials from nickname (first 2 letters)
export function getInitials(nickname: string): string {
  return nickname.slice(0, 2).toUpperCase();
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

interface StoredAuthState {
  user: User | null;
  pendingEmail: string | null;
}

function loadStoredState(): StoredAuthState {
  if (typeof window === "undefined") {
    return { user: null, pendingEmail: null };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load auth state:", e);
  }
  return { user: null, pendingEmail: null };
}

function saveState(state: StoredAuthState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save auth state:", e);
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const stored = loadStoredState();
    setUser(stored.user);
    setPendingEmail(stored.pendingEmail);
    setIsLoading(false);
    setIsHydrated(true);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      saveState({ user, pendingEmail });
    }
  }, [user, pendingEmail, isHydrated]);

  const signInWithEmail = useCallback((email: string) => {
    setPendingEmail(email);
  }, []);

  const completeSignIn = useCallback(() => {
    if (pendingEmail) {
      const newUser: User = {
        id: generateUserId(),
        email: pendingEmail,
      };
      setUser(newUser);
      setPendingEmail(null);
    }
  }, [pendingEmail]);

  const signOut = useCallback(() => {
    setUser(null);
    setPendingEmail(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    pendingEmail,
    signInWithEmail,
    completeSignIn,
    signOut,
    updateUser,
    getInitials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
