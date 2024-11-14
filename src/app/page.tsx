import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <div className="flex w-full">
      <AppSidebar />

      <div className="flex flex-1 flex-col items-center overflow-hidden px-7 py-3">
        <Navbar />

        <Tabs />
      </div>
    </div>
  );
}
