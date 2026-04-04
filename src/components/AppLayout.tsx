import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Scratchpad } from "@/components/Scratchpad";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="ml-3" />
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      <Scratchpad />
    </SidebarProvider>
  );
}
