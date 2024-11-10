import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  return (
    <Sidebar className="h-[calc(100vh-40px)] my-auto mx-5 border border-[#AACBC480] rounded-md">
      <SidebarHeader className="bg-[#AACBC433]">logo</SidebarHeader>
      <SidebarContent className="bg-[#AACBC433]">
        <SidebarGroup>Dashboard</SidebarGroup>
        <SidebarGroup>Staking</SidebarGroup>
        <SidebarGroup>Defi</SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#AACBC433]" />
    </Sidebar>
  );
}
