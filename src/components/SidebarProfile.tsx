import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, User as UserIcon, SlidersHorizontal, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function SidebarProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null } | null>(null);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  if (!user) {
    return (
      <button
        onClick={() => navigate("/auth")}
        className="h-9 w-9 rounded-full mx-auto flex items-center justify-center bg-muted hover:bg-sidebar-accent transition-colors ring-1 ring-border"
        aria-label="Sign in"
        title="Sign in"
      >
        <LogIn className="h-4 w-4 text-muted-foreground" />
      </button>
    );
  }

  const name = profile?.display_name || user.email?.split("@")[0] || "Account";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-9 w-9 rounded-full mx-auto flex items-center justify-center hover:bg-sidebar-accent/50 transition-colors"
          aria-label={`Account: ${name}`}
          title={name}
        >
          <Avatar className="h-9 w-9 shrink-0 ring-1 ring-border">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={name} />}
            <AvatarFallback className="text-[11px] font-semibold bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="text-xs">
          <div className="font-semibold">{name}</div>
          <div className="text-[10px] text-muted-foreground font-normal">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <UserIcon className="h-4 w-4 mr-2" />Profile & Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/preferences")}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />Topic preferences
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile?tab=settings")}>
          <Settings className="h-4 w-4 mr-2" />Account settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => { await signOut(); toast.success("Signed out"); }}>
          <LogOut className="h-4 w-4 mr-2" />Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}