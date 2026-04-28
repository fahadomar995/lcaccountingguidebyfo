import { useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/hooks/useTheme";
import { NAV_SECTIONS } from "@/data/navigation";
import { requestExamNavigation } from "@/lib/examGuard";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  // Intercept clicks while an exam is active — open the abandon dialog
  // (handled by SimulatorPage) instead of silently navigating away.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (location.pathname === "/simulator" && url !== "/simulator") {
      if (requestExamNavigation(url)) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent className="pt-2">
          {/* Brand */}
          {!collapsed && (
            <div className="px-4 py-3 mb-1">
              <h1 className="font-display text-base font-bold text-foreground leading-tight">
                LC Accounting <em className="text-primary not-italic">2026</em>
              </h1>
              <p className="text-[10px] font-body uppercase tracking-widest text-muted-foreground mt-0.5">
                Higher Level Study Guide
              </p>
            </div>
          )}

          {NAV_SECTIONS.map((section) => (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/"}
                          className="hover:bg-sidebar-accent/50"
                          activeClassName="bg-sidebar-accent text-primary font-semibold"
                          onClick={(e) => handleNavClick(e, item.url)}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

        </SidebarContent>

        <SidebarFooter className="p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span className="text-xs font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
