/**
 * Tiny global pub/sub used to warn the user before navigating
 * away from an in-progress exam in the Simulator.
 *
 * SimulatorPage registers a confirm handler when a session is active
 * (returns the URL to navigate to once the user confirms abandon).
 * AppSidebar (and any other nav source) calls `requestExamNavigation(url)`
 * before performing its NavLink click; if no handler is registered the
 * navigation proceeds normally.
 */

type ConfirmHandler = (targetUrl: string) => void;

let handler: ConfirmHandler | null = null;

export function setExamGuard(h: ConfirmHandler | null) {
  handler = h;
}

export function isExamActive() {
  return handler !== null;
}

/**
 * Returns true if navigation should be intercepted (caller should NOT
 * proceed with its own navigation). Returns false when no exam is active.
 */
export function requestExamNavigation(targetUrl: string): boolean {
  if (!handler) return false;
  handler(targetUrl);
  return true;
}