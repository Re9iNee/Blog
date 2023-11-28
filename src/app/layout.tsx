import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mora Blog",
  description: "Mora Blog - Homepage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='system'
          disableTransitionOnChange
        >
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
