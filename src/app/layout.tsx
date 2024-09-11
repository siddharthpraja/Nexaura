import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import NextAuthSessionProvider from "./provider/sessionProvider";
import Navbar from '../components/Navbar'


const inter = Noto_Sans({ weight: ["400", "300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexAura",
  description: "Blogging is the art of self-expression",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Navbar/> {children}
          </NextAuthSessionProvider>
      </body>
    </html>
  );
}
