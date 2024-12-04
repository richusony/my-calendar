import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Calender",
  description: "Created for scheduling tasks",
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
        <nav className="p-4">
          <h1 className="ml-4 mt-2 border-2 border-gray-400 w-fit p-2 font-semibold text-xl text-gray-600 rounded-md shadow-md">My Calendar</h1>
        </nav>
        {children}
        <footer className="p-5 text-center"><h3>Copyright© Richu Sony</h3></footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
