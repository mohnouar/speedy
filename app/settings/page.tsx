"use client";

import ControlForm from '@/components/shared/ControlForm'
import { Button } from '@/components/ui/button'
import getSocket from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { Socket } from "socket.io-client";

const Page = () => {
    const socketRef = useRef<Socket | null>(null);
    const router = useRouter();

    useEffect(() => {
        socketRef.current = getSocket();
    }, []);
    
    const handleControlMode = (mode: string, route: string) => {
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("mode", { mode: mode });
            router.push(`/${route}`)
        }
        router.push(`/${route}`)
    }
    
    return (
        <main className='flex-center flex-col gap-16 max-md:gap-8 mt-20 max-md:mt-13'>
            <ControlForm/>
            <div className='flex flex-wrap justify-center gap-5'>
                <Button onClick={() => handleControlMode("AUTO", "auto")}>Auto Control</Button>
                <Button onClick={() => handleControlMode("MANUAL", "manual")}>Manual Control</Button>
                <Button onClick={() => handleControlMode("VOICE", "voice")}>Voice Control</Button>
            </div>
        </main>
    )
}

export default Page