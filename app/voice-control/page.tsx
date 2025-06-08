// app/page.tsx or src/app/page.tsx (Next.js App Router)
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Logo animation
    tl.from("#logo", { opacity: 0, scale: 0.5, duration: 0.8 });

    // Typing animation
    const text = "Welcome to Speedy – your smart delivery robot.";
    let currentText = "";

    for (let i = 0; i < text.length; i++) {
      tl.to({}, {
        duration: 0.05,
        onComplete: () => {
          currentText += text[i];
          if (textRef.current) textRef.current.textContent = currentText;
        },
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1C20] to-[#0D0E12] text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">Speedy</h1>
        <div className="flex gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/settings" className="hover:underline">Settings</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <Image
          id="logo"
          src="/logo.png"
          alt="Speedy Logo"
          width={100}
          height={100}
          className="mb-6"
        />

        <div
          ref={textRef}
          className="text-2xl sm:text-3xl font-semibold max-w-xl leading-snug min-h-[4rem]"
        ></div>

        <p className="mt-6 text-white/70 text-sm">
          Get started by configuring your robot’s connection settings.
        </p>

        <Link href="/settings">
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            Go to Settings
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-white/30 text-sm">
        &copy; {new Date().getFullYear()} Speedy Robot. Built by Mohamed.
      </footer>
    </main>
  );
}
