import { Fira_Sans } from "next/font/google";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Icons } from "./Icons";

const font = Fira_Sans({
  subsets: ["latin"],
  weight: "400",
});

export function AppSidebar() {
  return (
    <Sidebar
      className={cn(
        font.className,
        "mx-5 my-auto h-[calc(100vh-40px)] rounded-md rounded-r-sm border border-[#AACBC480]",
      )}
    >
      <SidebarHeader className="flex items-center justify-center bg-[#AACBC433] py-10">
        <Image src={"/logo.png"} alt="Endur" width={63} height={63} />
      </SidebarHeader>
      <SidebarContent className="bg-[#AACBC433] px-4 pt-5">
        <SidebarGroup className="cursor-pointer rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
          Dashboard
        </SidebarGroup>
        <SidebarGroup className="cursor-pointer rounded-md bg-[#17876D] text-xl font-semibold text-white transition-all">
          Staking
        </SidebarGroup>
        <SidebarGroup className="pointer-events-none flex cursor-pointer flex-row items-center justify-between gap-2 rounded-md transition-all hover:bg-[#17876D] hover:text-white">
          <p className="text-xl font-semibold text-[#03624C]">
            Defi <span className="text-sm font-thin">(coming soon)</span>
          </p>
          <ChevronDown className="size-4 text-[#03624C]" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#AACBC433] px-0">
        <div className="mb-5 flex items-center gap-4 px-4">
          <Icons.twitter className="cursor-pointer" />
          <Icons.discord className="cursor-pointer" />
          <Icons.telegram className="cursor-pointer" />
          <Icons.doc className="cursor-pointer" />
        </div>
        <button className="flex items-center gap-3 border-t border-[#075A5A1A] px-4 py-3 text-xl font-medium text-[#03624C]">
          <Icons.chat /> Support
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
