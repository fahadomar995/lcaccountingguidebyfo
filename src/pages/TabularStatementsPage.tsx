import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
interface ColumnEffect {
  column: string;
  delta: number; // positive or negative
  note?: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  effects: ColumnEffect[]; // Net effect on each column
  rationale: string;
}

interface TabularScenario {
  id: string;
  title: string;
  subtitle: string;
  columns: { key: string; label: string; type: "asset" | "liability" | "capital" }[];
  opening: Record<string, number>;
  transactions: Transaction[];
}

// ─────────────────────────────────────────────────────────────────
// Scenarios — sourced from typical SEC Q4/Q6 tabular questions
// ─────────────────────────────────────────────────────────────────
const SCENARIOS: TabularScenario[] = [
  {
    id: "sole-trader-startup",
    title: "Sole Trader — Six Transactions",
    subtitle: "Show the effect of each transaction on Assets, Liabilities and Capital using the Tabular Statement method.",
    columns: [
      { key: "premises", label: "Premises", type: "asset" },
      { key: "stock", label: "Stock", type: "asset" },
      { key: "debtors", label: "Debtors", type: "asset" },
      { key: "bank", label: "Bank", type: "asset" },
      { key: "creditors", label: "Creditors", type: "liability" },
      { key: "loan", label: "Loan", type: "liability" },
      { key: "capital", label: "Capital", type: "capital" },
    ],
    opening: { premises: 120000, stock: 8000, debtors: 4000, bank: 6000, creditors: 5000, loan: 30000, capital: 103000 },
    transactions: [
      {
        id: 1,
        date: "01/02",
        description: "Sold goods (cost €1,200) on credit for €1,800",
        effects: [
          { column: "stock", delta: -1200, note: "stock leaves the business" },
          { column: "debtors", delta: 1800, note: "customer owes us" },
          { column: "capital", delta: 600, note: "profit of €600 increases capital" },
        ],
        rationale: "A credit sale at a profit. Stock falls by cost; debtors rise by selling price; capital rises by the profit element.",
      },
      {
        id: 2,
        date: "07/02",
        description: "Paid €2,000 off the loan from the bank",
        effects: [
          { column: "bank", delta: -2000 },
          { column: "loan", delta: -2000 },
        ],
        rationale: "Asset (bank) falls; liability (loan) falls by the same amount. Capital unchanged.",
      },
      {
        id: 3,
        date: "15/02",
        description: "Owner withdrew €600 cash for private use",
        effects: [
          { column: "bank", delta: -600 },
          { column: "capital", delta: -600, note: "drawings reduce capital" },
        ],
        rationale: "Drawings reduce both bank and capital — they are NOT an expense of the business.",
      },
      {
        id: 4,
        date: "20/02",
        description: "Bought stock on credit €2,500",
        effects: [
          { column: "stock", delta: 2500 },
          { column: "creditors", delta: 2500 },
        ],
        rationale: "Asset and liability both increase by the same amount. No cash movement, no capital change.",
      },
      {
        id: 5,
        date: "24/02",
        description: "Received €1,500 from debtors and allowed €60 discount",
        effects: [
          { column: "bank", delta: 1500 },
          { column: "debtors", delta: -1560, note: "1,500 received + 60 discount" },
          { column: "capital", delta: -60, note: "discount allowed is an expense" },
        ],
        rationale: "Debtors' total reduction = €1,560 (cash received PLUS discount). Discount allowed is an expense → reduces capital.",
      },
      {
        id: 6,
        date: "28/02",
        description: "Owner introduced a private vehicle worth €9,000 into the business",
        effects: [
          { column: "premises", delta: 9000, note: "treated as a fixed asset" },
          { column: "capital", delta: 9000, note: "extra capital introduced" },
        ],
        rationale: "Capital introduced raises both an asset (in this column we lump fixed assets) and capital. Not income.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n === 0) return "—";
  const sign = n < 0 ? "−" : "";
  return sign + Math.abs(n).toLocaleString("en-IE");
}

function cumulativeAt(scenario: TabularScenario, txIndex: number) {
  // Returns row of cumulative balances after transaction txIndex (−1 = opening only)
  const row: Record<string, number> = { ...scenario.opening };
  for (let i = 0; i <= txIndex; i++) {
    const tx = scenario.transactions[i];
    for (const eff of tx.effects) {
      row[eff.column] = (row[eff.column] ?? 0) + eff.delta;
    }
  }
  return row;
}

function balancesCheck(row: Record<string, number>, scenario: TabularScenario) {
  const totals: Record<string, number> = { asset: 0, liability: 0, capital: 0 };
  for (const c of scenario.columns) totals[c.type] += row[c.key] ?? 0;
  return {
    assets: totals.asset,
    claims: totals.liability + totals.capital,
    balances: totals.asset === totals.liability + totals.capital,
  };
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export default function TabularStatementsPage() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const scenario = useMemo(() => SCENARIOS.find(s => s.id === activeId)!, [activeId]);
  const [txIndex, setTxIndex] = useState(-1); // -1 = opening only
  const [showRationale, setShowRationale] = useState(true);

  const rows = useMemo(() => {
    const out: { label: string; date: string; description?: string; row: Record<string, number>; isCumul: boolean; deltas?: ColumnEffect[]; rationale?: string }[] = [];
    out.push({ label: "Opening", date: "01/02", row: scenario.opening, isCumul: true });
    for (let i = 0; i <= txIndex; i++) {
      const tx = scenario.transactions[i];
      out.push({
        label: `Tx ${tx.id}`,
        date: tx.date,
        description: tx.description,
        row: cumulativeAt(scenario, i),
        isCumul: true,
        deltas: tx.effects,
        rationale: tx.rationale,
      });
    }
    return out;
  }, [scenario, txIndex]);

  const finalRow = txIndex >= 0 ? cumulativeAt(scenario, txIndex) : scenario.opening;
  const check = balancesCheck(finalRow, scenario);
  const progress = ((txIndex + 1) / scenario.transactions.length) * 100;

  const next = () => setTxIndex(i => Math.min(i + 1, scenario.transactions.length - 1));
  const prev = () => setTxIndex(i => Math.max(i - 1, -1));
  const reset = () => setTxIndex(-1);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-7 py-6 pb-16">
      <div className="mb-5">
        <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">SEC §8.8 — Section B</Badge>
        <h1 className="font-display text-3xl font-bold mb-1">Tabular Statements</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Build the Statement of Affairs row by row. Reveal each transaction to see exactly how it ripples across Assets, Liabilities and Capital — and verify the books balance after every step.
        </p>
      </div>

      {/* Scenario picker */}
      {SCENARIOS.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SCENARIOS.map(s => (
            <Button
              key={s.id}
              size="sm"
              variant={s.id === activeId ? "default" : "outline"}
              onClick={() => { setActiveId(s.id); setTxIndex(-1); }}
            >
              {s.title}
            </Button>
          ))}
        </div>
      )}

      <Card className="mb-5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground italic">{scenario.subtitle}</p>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Button size="sm" variant="outline" onClick={prev} disabled={txIndex === -1}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button size="sm" onClick={next} disabled={txIndex >= scenario.transactions.length - 1}>
          {txIndex === -1 ? "Reveal first transaction" : "Next transaction"} <ChevronRight className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={reset} disabled={txIndex === -1}>
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
        <div className="flex-1" />
        <Button size="sm" variant="ghost" onClick={() => setShowRationale(s => !s)}>
          {showRationale ? "Hide" : "Show"} reasoning
        </Button>
      </div>

      {/* Progress */}
      <div className="h-1 bg-muted rounded-full overflow-hidden mb-5">
        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${Math.max(progress, 4)}%` }} />
      </div>

      {/* Tabular table */}
      <Card className="mb-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 border border-border text-left sticky left-0 bg-muted z-10">Tx</th>
              <th className="p-2 border border-border text-left">Description</th>
              {scenario.columns.map(c => (
                <th key={c.key} className={cn(
                  "p-2 border border-border text-right font-mono",
                  c.type === "asset" && "text-green-700 dark:text-green-400",
                  c.type === "liability" && "text-amber-700 dark:text-amber-400",
                  c.type === "capital" && "text-blue-700 dark:text-blue-400",
                )}>
                  {c.label}
                  <div className="text-[9px] uppercase tracking-wider opacity-60 font-sans">{c.type}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={cn(i === rows.length - 1 && txIndex >= 0 && "bg-primary/5")}>
                <td className="p-2 border border-border font-semibold sticky left-0 bg-card">{r.label}</td>
                <td className="p-2 border border-border text-muted-foreground">{r.description ?? "Statement of Affairs"}</td>
                {scenario.columns.map(c => {
                  const delta = r.deltas?.find(e => e.column === c.key);
                  const value = r.row[c.key] ?? 0;
                  return (
                    <td key={c.key} className="p-2 border border-border text-right font-mono">
                      {delta && (
                        <div className={cn(
                          "text-[10px] font-bold mb-0.5",
                          delta.delta > 0 ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400",
                        )}>
                          {delta.delta > 0 ? <Plus className="inline h-3 w-3" /> : <Minus className="inline h-3 w-3" />}
                          {Math.abs(delta.delta).toLocaleString("en-IE")}
                        </div>
                      )}
                      <div className={value === 0 ? "text-muted-foreground/50" : ""}>{fmt(value)}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-double border-foreground bg-muted/30 font-semibold">
              <td className="p-2 border border-border sticky left-0 bg-muted/30">Totals</td>
              <td className="p-2 border border-border text-right text-muted-foreground">
                Assets {fmt(check.assets)} = Claims {fmt(check.claims)}
              </td>
              {scenario.columns.map(c => (
                <td key={c.key} className="p-2 border border-border text-right font-mono">
                  {fmt(finalRow[c.key] ?? 0)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Balance check */}
      <div className={cn(
        "mb-5 p-3 rounded-lg border text-sm flex items-center gap-3",
        check.balances ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30" : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",
      )}>
        <span className="font-bold">{check.balances ? "✓ Balanced" : "✗ Off-balance"}</span>
        <span className="font-mono text-xs">
          Assets €{check.assets.toLocaleString("en-IE")} {check.balances ? "=" : "≠"} Liabilities + Capital €{check.claims.toLocaleString("en-IE")}
        </span>
      </div>

      {/* Rationale */}
      {showRationale && txIndex >= 0 && (
        <Card>
          <CardContent className="p-5">
            <div className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">Why this transaction lands here</div>
            <p className="text-sm leading-relaxed">{scenario.transactions[txIndex].rationale}</p>
          </CardContent>
        </Card>
      )}

      {txIndex === scenario.transactions.length - 1 && (
        <div className="mt-5 p-4 rounded-lg border border-primary/30 bg-primary/5 text-sm">
          <strong>All transactions revealed.</strong> The final row is your Closing Statement of Affairs. In an exam, calculate Profit by:
          <span className="block mt-1 font-mono text-xs">Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced</span>
        </div>
      )}
    </div>
  );
}
