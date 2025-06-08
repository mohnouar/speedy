"use client";

import ControlForm from '@/components/shared/ControlForm'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    return (
        <main className='flex-center flex-col gap-16 mt-20'>
            <ControlForm/>
            <div className='flex gap-5'>
                <Button>Auto Control</Button>
                <Button onClick={() => router.push("/manual")}>Manual Control</Button>
                <Button>Voice Control</Button>
            </div>
        </main>
    )
}

export default Page