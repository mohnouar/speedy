"use client";

import { useEffect, useRef, useState } from "react";
import nipplejs, { JoystickManager, JoystickOutputData } from "nipplejs";
import getSocket from '@/lib/socket';

type DebugState = {
  [key: string]: any;
};

export default function SemiJoystick() {
  const socket = getSocket();
  const joystickRef = useRef<JoystickManager | null>(null);
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const [debug, setDebug] = useState<DebugState>({});
  const lastSentRef = useRef<number>(0);

  useEffect(() => {
    if (!zoneRef.current) return;

    const joystick = nipplejs.create({
      zone: zoneRef.current as HTMLElement,
      mode: "semi",
      catchDistance: 150,
      color: "white",
      size: 170,
    }) as JoystickManager;

    joystickRef.current = joystick;

    joystick
      .on("start", (_: any, data: JoystickOutputData) => updateDebug(data))
      .on("end", () => {
        updateDebug({});
        if (socket && socket.connected) {
          socket.emit("joystick", { stop: true });
        }
      })
      .on("move", (_: any, data: JoystickOutputData) => {
        updateDebug(data);
        sendJoystickDataToServer(data);
      })
      .on("pressure", (_: any, pressure: number) =>
        updateDebug({ pressure })
      );

    return () => {
      joystickRef.current?.destroy();
    };
  }, []);

  const updateDebug = (data: DebugState) => {
    setDebug((prev) => ({ ...prev, ...data }));
  };

  const sendJoystickDataToServer = (data: JoystickOutputData) => {
    if (!data.angle || data.angle.degree === undefined || !data.force) return;

    const now = Date.now();
    if (now - lastSentRef.current < 50) return;
    lastSentRef.current = now;

    const radian = (data.angle.degree * Math.PI) / 180;
    const payload = {
      sin: Math.sin(radian),
      cos: Math.cos(radian),
      force: data.force,
    };

    if (socket && socket.connected) {
      socket.emit("joystick", payload);
    }
  };

  return (
    <div className="">
      <div
        ref={zoneRef}
        className="relative w-50 h-52 rounded-2xl dark-gradient border border-[#1F232A] ring-1 ring-[#2A2E38]"
      ></div>
    </div>
  );
}
