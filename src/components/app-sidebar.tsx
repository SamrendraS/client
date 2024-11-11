import { Fira_Sans } from 'next/font/google';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Icons } from './Icons';

const font = Fira_Sans({
  subsets: ['latin'],
  weight: '400',
});

export function AppSidebar() {
  return (
    <Sidebar
      className={cn(
        font.className,
        'h-[calc(100vh-40px)] my-auto mx-5 border border-[#AACBC480] rounded-md rounded-r-sm',
      )}
    >
      <SidebarHeader className="bg-[#AACBC433] flex items-center justify-center py-10">
        <Image src={'/logo.png'} alt="Endur" width={63} height={63} />
      </SidebarHeader>
      <SidebarContent className="bg-[#AACBC433] px-4 pt-5">
        <SidebarGroup className="text-[#03624C] text-xl cursor-pointer font-semibold transition-all hover:bg-[#17876D] hover:text-white rounded-md">
          Dashboard
        </SidebarGroup>
        <SidebarGroup className="text-xl cursor-pointer font-semibold transition-all bg-[#17876D] text-white rounded-md">
          Staking
        </SidebarGroup>
        <SidebarGroup className="cursor-pointer transition-all hover:bg-[#17876D] hover:text-white rounded-md pointer-events-none flex justify-between flex-row items-center gap-2">
          <p className="text-[#03624C] text-xl font-semibold">
            Defi <span className="text-sm font-thin">(coming soon)</span>
          </p>
          <ChevronDown className="size-4 text-[#03624C]" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#AACBC433] px-0">
        <div className="flex items-center gap-4 px-4 mb-5">
          <Icons.twitter className="cursor-pointer" />
          <Icons.discord className="cursor-pointer" />
          <Icons.telegram className="cursor-pointer" />
          <Icons.doc className="cursor-pointer" />
        </div>
        <button className="py-3 px-4 border-t border-[#075A5A1A] flex items-center gap-3 text-[#03624C] text-xl font-medium">
          <Icons.chat /> Support
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
