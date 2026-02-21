"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchOrCreateProfile } from "@/lib/queries/profiles";

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
  isProfileLoaded: boolean;
  pendingEmail: string | null;
};

type AuthContextType = AuthState & {
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  resendOtp: (email: string) => Promise<{ error: string | null }>;
  completeSignIn: () => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  getInitials: (nickname: string) => string;
  isProfileComplete: boolean;
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
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [supabase] = useState(() => createClient());

  const loadProfile = useCallback(
    async (userId: string, email: string) => {
      try {
        const profile = await fetchOrCreateProfile(supabase, userId, email);
        setUser({
          id: userId,
          email,
          nickname: profile.nickname ?? undefined,
        });
      } catch (err) {
        console.error(
          "Failed to load profile, falling back to basic user:",
          err,
        );
        setUser({ id: userId, email });
      } finally {
        setIsProfileLoaded(true);
      }
    },
    [supabase],
  );

  // Hydrate: check Supabase session first, then fall back to localStorage
  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        // Real Supabase session — fetch/create profile from DB
        await loadProfile(data.user.id, data.user.email!);
      } else {
        // Fall back to localStorage (supports simulate flow)
        const stored = loadStoredState();
        setUser(stored.user);
        setIsProfileLoaded(true);
      }

      const stored = loadStoredState();
      setPendingEmail(stored.pendingEmail);
      setIsLoading(false);
      setIsHydrated(true);
    }

    init();
  }, [supabase, loadProfile]);

  // Listen for Supabase auth state changes (e.g. returning from magic link)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email!);
        setPendingEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      saveState({ user, pendingEmail });
    }
  }, [user, pendingEmail, isHydrated]);

  const signInWithEmail = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      setPendingEmail(email);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }
      return { error: null };
    },
    [supabase],
  );

  const resendOtp = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }
      return { error: null };
    },
    [supabase],
  );

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

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPendingEmail(null);
    setIsProfileLoaded(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [supabase]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  const isProfileComplete = !!user?.nickname;

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isProfileLoaded,
    pendingEmail,
    signInWithEmail,
    resendOtp,
    completeSignIn,
    signOut,
    updateUser,
    getInitials,
    isProfileComplete,
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
