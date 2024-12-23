"use client";

import confetti from "canvas-confetti";
import { useAtomValue } from "jotai";
import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Merry from "@/components/merry";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";
import { isMerryChristmasAtom, tabsAtom } from "@/store/merry.store";

export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);

  const activeTab = useAtomValue(tabsAtom);
  const isMerry = useAtomValue(isMerryChristmasAtom);

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  React.useEffect(() => {
    const duration = 7000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0 && isMerry) {
        requestAnimationFrame(frame);
      }
    }
    if (isMerry) {
      requestAnimationFrame(frame);
    }
  }, [isMerry]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative flex h-full min-h-screen w-full overflow-x-hidden">
      {activeTab !== "withdraw" && isMerry && <Merry />}

      <AppSidebar />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex h-full w-full flex-col items-center overflow-hidden px-7 py-3 lg:py-0">
          <Navbar />
          <Tabs avgWaitTime={""} />
        </div>

        <div className="lg:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
