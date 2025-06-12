"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const goRef = useRef<HTMLDivElement>(null);

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
        tl.from(goRef.current, { opacity: 0, y: 50, duration: 1.5, delay:0.3, ease: "power2.out" });
    }, []);

    return (
        <section className="flex flex-col mt-20 gap-20 px-6 sm:px-10 md:px-20 lg:px-32">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-20 text-center sm:text-left">
                <Image
                id="logo"
                src="/logo.png"
                alt="Speedy Logo"
                width={200}
                height={200}
                className="mb-6 w-40 h-40 sm:w-[300px] sm:h-[300px]"
                />

                <div
                ref={textRef}
                className="text-2xl sm:text-4xl lg:text-6xl primary-gradient bg-clip-text text-transparent font-bold max-w-full sm:max-w-2xl leading-snug min-h-[4rem] h-20 sm:h-64"
                ></div>
            </div>

            <div ref={goRef} className="flex flex-col items-center text-center px-4 sm:px-0">
                <p className="mt-6 text-white/70 text-xs sm:text-base">
                Get started by configuring your robot’s connection settings.
                </p>

                <Link href="/settings">
                <Button className="mt-6 px-6 py-4 sm:py-5 bg-white text-black rounded-lg hover:bg-gray-200 transition cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                    Go to Settings <ArrowRight className="w-4 h-4" />
                </Button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;
