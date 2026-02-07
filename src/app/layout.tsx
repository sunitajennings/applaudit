import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Applaudit",
  description: "Predict the winners. Bring home the Oscar.",
};

import { GlobalNav } from "@/components/layout/GlobalNav";
import { NavCenterProvider } from "@/lib/store/nav-center";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <NavCenterProvider>
              <GlobalNav />
              <div className="max-w-4xl w-full mx-auto">
                {children}
              </div>
            </NavCenterProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
