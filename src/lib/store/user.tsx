"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./auth";

const STORAGE_KEY = "applaudit_user";

export type UserProfile = {
  nickname: string;
  avatarId: string; // ID of selected avatar (1-8) or empty for initials-based
  groupId: string | null; // group/party the user has joined
};

type UserContextType = {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

function loadStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<UserProfile> & {
        nickname?: string;
      };
      return {
        nickname: parsed.nickname ?? "",
        groupId: parsed.groupId ?? null,
      };
    }
  } catch (e) {
    console.error("Failed to load user profile:", e);
  }
  return null;
}

function saveProfile(profile: UserProfile | null): void {
  if (typeof window === "undefined") return;

  try {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to save user profile:", e);
  }
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load profile: prefer DB-sourced data from auth context, fall back to localStorage
  useEffect(() => {
    if (user?.nickname) {
      // DB-sourced profile via auth context takes priority
      setProfile({
        nickname: user.nickname,
      });
    } else {
      const stored = loadStoredProfile();
      setProfile(stored);
    }
    setIsHydrated(true);
  }, [user?.nickname]);

  // Save profile to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      saveProfile(profile);
    }
  }, [profile, isHydrated]);

  // Update auth user when profile changes
  useEffect(() => {
    if (user && profile) {
      // Update auth user with profile data
      // This will be handled by the auth store's updateUser method
    }
  }, [user, profile]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev) {
        // Initialize profile if it doesn't exist
        return {
          nickname: updates.nickname || "",
          groupId: updates.groupId ?? null,
        };
      }
      return { ...prev, ...updates };
    });
  }, []);

  const isProfileComplete = !!(
    profile?.nickname && profile.nickname.trim().length > 0
  );

  const value: UserContextType = {
    profile,
    updateProfile,
    isProfileComplete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
