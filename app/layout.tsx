import "./globals.css";
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worlds Apart",
  description: "A game of exploration and discovery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
    <body className={inter.className}>
    <div className="flex w-screen h-screen justify-start">{children}</div>
    <div style={{position: "absolute", bottom: "30px", left: "20px"}}>
        <img src="/img/yilt-logo.png" width={70}></img>
    </div>
    </body>
    </html>
  );
}
