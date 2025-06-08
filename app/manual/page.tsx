"use client";

import { Button } from "@/components/ui/button";
import getSocket from "@/lib/socket";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

const SemiJoystick = dynamic(() => import('@/components/shared/Joystick'), {
  ssr: false,
});
const SpeedSlider = dynamic(() => import('@/components/shared/Slider'), {
  ssr: false,
});

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [status, setStatus] = useState('off');

  const handleMouseDown = () => {
    setStatus('on');
  };

  const handleMouseUp = () => {
    setStatus('off');
  };

   useEffect(() => {
    // الآن فقط يتم استدعاء getSocket() داخل المتصفح
    socketRef.current = getSocket();
  }, []);

  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joystick", { spinaround: status });
    }
  }, [status]);

  return (
    <main className="p-5 flex flex-col gap-5 max-w-7xl mx-auto">
      {/* بث الكاميرا */}
      <div className="flex justify-center">
        <Image
          src="/user-avatar.png"
          alt="Live Feed"
          className="rounded-2xl bg-cover max-sm:max-h-60"
          width={300}
          height={200}
        />
      </div>

      {/* عناصر التحكم */}
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:items-start">
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          <SemiJoystick />

          {/* العناصر الإضافية الخاصة بالهاتف */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-center gap-2">
              <Button 
                className="px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
              >
                Open Box
              </Button>
              <Button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
              >
                Spin Around
              </Button>
            </div>
            <div className="bg-[#2A2C30] text-white text-center py-2 rounded-lg shadow">
              Speed: <span className="font-bold">1.5 m/s</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <SpeedSlider />
        </div>
      </div>
    </main>
  );
}
