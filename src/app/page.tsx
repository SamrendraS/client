import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <SidebarProvider className="w-fit">
        <div className="flex">
          <AppSidebar />
          {/* <SidebarTrigger /> */}
        </div>
      </SidebarProvider>

      <div className="flex flex-1 flex-col items-center overflow-hidden px-7 py-3">
        <Navbar />

        <Tabs />
      </div>
    </div>
  );
}
