import Image from 'next/image';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <div>
          <SidebarTrigger />
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
        </div>
      </SidebarProvider>
    </div>
  );
}
