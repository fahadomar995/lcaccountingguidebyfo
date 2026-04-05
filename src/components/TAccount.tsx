import { useMemo } from "react";

export interface TEntry {
  side: 'dr' | 'cr';
  label: string;
  amount: string;
  step: number;
  order: number;
  cls?: 'total' | 'loss' | 'profit' | 'balance';
}

export interface TAccountDef {
  title: string;
  entries: TEntry[];
}

interface TAccountPanelProps {
  accounts: TAccountDef[];
  currentStep: number;
  revealedInStep: number;
}

export function TAccountPanel({ accounts, currentStep, revealedInStep }: TAccountPanelProps) {
  const visibleAccounts = useMemo(() => {
    return accounts
      .map(acct => {
        const visible = acct.entries.filter(e => {
          if (e.step < currentStep) return true;
          if (e.step === currentStep && e.order < revealedInStep) return true;
          return false;
        });
        const newEntries = acct.entries.filter(
          e => e.step === currentStep && e.order === revealedInStep - 1
        );
        return { ...acct, visible, newEntries };
      })
      .filter(a => a.visible.length > 0);
  }, [accounts, currentStep, revealedInStep]);

  if (visibleAccounts.length === 0) return null;

  return (
    <div className="space-y-3">
      {visibleAccounts.map((acct, i) => {
        const dr = acct.visible.filter(e => e.side === 'dr');
        const cr = acct.visible.filter(e => e.side === 'cr');
        const maxRows = Math.max(dr.length, cr.length, 1);

        return (
          <div key={i} className="tacct">
            <div className="tacct-title">{acct.title}</div>
            <div className="tacct-body">
              <div className="tacct-side">
                <div className="tacct-hdr">Dr</div>
                {dr.map((e, j) => {
                  const isNew = acct.newEntries.includes(e);
                  return (
                    <div
                      key={j}
                      className={`tacct-row ${isNew ? 'tacct-new' : ''} ${e.cls ? `tacct-${e.cls}` : ''}`}
                    >
                      <span className="tacct-label">{e.label}</span>
                      <span className="tacct-amt">{e.amount}</span>
                    </div>
                  );
                })}
                {Array.from({ length: maxRows - dr.length }).map((_, j) => (
                  <div key={`pad-${j}`} className="tacct-row tacct-empty">
                    <span>&nbsp;</span>
                  </div>
                ))}
              </div>
              <div className="tacct-divider" />
              <div className="tacct-side">
                <div className="tacct-hdr">Cr</div>
                {cr.map((e, j) => {
                  const isNew = acct.newEntries.includes(e);
                  return (
                    <div
                      key={j}
                      className={`tacct-row ${isNew ? 'tacct-new' : ''} ${e.cls ? `tacct-${e.cls}` : ''}`}
                    >
                      <span className="tacct-label">{e.label}</span>
                      <span className="tacct-amt">{e.amount}</span>
                    </div>
                  );
                })}
                {Array.from({ length: maxRows - cr.length }).map((_, j) => (
                  <div key={`pad-${j}`} className="tacct-row tacct-empty">
                    <span>&nbsp;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function getEntriesForStep(accounts: TAccountDef[], step: number): TEntry[] {
  return accounts.flatMap(a => a.entries.filter(e => e.step === step));
}

export function getMaxOrderForStep(accounts: TAccountDef[], step: number): number {
  const entries = getEntriesForStep(accounts, step);
  if (entries.length === 0) return 0;
  return Math.max(...entries.map(e => e.order)) + 1;
}
