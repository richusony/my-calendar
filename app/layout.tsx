import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "My Calendar",
  description: "Created for scheduling tasks",
  icons: "https://t4.ftcdn.net/jpg/07/52/67/23/360_F_752672349_aJ2NUPiRqZJSWKYKEYsluWBBlOpo0tWX.jpg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className=''>
          <nav className="p-4 flex justify-between items-center">
            <Link href="/" className="ml-4 mt-2 border-2 border-gray-400 w-fit p-2 font-semibold text-xl text-gray-600 rounded-md shadow-md">My Calendar</Link>
            <SignedOut>
              <Link href="/signin" className="bg-gray-800 w-fit py-1 px-4 text-center text-gray-100 font-semibold text-xl rounded-md shadow-md">Login</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
          {children}
          <footer className="p-5 text-center"><h3>Copyright© Richu Sony</h3></footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
