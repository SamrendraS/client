import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/navbar';
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

      <div className="flex-1 py-3 px-7">
        <Navbar />
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
