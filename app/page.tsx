import ControlForm from "@/components/shared/ControlForm";
import Hero from "@/components/shared/Hero";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="mt-10">
      <Hero />
      {/* <ControlForm/> */}
      {/* <div className="flex gap-5">
        <Button className="btn">Manual Control</Button>
        <Button className="btn">Voice Control</Button>
        <Button className="btn">Auto Control</Button>
      </div> */}
    </main>
  );
}
