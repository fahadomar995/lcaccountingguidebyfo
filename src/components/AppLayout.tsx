import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Scratchpad } from "@/components/Scratchpad";
import { AITutorBubble } from "@/components/AITutorBubble";
import { useLocation } from "react-router-dom";
import { requestExamNavigation, SIDEBAR_TOGGLE_SENTINEL } from "@/lib/examGuard";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const hideBubble = location.pathname === "/auth" || location.pathname === "/tutor";

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (location.pathname === "/simulator" && requestExamNavigation(SIDEBAR_TOGGLE_SENTINEL)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="ml-3" onClick={handleTriggerClick} />
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      <Scratchpad />
      {!hideBubble && <AITutorBubble />}
    </SidebarProvider>
  );
}
