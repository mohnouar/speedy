"use client";
import { useRef, useState } from "react";
import getSocket from '@/lib/socket';


export default function SpeedSlider() {
  const socket = getSocket();
  const [speed, setSpeed] = useState<number>(100);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);

    if (!throttleTimeoutRef.current) {
      socket.emit("joystick", { speed: newSpeed });

      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-3 rounded-2xl shadow-xl text-white dark-gradient border border-[#1F232A] ring-1 ring-[#2A2E38]">
      <h2 className="text-xl font-semibold mb-2 text-center">Robot Max Speed</h2>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">10</span>
        <span className="text-sm text-gray-400">255</span>
      </div>

      <input
        type="range"
        min="10"
        max="255"
        value={speed}
        onChange={handleSpeedChange}
        className="w-full appearance-none h-2 bg-gradient-to-r from-[#1F232A] to-[#2C3038] rounded-full outline-none transition-all duration-300
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-blue-500
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-moz-range-thumb]:appearance-none
                   [&::-moz-range-thumb]:h-4
                   [&::-moz-range-thumb]:w-4
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:bg-blue-500"
      />

      <p className="mt-4 text-center text-sm text-primary-100">
        Current Speed: <span className="font-bold text-[#FFC19E]">{speed}</span>
      </p>
    </div>
  );
}
