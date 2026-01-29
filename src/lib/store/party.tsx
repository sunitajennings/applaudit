"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { User } from "./auth";

const STORAGE_KEY = "applaudit_party";

export type Party = {
  id: string;
  code: string; // 4-character join code
  hostId: string;
  members: User[];
};

type PartyContextType = {
  party: Party | null;
  createParty: (hostId: string) => Party;
  joinParty: (code: string) => boolean;
  leaveParty: () => void;
  addMember: (user: User) => void;
  generatePartyCode: () => string;
};

const PartyContext = createContext<PartyContextType | null>(null);

function loadStoredParty(): Party | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load party:", e);
  }
  return null;
}

function saveParty(party: Party | null): void {
  if (typeof window === "undefined") return;

  try {
    if (party) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(party));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to save party:", e);
  }
}

// Generate a random 4-character alphanumeric code
function generatePartyCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

interface PartyProviderProps {
  children: ReactNode;
}

export function PartyProvider({ children }: PartyProviderProps) {
  const [party, setParty] = useState<Party | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load party from localStorage on mount
  useEffect(() => {
    const stored = loadStoredParty();
    setParty(stored);
    setIsHydrated(true);
  }, []);

  // Save party to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      saveParty(party);
    }
  }, [party, isHydrated]);

  const createParty = useCallback((hostId: string): Party => {
    const code = generatePartyCode();
    const newParty: Party = {
      id: `party_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      code,
      hostId,
      members: [],
    };
    setParty(newParty);
    return newParty;
  }, []);

  const joinParty = useCallback((code: string): boolean => {
    // In a real app, this would validate the code with a backend
    // For now, we'll simulate by checking if a party exists with this code
    // In mock mode, we'll just create a party if one doesn't exist
    const stored = loadStoredParty();
    if (stored && stored.code === code.toUpperCase()) {
      setParty(stored);
      return true;
    }
    // For demo purposes, accept any 4-character code
    if (code.length === 4) {
      const newParty: Party = {
        id: `party_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        code: code.toUpperCase(),
        hostId: "", // Will be set when member joins
        members: [],
      };
      setParty(newParty);
      return true;
    }
    return false;
  }, []);

  const leaveParty = useCallback(() => {
    setParty(null);
  }, []);

  const addMember = useCallback((user: User) => {
    setParty((prev) => {
      if (!prev) return prev;
      // Check if user is already a member
      if (prev.members.some((m) => m.id === user.id)) {
        return prev;
      }
      return {
        ...prev,
        members: [...prev.members, user],
      };
    });
  }, []);

  const value: PartyContextType = {
    party,
    createParty,
    joinParty,
    leaveParty,
    addMember,
    generatePartyCode,
  };

  return <PartyContext.Provider value={value}>{children}</PartyContext.Provider>;
}

export function useParty() {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error("useParty must be used within a PartyProvider");
  }
  return context;
}
