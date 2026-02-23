"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type NavCenterContextType = {
  centerContent: ReactNode;
  setCenterContent: (content: ReactNode) => void;
};

const NavCenterContext = createContext<NavCenterContextType | null>(null);

export function NavCenterProvider({ children }: { children: ReactNode }) {
  const [centerContent, setCenterContent] = useState<ReactNode>(null);
  return (
    <NavCenterContext.Provider value={{ centerContent, setCenterContent }}>
      {children}
    </NavCenterContext.Provider>
  );
}

export function useNavCenter() {
  const ctx = useContext(NavCenterContext);
  if (!ctx) return { centerContent: null, setCenterContent: () => {} };
  return ctx;
}
