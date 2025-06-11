"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Router, Save, Video } from 'lucide-react';
import { useEffect, useState } from "react"
import getSocket, { resetSocket } from "@/lib/socket"
import { toast } from "sonner"
 
const formSchema = z.object({
  flask: z.string(),
  camera: z.string()
})

const ControlForm = () => {
    const [flaskServer, setFlaskServer] = useState("");
    const [cameraStream, setCameraStream] = useState("");

    useEffect(() => {
        const savedFlask = localStorage.getItem("flaskServer");
        const savedCamera = localStorage.getItem("cameraStream");
        if (savedFlask) setFlaskServer(savedFlask);
        if (savedCamera) setCameraStream(savedCamera);
    }, []);


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        flask: "",
        camera: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit() {
        localStorage.setItem("flaskServer", flaskServer);
        localStorage.setItem("cameraStream", cameraStream);

        // إعادة تهيئة الاتصال
        resetSocket();
        getSocket();
        toast("Settings Saved Successfully", {
          description: "Flask & camera URLs saved. Please refresh the page.",
          action: {
            label: "Refresh",
            onClick: () => window.location.reload(),
          },
        })
    }
    return (
        <div className="flex-center max-w-sm sm:w-md primary-gradient p-[1px] rounded-2xl mx-5">
            <div className="dark-gradient bg-[#1A1C20] p-6 rounded-2xl card-border w-full py-10 px-10">
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex-center gap-2">
                        <Image 
                            src={"/logo.png"}
                            alt="Speedy Logo"
                            width={90}
                            height={90}
                            className="size-10 sm:size-12"
                        />
                        <h1 className="hadear text-2xl sm:text-3xl">Speedy</h1>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-center ">Robot control settings</h2>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 flex-center flex-col form">
                    <FormField
                        control={form.control}
                        name="flask"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel className="label"><div className="flex gap-1 items-center"><Router /><p>Flask Server URL</p></div></FormLabel>
                            <FormControl className="w-full">
                                <Input placeholder="Example: http://192.168.1.100:5000" {...field} className="input" value={flaskServer} onChange={(e) => setFlaskServer(e.target.value)}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="camera"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel className="label"><div className="flex gap-1 items-center"><Video/> <p>Camera Stream URL</p></div></FormLabel>
                            <FormControl>
                                <Input placeholder="Example: http://192.168.1.101:8080/video" {...field} className="input" value={cameraStream} onChange={(e) => setCameraStream(e.target.value)}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="btn !w-full !p-0">
                        <div className="flex gap-1 items-center">
                            <Save />
                            <p className="text-dark-100">Save Settings</p>
                        </div>
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    )
};

export default ControlForm;
