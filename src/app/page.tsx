import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/navbar';
import Tabs from '@/components/Tabs';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="flex">
      <SidebarProvider className="w-fit">
        <div className="flex">
          <AppSidebar />
          {/* <SidebarTrigger /> */}
        </div>
      </SidebarProvider>

      <div className="flex-1 py-3 px-7 overflow-hidden flex flex-col items-center">
        <Navbar />

        <Tabs />
      </div>
    </div>
  );
}
