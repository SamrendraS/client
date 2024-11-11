import { AppSidebar } from '@/components/app-sidebar';
import { Icons } from '@/components/Icons';
import Navbar from '@/components/navbar';
import Stake from '@/components/stake';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Unstake from '@/components/unstake';
import Withdraw from '@/components/withdraw';
import { Heart, HeartOffIcon } from 'lucide-react';

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

        <div className="h-[37rem] -ml-40 mt-12 w-full max-w-xl bg-white shadow-xl rounded-xl">
          <Tabs
            defaultValue="stake"
            className="col-span-2 mt-4 h-full w-full lg:mt-0"
          >
            <TabsList className="w-full px-3 flex items-center justify-start bg-transparent pt-8 pb-5 border-b rounded-none">
              <TabsTrigger
                value="stake"
                className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                Stake
                <div className="absolute -bottom-[5.5px] left-3 rounded-full bg-black w-10 h-[2px] hidden group-data-[state=active]:flex" />
              </TabsTrigger>
              <TabsTrigger
                value="unstake"
                className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                Unstake
                <div className="absolute -bottom-[5.5px] left-3.5 rounded-full bg-black w-[3.3rem] h-[2px] hidden group-data-[state=active]:flex" />
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                Withdraw
                <div className="absolute -bottom-[5.5px] left-[16px] rounded-full bg-black w-[3.8rem] h-[2px] hidden group-data-[state=active]:flex" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stake" className="h-[20%]">
              <Stake />
            </TabsContent>

            <TabsContent value="unstake" className="">
              <Unstake />
            </TabsContent>

            <TabsContent value="withdraw" className="">
              <Withdraw />
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-[#707D7D] mt-8 -ml-40 flex items-center text-sm">
          Crafted with <Icons.heart className="mx-1" /> by{' '}
          <span className="font-semibold hover:underline cursor-pointer mx-1">
            Karnot
          </span>{' '}
          and{' '}
          <span className="font-semibold hover:underline cursor-pointer mx-1">
            STRKFarm
          </span>
        </p>
      </div>

      {/* <div>
          <main>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                verticalAlign: 'middle',
                gap: '10px',
              }}
            >
              <Image src={'/logo.png'} alt="Endur" width={63} height={63} />
              <p style={{ opacity: 0.7, fontSize: '22px', fontWeight: '600' }}>
                Coming soon
              </p>
            </div>
          </main>
        </div> */}
    </div>
  );
}
