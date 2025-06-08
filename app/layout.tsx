import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
  variable: "--mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SpeedyControl - Command Center for Your Delivery Robot",
  description: "SpeedyControl is a real-time control dashboard built with Next.js to manage and monitor your autonomous delivery robot, Speedy. Switch between manual and autonomous modes, track location, control navigation, and interact with live sensor data — all from one sleek web interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} antialiased pattern dark h-screen w-screen overflow-hidden font-mona-sans`}
      >
        <NavBar />
        {children}
        <Toaster position="top-right" />
      </body> 
    </html>
  );
}
