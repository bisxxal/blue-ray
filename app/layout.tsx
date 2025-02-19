import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import { Toaster } from "react-hot-toast";
import QuaryClient from "@/quary/QuaryClient";
import "react-datepicker/dist/react-datepicker.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blue Ray",
  description: "Generated by Blue Ray",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QuaryClient>
          <Toaster />
          <div className=" w-full min-h-screen flex "> 
            {children}
          </div>
        </QuaryClient>
      </body>
    </html>
  );
}
