import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Check, LogOut, Trash2, ShieldAlert } from "lucide-react";
import { clearLocalProgress, PROGRESS_KEYS } from "@/lib/progressSync";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type SaveState = "idle" | "saving" | "saved";

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "settings" ? "settings" : "profile";

  const [displayName, setDisplayName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [originalAvatar, setOriginalAvatar] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [pw, setPw] = useState("");
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => {
        const dn = data?.display_name ?? "";
        const av = data?.avatar_url ?? "";
        setDisplayName(dn); setOriginalName(dn);
        setAvatarUrl(av); setOriginalAvatar(av);
      });
  }, [user]);

  if (authLoading || !user) {
    return <div className="p-6 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  const dirty = displayName !== originalName || avatarUrl !== originalAvatar;

  const save = async () => {
    setSaveState("saving");
    const { error } = await supabase.from("profiles")
      .update({ display_name: displayName, avatar_url: avatarUrl || null })
      .eq("id", user.id);
    if (error) { setSaveState("idle"); return toast.error(error.message); }
    setOriginalName(displayName); setOriginalAvatar(avatarUrl);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 1500);
    toast.success("Profile saved");
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) return toast.error("Password must be at least 8 characters");
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setPwBusy(false);
    if (error) return toast.error(error.message);
    setPw("");
    toast.success("Password updated");
  };

  const initials = (displayName || user.email || "??").slice(0, 2).toUpperCase();

  const resetProgress = async () => {
    clearLocalProgress();
    if (user) {
      await supabase.from("user_progress").delete().eq("user_id", user.id);
    }
    toast.success("Progress reset");
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg ring-1 ring-border">
          {avatarUrl ? <img src={avatarUrl} alt="" className="h-14 w-14 rounded-full object-cover" /> : initials}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight">{displayName || "Your account"}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setParams({ tab: v })}>
        <TabsList className="grid grid-cols-2 w-full max-w-sm mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Account settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-4 bg-card border border-border rounded-lg p-5">
            <div>
              <Label htmlFor="dn">Display name</Label>
              <Input id="dn" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="av">Avatar URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input id="av" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button onClick={save} disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {saveState === "saved" && <Check className="h-4 w-4 mr-2" />}
                {saveState === "saved" ? "Saved" : "Save changes"}
              </Button>
              {dirty && saveState === "idle" && (
                <Button variant="ghost" onClick={() => { setDisplayName(originalName); setAvatarUrl(originalAvatar); }}>
                  Discard
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-semibold mb-1">Email</h2>
              <p className="text-sm text-muted-foreground mb-2">Used for sign-in. Contact support to change.</p>
              <Input value={user.email ?? ""} disabled />
            </div>

            <form onSubmit={changePassword} className="bg-card border border-border rounded-lg p-5 space-y-3">
              <h2 className="font-semibold">Change password</h2>
              <p className="text-sm text-muted-foreground">Minimum 8 characters.</p>
              <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" minLength={8} />
              <Button type="submit" disabled={pwBusy || pw.length < 8}>
                {pwBusy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Update password
              </Button>
            </form>

            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-semibold mb-1">Progress sync</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Your study progress is synced to the cloud whenever you're signed in.
                Tracking covers theory scores, chapter progress, flashcards, classify game,
                practice tracker, learn lessons, streaks and topic preferences.
              </p>
              <p className="text-xs text-muted-foreground/80">{PROGRESS_KEYS.length} progress streams syncing</p>
            </div>

            <div className="bg-card border border-destructive/30 rounded-lg p-5">
              <h2 className="font-semibold text-destructive flex items-center gap-2 mb-1">
                <ShieldAlert className="h-4 w-4" /> Danger zone
              </h2>
              <p className="text-sm text-muted-foreground mb-3">Permanently wipe your study progress on this device and in the cloud.</p>
              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-2" />Reset progress
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This deletes your scores, streaks, flashcard status and topic preferences.
                        This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetProgress}>Yes, reset everything</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="ghost" onClick={async () => { await signOut(); navigate("/"); }}>
                  <LogOut className="h-4 w-4 mr-2" />Sign out
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
