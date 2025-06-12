"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function AboutPage() {
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.6")
      .from(footerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.6");
  }, []);

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center text-center px-6 sm:px-12 bg-[#1A1C20] text-white">
      <Image
        ref={logoRef}
        src="/logo.png"
        alt="Speedy Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      <h1
        ref={titleRef}
        className="text-3xl sm:text-5xl font-bold mb-4"
      >
        About{" "}
        <span className="primary-gradient bg-clip-text text-transparent">
          Speedy
        </span>
      </h1>

      <p
        ref={textRef}
        className="text-base sm:text-lg max-w-2xl text-white/80 leading-relaxed"
      >
        Speedy is a smart delivery robot developed as a graduation project by{" "}
        <strong className="text-white">Nouar Mohamed</strong> and{" "}
        <strong className="text-white">Allawa Taha Walid</strong> at{" "}
        <strong className="text-white">
          Ziane Achour University – Djelfa
        </strong>
        .
        <br />
        It combines real-time manual control, voice interaction, and live video
        streaming to push forward the limits of autonomous robotics in economic
        startup initiatives.
      </p>

      <div
        ref={footerRef}
        className="mt-8 text-sm text-white/60"
      >
        &copy; {new Date().getFullYear()} Speedy Project — All rights reserved.
      </div>
    </section>
  );
}
