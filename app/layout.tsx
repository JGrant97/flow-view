'use server'
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/components/styledComponentsRegistry";
import TopNavBar from "@/components/nav/topNavBar";
import { verifySession } from "@/components/session";
import UserContextProvider from "@/components/userContextProvider";
import Utility from "@/lib/utility";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  var user = session ? Utility.decryptJWT(session.token) : undefined;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserContextProvider defaultUser={user}>
          <StyledComponentsRegistry>
            <TopNavBar defaultUser={user}/>
            {children}
          </StyledComponentsRegistry>
        </UserContextProvider>
      </body>
    </html>
  );
}
