// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let lastUsedIP = "";

export function resetSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    lastUsedIP = "";
  }
}

export default function getSocket(): Socket {
  const savedIP = localStorage.getItem("flaskServer") || "http://localhost:5000";

  if (!socket || savedIP !== lastUsedIP) {
    if (socket) {
      socket.disconnect();
    }

    console.log("Connecting to:", savedIP);
    socket = io(savedIP, {
      transports: ["websocket"],
    });

    lastUsedIP = savedIP;

    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection failed:", err.message);
    });

    socket.on("disconnect", () => {
      console.warn("🔌 Disconnected from server");
    });
  }

  return socket;
}
