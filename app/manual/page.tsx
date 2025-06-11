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
  const [boxOpened, setBoxOpened] = useState(false);
  const [savedIP, setSavedIP] = useState("http://192.168.41.26:8080/video");
  const [streamError, setStreamError] = useState(false);
  const [speed, setSpeed] = useState('');

  socketRef.on('speed_update', (data: string) => {
    console.log('Speed update received:', data);
    setSpeed(data)
  });

  const handleMouseDown = () => {
    setStatus('on');
  };

  const handleMouseUp = () => {
    setStatus('off');
  };

  useEffect(() => {
    socketRef.current = getSocket();
    if (socketRef.current && socketRef.current.connected) {
      setSavedIP(localStorage.getItem("cameraStream") || "http://192.168.41.26:8080/video");
    }
  }, []);

  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joystick", { spinaround: status });
    }
  }, [status]);

  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      if (boxOpened) {
        socketRef.current.emit("open_box", { open_box: "open" });
      } else {
        socketRef.current.emit("open_box", { open_box: "close" });
      }
    }
  }, [boxOpened]);

  const handleBoxOpen = () => {
    setBoxOpened(!boxOpened);
  }

  return (
    <main className="p-5 flex flex-col gap-5 max-w-7xl mx-auto">
      <div className="flex justify-center md:justify-start">
        {!streamError ? (
          <img
            src={savedIP}
            alt="Live Feed"
            className="rounded-2xl w-fit md:w-2/3"
            onError={() => setStreamError(true)}
          />
        ) : (
          <Image
            src="/fallback.png" // اجعل هذا هو اسم الصورة التي تولدها لاحقًا
            alt="Stream Not Available"
            width={800}
            height={400}
            className="rounded-2xl w-fit md:w-2/3 object-contain"
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:items-start">
        <div className="w-full md:w-1/2 flex items-center gap-4">
          <SemiJoystick />

          <div className="flex flex-col gap-3 w-full">
            <div className="flex max-md:flex-col justify-center gap-2">
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
              <Button 
                className="px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
                onClick={handleBoxOpen}
              >
                Open Box
              </Button>
            </div>
            <div className="bg-[#2A2C30] text-white text-center py-2 rounded-lg shadow">
              Speed: <span className="font-bold">{speed} m/s</span>
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
