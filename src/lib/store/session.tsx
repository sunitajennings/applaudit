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

const STORAGE_KEY = "applaudit_session";

export type User = {
  id: string;
  email: string;
};

export type UserProfile = {
  nickname: string;
  avatarId: string;
  groupId: string | null;
};

type StoredState = {
  user: User | null;
  pendingEmail: string | null;
  nickname: string;
  avatarId: string;
  groupId: string | null;
};

type SessionContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileLoaded: boolean;
  pendingEmail: string | null;
  profile: UserProfile | null;
  isProfileComplete: boolean;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  resendOtp: (email: string) => Promise<{ error: string | null }>;
  completeSignIn: () => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  getInitials: (nickname: string) => string;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function getInitials(nickname: string): string {
  return nickname.slice(0, 2).toUpperCase();
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

const defaultStoredState: StoredState = {
  user: null,
  pendingEmail: null,
  nickname: "",
  avatarId: "",
  groupId: null,
};

function loadStoredState(): StoredState {
  if (typeof window === "undefined") return defaultStoredState;

  try {
    // Try new unified key first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    // Migrate from old separate keys
    const oldAuth = localStorage.getItem("applaudit_auth");
    const oldUser = localStorage.getItem("applaudit_user");
    if (oldAuth || oldUser) {
      const auth = oldAuth ? JSON.parse(oldAuth) : {};
      const user = oldUser ? JSON.parse(oldUser) : {};
      return {
        user: auth.user ? { id: auth.user.id, email: auth.user.email } : null,
        pendingEmail: auth.pendingEmail ?? null,
        nickname: user.nickname ?? auth.user?.nickname ?? "",
        avatarId: user.avatarId ?? "",
        groupId: user.groupId ?? null,
      };
    }
  } catch (e) {
    console.error("Failed to load session:", e);
  }

  return defaultStoredState;
}

function saveState(state: StoredState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save session:", e);
  }
}

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [supabase] = useState(() => createClient());

  const loadProfile = useCallback(
    async (
      userId: string,
      email: string,
      storedAvatarId: string,
      storedGroupId: string | null,
    ) => {
      console.log("[session] loadProfile called for", userId);
      try {
        const dbProfile = await fetchOrCreateProfile(supabase, userId, email);
        setUser({ id: userId, email });
        setProfile({
          nickname: dbProfile.nickname ?? "",
          avatarId: storedAvatarId,
          groupId: storedGroupId,
        });
      } catch (err) {
        console.error(
          "Failed to load profile, falling back to basic user:",
          err,
        );
        setUser({ id: userId, email });
        setProfile({
          nickname: "",
          avatarId: storedAvatarId,
          groupId: storedGroupId,
        });
      } finally {
        setIsProfileLoaded(true);
      }
    },
    [supabase],
  );

  // Hydrate: check Supabase session first, then fall back to localStorage
  useEffect(() => {
    async function init() {
      const stored = loadStoredState();
      setPendingEmail(stored.pendingEmail);

      const { data } = await supabase.auth.getUser();
      console.log("[session] init: supabase user =", data.user);

      if (data.user) {
        await loadProfile(
          data.user.id,
          data.user.email!,
          stored.avatarId,
          stored.groupId,
        );
      } else {
        setUser(stored.user);
        setProfile(
          stored.user
            ? {
                nickname: stored.nickname,
                avatarId: stored.avatarId,
                groupId: stored.groupId,
              }
            : null,
        );
        setIsProfileLoaded(true);
      }

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
      console.log("[session] state change:", _event, session?.user?.id);
      if (session?.user) {
        const stored = loadStoredState();
        loadProfile(
          session.user.id,
          session.user.email!,
          stored.avatarId,
          stored.groupId,
        );
        setPendingEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      console.log(
        "[session] saving state, user =",
        user?.id,
        "hydrated =",
        isHydrated,
      );
      saveState({
        user,
        pendingEmail,
        nickname: profile?.nickname ?? "",
        avatarId: profile?.avatarId ?? "",
        groupId: profile?.groupId ?? null,
      });
    }
  }, [user, profile, pendingEmail, isHydrated]);

  const signInWithEmail = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      setPendingEmail(email);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/callback` },
      });
      return { error: error?.message ?? null };
    },
    [supabase],
  );

  const resendOtp = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/callback` },
      });
      return { error: error?.message ?? null };
    },
    [supabase],
  );

  const completeSignIn = useCallback(() => {
    if (pendingEmail) {
      const newUser: User = { id: generateUserId(), email: pendingEmail };
      setUser(newUser);
      setProfile({ nickname: "", avatarId: "", groupId: null });
      setPendingEmail(null);
    }
  }, [pendingEmail]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setPendingEmail(null);
    setIsProfileLoaded(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [supabase]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev) {
        return {
          nickname: updates.nickname ?? "",
          avatarId: updates.avatarId ?? "",
          groupId: updates.groupId ?? null,
        };
      }
      return { ...prev, ...updates };
    });
  }, []);

  const isProfileComplete = !!(
    profile?.nickname && profile.nickname.trim().length > 0
  );

  const value: SessionContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isProfileLoaded,
    pendingEmail,
    profile,
    isProfileComplete,
    signInWithEmail,
    resendOtp,
    completeSignIn,
    signOut,
    updateUser,
    updateProfile,
    getInitials,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
