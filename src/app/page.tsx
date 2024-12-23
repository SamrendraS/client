"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";
import { Suspense } from "react";

const NavigationWrapper = () => {
  return (
    <>
      <Navbar />
      <Tabs avgWaitTime={""} />
    </>
  );
};

export default function Home() {
  return (
    <div className="flex w-full overflow-x-hidden">
      <AppSidebar />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex h-full w-full flex-col items-center overflow-hidden px-7 py-3 lg:py-0">
          <Suspense fallback={<div>Loading...</div>}>
            <NavigationWrapper />
          </Suspense>
        </div>

        <div className="lg:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
