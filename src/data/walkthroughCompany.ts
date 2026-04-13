// ═══════════════════════════════════════════════════
// COMPANY WALKTHROUGH — Yeats Ltd 2024
// Auto-extracted from q1company2024-2.html
// ═══════════════════════════════════════════════════

import type { WalkthroughNote, BuilderStep } from "./walkthroughData";

export const CO_NOTES_STEPS: WalkthroughNote[] = [
  {
    "num": 1,
    "marks": 7,
    "title": "Closing Stock + Damaged Stock",
    "noteText": "Stock at cost on 31/12/2023 was <strong>€56,900</strong>. This figure includes damaged stock which cost <strong>€3,800</strong> but which now has a <strong>net realisable value of 60% of cost</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Stock on hand 01/01/2023</td><td>44,400</td></tr></table><p>Opening stock €44,400. Closing stock (before adjustments) = €56,900 from this note.</p>",
    "task": "<p><strong>Two adjustments to closing stock:</strong></p><ol><li>Damaged stock write-down: cost €3,800, NRV = 60% × €3,800 = €2,280. Loss = €1,520.</li><li>Sale-or-return goods (Note 3) at cost €4,000 — remove from closing stock (they're not ours).</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Damaged stock write-down.</strong> Lower of cost and NRV rule: stock must be shown at the lower of the two. Cost €3,800, NRV = 60% × €3,800 = €2,280. Write-down = €3,800 − €2,280 = <strong>€1,520</strong>."
        },
        "accts": [
          {
            "n": "Damaged Stock Write-down",
            "d": [
              {
                "x": "Cost",
                "v": "3,800"
              },
              {
                "x": "NRV (60% of cost)",
                "v": "2,280",
                "h": "b"
              },
              {
                "x": "Write-down (loss)",
                "v": "1,520",
                "h": "r",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Calculate adjusted closing stock.</strong> Start with €56,900 as given. Reduce by €1,520 (damaged stock write-down). Reduce by €4,000 (sale-or-return goods, see Note 3)."
        },
        "accts": [
          {
            "n": "Closing Stock A/C",
            "d": [
              {
                "x": "Stock as counted",
                "v": "56,900"
              },
              {
                "x": "Less: damaged write-down",
                "v": "(1,520)",
                "h": "r"
              },
              {
                "x": "Less: sale-or-return (at cost)",
                "v": "(4,000)",
                "h": "r"
              },
              {
                "x": "Adjusted closing stock",
                "v": "51,380",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Trading",
            "x": "Closing stock (deducted from COS)",
            "v": "51,380"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Stock in Current Assets",
            "v": "51,380"
          }
        ],
        "nw": [
          "W2 Closing stock: 56,900 − 1,520 − 4,000 = 51,380",
          "Write-down absorbed into COS via lower closing stock (no separate P&L line)"
        ],
        "trap": "<strong>Don't double-count the damaged stock.</strong> The €3,800 is ALREADY in the €56,900 at full cost. You reduce BY €1,520 (the write-down), not by €3,800. And don't add the NRV €2,280 back — that's already inside the adjusted figure."
      }
    ]
  },
  {
    "num": 2,
    "marks": 14,
    "title": "Van Depreciation + Asset Disposal",
    "noteText": "The cost of delivery vans is to be written off on a straight-line basis over <strong>5 years</strong>. A full year's depreciation is charged in the year of acquisition and none in the year of disposal. Delivery vans have a <strong>scrap value of 5% of the original cost</strong>. <strong>NOTE:</strong> During the year a delivery van which had cost <strong>€40,000 in 2019</strong> was traded in for <strong>€10,000</strong> against a new delivery van costing <strong>€56,000</strong>. The cheque for the net amount of this transaction was incorrectly treated as a <strong>purchase of trading stock</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Delivery vans (cost €115,000)</td><td>80,000</td></tr></table><p>NBV €80,000. Cost €115,000. Accumulated depreciation = €35,000.</p>",
    "task": "<p><strong>The classic Company Q1 trap:</strong></p><ol><li>Reverse the wrongly-posted Purchases (€46,000 net cheque)</li><li>Record the new van (€56,000) and remove the old van (€40,000)</li><li>Calculate profit/loss on disposal — old van had 4 full years of depreciation (2019–2022), NONE in year of disposal</li><li>Current year depreciation on the ADJUSTED cost figure</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate the net cheque.</strong> New van cost €56,000 − trade-in allowance €10,000 = <strong>€46,000</strong>. This was paid by cheque and wrongly posted to Purchases."
        },
        "accts": [
          {
            "n": "Net Cheque Calculation",
            "d": [
              {
                "x": "New van cost",
                "v": "56,000"
              },
              {
                "x": "Less: trade-in allowance",
                "v": "(10,000)",
                "h": "r"
              },
              {
                "x": "Net cheque paid (wrongly in Purchases)",
                "v": "46,000",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Reverse the Purchases error.</strong> Cr Purchases €46,000 to remove the wrongly-posted van cheque."
        },
        "accts": [
          {
            "n": "Purchases A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "747,000"
              }
            ],
            "c": [
              {
                "x": "Reverse van cheque",
                "v": "46,000",
                "h": "r"
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 3 — Calculate disposal of old van.</strong> Old van cost €40,000 in 2019. Depreciable amount = 95% of cost = €38,000. Annual depn = €38,000 / 5 = €7,600. Full years: 2019, 2020, 2021, 2022 = <strong>4 years</strong>. Accum depn = €7,600 × 4 = €30,400. NBV = €40,000 − €30,400 = €9,600."
        },
        "accts": [
          {
            "n": "Old Van Disposal",
            "d": [
              {
                "x": "Original cost (2019)",
                "v": "40,000"
              },
              {
                "x": "",
                "v": ""
              },
              {
                "x": "",
                "v": "40,000",
                "tot": 1
              }
            ],
            "c": [
              {
                "x": "Accum depn (4 years × 7,600)",
                "v": "30,400",
                "h": "a"
              },
              {
                "x": "Trade-in allowance",
                "v": "10,000",
                "h": "b"
              },
              {
                "x": "Profit on disposal → Other Income",
                "v": "400",
                "h": "g",
                "tot": 1
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 4 — Record new van + remove old van from the Vans account.</strong> Dr Vans €56,000 (new). Cr Vans €40,000 (disposed). New cost = €115,000 + €56,000 − €40,000 = <strong>€131,000</strong>."
        },
        "accts": [
          {
            "n": "Delivery Vans A/C (Cost)",
            "d": [
              {
                "x": "Per TB",
                "v": "115,000"
              },
              {
                "x": "New van purchased",
                "v": "56,000",
                "h": "g"
              }
            ],
            "c": [
              {
                "x": "Old van disposed",
                "v": "40,000",
                "h": "r"
              },
              {
                "x": "New balance",
                "v": "131,000",
                "h": "b",
                "tot": 1
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 5 — Current year depreciation on new cost figure.</strong> €131,000 × 95% / 5 = <strong>€24,890</strong>. The new van gets a full year; the old van gets NONE in year of disposal. So depreciation is simply €131,000 × 19%."
        },
        "accts": [
          {
            "n": "Current Year Depn",
            "d": [
              {
                "x": "New cost",
                "v": "131,000"
              },
              {
                "x": "× 95% / 5 years",
                "v": "× 19%"
              },
              {
                "x": "Depn → Distribution Costs",
                "v": "24,890",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Trading",
            "x": "Purchases (−46,000)",
            "v": "see N1/W1"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Profit on disposal → Other Income",
            "v": "400"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Van depreciation → Distribution",
            "v": "24,890"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Motor Vehicles cost",
            "v": "131,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Motor Vehicles AD: 35k + 24.89k − 30.4k",
            "v": "29,490"
          }
        ],
        "nw": [
          "W1  Purchases: 747,000 − 46,000 − 4,000 = 697,000",
          "W3  Van depn: 131,000 × 0.95/5 = 24,890",
          "W9  Profit disposal: 10,000 − 9,600 = 400",
          "W13 MV cost: 115,000 + 56,000 − 40,000 = 131,000",
          "W14 MV AD: 35,000 + 24,890 − 30,400 = 29,490"
        ],
        "trap": "<strong>THE TRAP:</strong> The van cheque is hidden in Purchases. Miss the reversal and Purchases is €46,000 too high, COS is wrong, GP is wrong, every total downstream is wrong. ALSO: the company's policy says \"none in year of disposal\" — the old van gets ZERO current year depreciation, even though it was sold mid-year."
      }
    ]
  },
  {
    "num": 3,
    "marks": 4,
    "title": "Sale or Return Purchase",
    "noteText": "It was discovered that goods had been received from a supplier on 31/12/2023 on a 'sale or return' basis. These goods had been entered in the books as a credit purchase in error. The expected selling price of these goods is <strong>€5,000 which is cost plus 25%</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Purchases and sales</td><td>747,000</td><td>1,080,700</td></tr><tr><td>Debtors and creditors</td><td>69,600</td><td>64,900</td></tr></table>",
    "task": "<p><strong>Three corrections (same figure in all three):</strong></p><ol><li>Reduce Purchases by the COST of the goods</li><li>Reduce Creditors by the same amount</li><li>Remove from Closing Stock if included (already done in Note 1)</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Work back to cost.</strong> Selling price €5,000 = cost + 25% mark-up. Cost = €5,000 ÷ 1.25 = <strong>€4,000</strong>."
        },
        "accts": [
          {
            "n": "Cost Calculation",
            "d": [
              {
                "x": "Selling price",
                "v": "5,000"
              },
              {
                "x": "Mark-up: cost + 25%",
                "v": "÷ 1.25"
              },
              {
                "x": "Cost",
                "v": "4,000",
                "h": "g",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Reverse the purchase.</strong> Cr Purchases €4,000, Dr Creditors €4,000. The supplier still owns these goods — no purchase has really happened."
        },
        "accts": [
          {
            "n": "Purchases A/C",
            "d": [],
            "c": [
              {
                "x": "Sale-or-return reversal",
                "v": "4,000",
                "h": "r"
              }
            ],
            "s": "c"
          },
          {
            "n": "Creditors A/C",
            "d": [
              {
                "x": "Sale-or-return reversal",
                "v": "4,000",
                "h": "r"
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong> (Closing stock already adjusted in Note 1.)"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Trading",
            "x": "Purchases (−4,000)",
            "v": "see W1"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Creditors (−4,000)",
            "v": "see W19"
          },
          {
            "t": "trading",
            "l": "Trading",
            "x": "Closing stock (−4,000, already in N1)",
            "v": "51,380"
          }
        ],
        "nw": [
          "W1  Purchases: 747,000 − 46,000 − 4,000 = 697,000",
          "W19 Creditors: 64,900 − 4,000 = 60,900",
          "W2  Closing stock: 56,900 − 1,520 − 4,000 = 51,380"
        ],
        "trap": "<strong>Use cost, not selling price.</strong> The €5,000 is the SELLING price; the reversal must be at the €4,000 COST. If you use €5,000, purchases is reduced by too much."
      }
    ]
  },
  {
    "num": 4,
    "marks": 8,
    "title": "Patents with Hidden Investment Income",
    "noteText": "Patents (<strong>incorporating 3 months investment income</strong>) are being written off over a <strong>7-year period which commenced in 2021</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>3% Investments acquired on 01/05/2023</td><td>120,000</td></tr><tr><td>Patents (incorporating 3 months investment income)</td><td>40,600</td></tr></table><p>Investments acquired 01/05/2023 → 8 months ownership (May–Dec). Only 3 months of interest has been received, credited to patents by mistake.</p>",
    "task": "<p><strong>Three things:</strong></p><ol><li>Calculate 3 months of investment income wrongly credited to patents (€900)</li><li>Add €900 back to patents → true balance €41,500</li><li>Write off over the REMAINING years: 7-year plan started 2021 → 2 years elapsed → 5 years remaining. Each year = €41,500 / 5 = €8,300.</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate the 3 months interest.</strong> €120,000 × 3% × 3/12 = <strong>€900</strong>. This was credited to patents by mistake."
        },
        "accts": [
          {
            "n": "Hidden Investment Income",
            "d": [
              {
                "x": "Investment cost",
                "v": "120,000"
              },
              {
                "x": "Rate",
                "v": "× 3%"
              },
              {
                "x": "3 months",
                "v": "× 3/12"
              },
              {
                "x": "Amount hidden in patents",
                "v": "900",
                "h": "a",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Restore the patent balance.</strong> The €900 was CREDITED to patents (reducing the balance). Add it back: €40,600 + €900 = <strong>€41,500</strong>."
        },
        "accts": [
          {
            "n": "Patents A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "40,600"
              },
              {
                "x": "Add back wrongly-credited income",
                "v": "900",
                "h": "g"
              },
              {
                "x": "True patent balance",
                "v": "41,500",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 3 — Calculate remaining years.</strong> 7-year plan started 2021. Years elapsed by end of 2023: 2021, 2022 = 2 full writeoffs already done. Remaining = 7 − 2 = <strong>5 years</strong>."
        },
        "accts": [
          {
            "n": "Years Remaining",
            "d": [
              {
                "x": "Plan length",
                "v": "7 years"
              },
              {
                "x": "Started",
                "v": "2021"
              },
              {
                "x": "Years already written off (2021+2022)",
                "v": "2",
                "h": "a"
              },
              {
                "x": "Remaining years",
                "v": "5",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 4 — Write off one year and find BS figure.</strong> Annual write-off = €41,500 / 5 = <strong>€8,300</strong>. BS balance = €41,500 − €8,300 = €33,200."
        },
        "accts": [
          {
            "n": "Patents — Current Year Writeoff",
            "d": [
              {
                "x": "True balance",
                "v": "41,500"
              },
              {
                "x": "÷ 5 remaining years",
                "v": "÷ 5"
              },
              {
                "x": "Annual writeoff → Admin",
                "v": "8,300",
                "h": "r"
              },
              {
                "x": "BS balance",
                "v": "33,200",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Patents written off (Admin)",
            "v": "8,300"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Patents (Intangible FA)",
            "v": "33,200"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "3 months interest → Other Income (via N9)",
            "v": "see W10"
          }
        ],
        "nw": [
          "W4  Patent writeoff: (40,600 + 900) / 5 = 8,300",
          "W12 Patents BS: 41,500 − 8,300 = 33,200",
          "Note: the 900 feeds into Note 9 where total investment income (8 months) is calculated"
        ],
        "trap": "<strong>Divide by 5, not by 7.</strong> Students often divide by the original 7-year period, giving €41,500 / 7 = €5,929 (wrong). The remaining balance only represents the remaining 5 years of writeoffs, so divide by 5."
      }
    ]
  },
  {
    "num": 5,
    "marks": 6,
    "title": "Suspense Account",
    "noteText": "The suspense figure arises as a result of an <strong>incorrect figure for debenture interest</strong> (although the correct figure had been entered in the bank account) and <strong>discount allowed €400</strong> entered only in the discount account.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Salaries and general expenses (including suspense)</td><td>218,355</td><td></td></tr><tr><td>Debenture interest for the first nine months</td><td>5,400</td><td></td></tr><tr><td>Discount (net)</td><td>3,500</td><td></td></tr></table><p><strong>The suspense is hidden inside Salaries and general expenses €218,355.</strong></p>",
    "task": "<p><strong>Two errors:</strong></p><ol><li>Discount allowed €400: only debited to discount account. Missing: Cr Debtors €400. Suspense = Dr €400.</li><li>Debenture interest: TB shows €5,400 but correct 9-month figure = €6,000 (9 months on €100,000 at 8%). Understated by €600. Suspense = Cr €600.</li></ol><p>Net suspense: Dr €400 − Cr €600 = Cr €200 net. Salaries adjusted: €218,355 + €400 − €600 = <strong>€218,155</strong>.</p>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Discount allowed error.</strong> €400 was entered on the debit side of the discount account but nothing on the credit side. The missing entry should have been Cr Debtors €400. To clear: Dr Suspense €400, Cr Debtors €400."
        },
        "accts": [
          {
            "n": "Discount Allowed Fix",
            "d": [
              {
                "x": "Suspense (clear)",
                "v": "400",
                "h": "r"
              }
            ],
            "c": [
              {
                "x": "Debtors (reduce)",
                "v": "400",
                "h": "r"
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Debenture interest error.</strong> Correct 9 months' interest = €100,000 × 8% × 9/12 = <strong>€6,000</strong>. TB shows €5,400. Understated by €600. Correction: Dr Debenture Int €600, Cr Suspense €600."
        },
        "accts": [
          {
            "n": "Debenture Interest Fix",
            "d": [
              {
                "x": "Deb Interest (increase)",
                "v": "600",
                "h": "g"
              }
            ],
            "c": [
              {
                "x": "Suspense (clear)",
                "v": "600",
                "h": "g"
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 3 — Net effect on Salaries.</strong> The suspense is hiding inside Salaries and gen exp €218,355. Net suspense movement: Dr €400 − Cr €600 = Cr €200 net. Adjust salaries: €218,355 + €400 − €600 = <strong>€218,155</strong>."
        },
        "accts": [
          {
            "n": "Salaries & Gen Exp A/C",
            "d": [
              {
                "x": "Per TB (incl suspense)",
                "v": "218,355"
              },
              {
                "x": "+ Discount allowed clear",
                "v": "400",
                "h": "r"
              }
            ],
            "c": [
              {
                "x": "− Debenture interest clear",
                "v": "600",
                "h": "g"
              },
              {
                "x": "Adjusted → P&L Admin",
                "v": "218,155",
                "h": "b",
                "tot": 1
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Salaries & Gen Exp (Admin)",
            "v": "218,155"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Debtors (−400 for discount)",
            "v": "see W15"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Debenture interest (partial fix, see N9)",
            "v": "see W11"
          }
        ],
        "nw": [
          "W6  Salaries: 218,355 + 400 − 600 = 218,155",
          "W15 Debtors: 69,600 − 400 = 69,200",
          "Correct 9 months interest: 100,000 × 8% × 9/12 = 6,000"
        ],
        "trap": "<strong>Suspense hidden in another line:</strong> Unlike a typical suspense question, there's no \"Suspense €X\" line in the TB — it's hiding INSIDE salaries and gen exp. The net adjustment (Dr 400 − Cr 600 = Cr 200) changes the salaries figure."
      }
    ]
  },
  {
    "num": 6,
    "marks": 4,
    "title": "VAT on New Warehouse",
    "noteText": "A new warehouse was purchased during the year for <strong>€100,000 plus VAT @ 13.5%</strong>. The total amount paid to the vendor was entered in the land &amp; buildings account. <strong>No entry was made in the VAT account.</strong>",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Land and buildings at cost</td><td>580,000</td><td></td></tr><tr><td>VAT</td><td></td><td>1,900</td></tr></table>",
    "task": "<p><strong>Two corrections:</strong></p><ol><li>Strip VAT from Buildings: €100,000 × 13.5% = €13,500. Reduce Buildings by €13,500.</li><li>Claim the €13,500 as input VAT. TB VAT = €1,900 Cr (liability). New balance = €11,600 Dr (asset). VAT has FLIPPED SIDES.</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate VAT.</strong> €100,000 × 13.5% = <strong>€13,500</strong>. This was paid to the vendor (€113,500 total) but wrongly posted entirely to Buildings."
        },
        "accts": [
          {
            "n": "VAT on Warehouse",
            "d": [
              {
                "x": "Warehouse cost ex-VAT",
                "v": "100,000"
              },
              {
                "x": "× VAT rate 13.5%",
                "v": "× 13.5%"
              },
              {
                "x": "VAT portion",
                "v": "13,500",
                "h": "a",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Strip VAT from Buildings.</strong> Cr Buildings €13,500 to remove the VAT element. The corrected L&B cost is what we'll use for depreciation in Note 7."
        },
        "accts": [
          {
            "n": "Land & Buildings A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "580,000"
              }
            ],
            "c": [
              {
                "x": "VAT stripped out",
                "v": "13,500",
                "h": "r"
              },
              {
                "x": "Corrected cost",
                "v": "566,500",
                "h": "b",
                "tot": 1
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 3 — Claim input VAT.</strong> The €13,500 is reclaimable. Dr VAT €13,500. TB VAT was €1,900 Cr (liability). New balance = €1,900 Cr − €13,500 Dr = <strong>€11,600 Dr (asset!)</strong>. VAT has flipped sides."
        },
        "accts": [
          {
            "n": "VAT A/C",
            "d": [
              {
                "x": "Input VAT claim (warehouse)",
                "v": "13,500",
                "h": "g"
              },
              {
                "x": "New balance → Current Asset",
                "v": "11,600",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [
              {
                "x": "Per TB",
                "v": "1,900"
              },
              {
                "x": "",
                "v": ""
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "L&B cost (feeds N7 depn calc)",
            "v": "566,500"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "VAT → Current ASSETS (flipped!)",
            "v": "11,600"
          }
        ],
        "nw": [
          "W18 VAT: (1,900 Cr) + 13,500 Dr = 11,600 Dr (asset)",
          "Buildings for depn: 580,000 − 13,500 − 200,000 (land) = 366,500 (see N7)"
        ],
        "trap": "<strong>VAT moves from liabilities to assets!</strong> Miss this side-flip and your BS won't balance. Always check which side VAT ends up on after input VAT claims."
      }
    ]
  },
  {
    "num": 7,
    "marks": 12,
    "title": "Buildings Depreciation + Revaluation",
    "noteText": "Buildings are to be depreciated at the rate of <strong>2% of cost per annum</strong> (land at cost was <strong>€200,000</strong>). The company revalued land and buildings at <strong>€700,000</strong> on <strong>31/12/2023</strong> and this has yet to be reflected in the accounts.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Land and buildings at cost</td><td>580,000</td><td></td></tr><tr><td>Accumulated depreciation — buildings</td><td></td><td>38,000</td></tr></table><p>After VAT strip (Note 6): corrected cost = €566,500.</p>",
    "task": "<p><strong>Revaluation at END of year (31/12/2023):</strong></p><ol><li>Depreciate for the full year FIRST on the old (corrected) cost</li><li>THEN revalue to €700,000</li><li>Wipe out ALL accumulated depreciation (opening + current year) and transfer to Revaluation Reserve</li><li>Transfer the increase in value to the Revaluation Reserve as well</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate depreciable buildings.</strong> Corrected cost €566,500 minus land €200,000 = <strong>€366,500</strong> depreciable. Land is NEVER depreciated."
        },
        "accts": [
          {
            "n": "Depreciable Buildings",
            "d": [
              {
                "x": "Corrected L&B cost (N6)",
                "v": "566,500"
              },
              {
                "x": "Less: land",
                "v": "(200,000)",
                "h": "r"
              },
              {
                "x": "Depreciable buildings",
                "v": "366,500",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Current year depreciation.</strong> €366,500 × 2% = <strong>€7,330</strong>. This is charged BEFORE the revaluation because the revaluation is at end-of-year."
        },
        "accts": [
          {
            "n": "Buildings Depn (current year)",
            "d": [
              {
                "x": "Depreciable buildings",
                "v": "366,500"
              },
              {
                "x": "Rate",
                "v": "× 2%"
              },
              {
                "x": "Depn → Admin",
                "v": "7,330",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 3 — Revalue to €700,000.</strong> Total accumulated depreciation at this point: €38,000 (opening) + €7,330 (current year) = €45,330. This will all be wiped out by the revaluation."
        },
        "accts": [
          {
            "n": "Revaluation Step",
            "d": [
              {
                "x": "NBV before revaluation",
                "v": ""
              },
              {
                "x": "Cost 566,500 − AD 45,330",
                "v": "521,170"
              },
              {
                "x": "New value",
                "v": "700,000",
                "h": "g"
              },
              {
                "x": "Uplift",
                "v": "178,830",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 4 — Credit Revaluation Reserve.</strong> The marking scheme breakdown: uplift on cost €133,500 + opening AD written back €38,000 + current year depn written back €7,330 = <strong>€178,830</strong>. All three components go to the Reserve."
        },
        "accts": [
          {
            "n": "Revaluation Reserve",
            "d": [],
            "c": [
              {
                "x": "Cost uplift (700,000 − 566,500)",
                "v": "133,500",
                "h": "g"
              },
              {
                "x": "Opening AD written back",
                "v": "38,000",
                "h": "a"
              },
              {
                "x": "Current year depn written back",
                "v": "7,330",
                "h": "a"
              },
              {
                "x": "TOTAL → Capital section",
                "v": "178,830",
                "h": "b",
                "tot": 1
              }
            ],
            "s": "c"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Buildings depn → Admin",
            "v": "7,330"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "L&B at revalued amount",
            "v": "700,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Acc dep on buildings",
            "v": "NIL"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Revaluation Reserve",
            "v": "178,830"
          }
        ],
        "nw": [
          "W5  Buildings depn: (580,000 − 13,500 − 200,000) × 2% = 366,500 × 2% = 7,330",
          "W22 Reval Res: 133,500 + 38,000 + 7,330 = 178,830"
        ],
        "trap": "<strong>END-of-year revaluation:</strong> Depreciate FIRST at old cost (full year), THEN revalue, THEN wipe ALL accum depn (opening + current year) to the reserve. If it were START-of-year, you'd strip first, revalue, then depreciate at the new value."
      }
    ]
  },
  {
    "num": 8,
    "marks": 5,
    "title": "Rent Received Prepaid",
    "noteText": "The rent received was in respect of a warehouse rented out by the company for <strong>€1,500 per month commencing on 01/06/2023</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Cr</th></tr><tr><td>Rent received</td><td>13,500</td></tr></table>",
    "task": "<p>Calculate the EARNED portion vs the RECEIVED portion. Earned = €1,500 × 7 months (Jun–Dec) = €10,500. Received = €13,500. Difference = €3,000 rent received in advance (a liability).</p>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate earned rent.</strong> Rent commenced 01/06/2023 → 7 months earned (Jun, Jul, Aug, Sep, Oct, Nov, Dec). Earned = €1,500 × 7 = <strong>€10,500</strong>."
        },
        "accts": [
          {
            "n": "Rent Earned Calculation",
            "d": [
              {
                "x": "Months: Jun–Dec",
                "v": "7 months"
              },
              {
                "x": "Rent per month",
                "v": "× 1,500"
              },
              {
                "x": "Earned (Operating Income)",
                "v": "10,500",
                "h": "g",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Find the prepayment.</strong> Received €13,500, earned €10,500. Prepaid = €13,500 − €10,500 = <strong>€3,000</strong>. This is rent received in advance — a current LIABILITY (we owe the tenant the remaining months)."
        },
        "accts": [
          {
            "n": "Rent Received A/C",
            "d": [
              {
                "x": "Earned → P&L Other Income",
                "v": "10,500",
                "h": "g"
              },
              {
                "x": "Prepaid → Current Liability",
                "v": "3,000",
                "h": "r",
                "tot": 1
              }
            ],
            "c": [
              {
                "x": "Per TB (received)",
                "v": "13,500"
              },
              {
                "x": "",
                "v": ""
              },
              {
                "x": "",
                "v": "13,500",
                "tot": 1
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Rent received → Other Income (after exp)",
            "v": "10,500"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Rent received prepaid (Current LIABILITY)",
            "v": "3,000"
          }
        ],
        "nw": [
          "W7  Rent received: 13,500 − 3,000 = 10,500",
          "W21 Rent prepaid: 13,500 − 10,500 = 3,000"
        ],
        "trap": "<strong>Rent received prepaid is a LIABILITY, not an asset.</strong> The company has been paid for rent it hasn't yet earned — it owes the tenant time in the warehouse. Don't confuse with rent PAID prepaid (your own rent paid in advance = asset)."
      }
    ]
  },
  {
    "num": 9,
    "marks": 14,
    "title": "Directors' Recommendations (Inv Income, BDP, Capital Reserve)",
    "noteText": "The Directors recommend that: (1) Provision should be made for both <strong>investment income due</strong> and <strong>debenture interest due</strong>. (2) Provision for bad debts to be adjusted to <strong>4% of debtors</strong>. (3) A transfer of <strong>€20,000</strong> should be made from profit to the <strong>capital reserve</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>3% Investments acquired on 01/05/2023</td><td>120,000</td><td></td></tr><tr><td>Debenture interest for the first nine months</td><td>5,400</td><td></td></tr><tr><td>Bad debts provision</td><td></td><td>3,200</td></tr><tr><td>8% Debentures (incl €40,000 issued 01/10/2023)</td><td></td><td>140,000</td></tr><tr><td>Capital reserve</td><td></td><td>15,000</td></tr></table>",
    "task": "<p><strong>Four sub-calculations:</strong></p><ol><li>Investment income — full 8 months (€120,000 × 3% × 8/12)</li><li>Debenture interest — full year split by issue date (9 months on €100,000 + 3 months on €140,000)</li><li>BDP adjustment: new = 4% of adjusted debtors €69,200 = €2,768. Decrease from €3,200 = €432 (income)</li><li>Capital reserve transfer €20,000 (deducted AFTER Retained Profit)</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Investment income (full 8 months).</strong> Investments acquired 01/05/2023, held 8 months (May–Dec). €120,000 × 3% × 8/12 = <strong>€2,400</strong>. Already received (hidden in patents): €900. Due = €1,500."
        },
        "accts": [
          {
            "n": "Investment Income",
            "d": [
              {
                "x": "8 months: 120k × 3% × 8/12",
                "v": "2,400",
                "h": "g"
              },
              {
                "x": "Less: received (in patents, N4)",
                "v": "(900)",
                "h": "a"
              },
              {
                "x": "Due (Current Asset)",
                "v": "1,500",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 2 — Debenture interest (full year).</strong> €40,000 issued 01/10/2023. First 9 months: only €100,000 outstanding. Last 3 months: €140,000. €100k × 8% × 9/12 = €6,000. €140k × 8% × 3/12 = €2,800. Total = <strong>€8,800</strong>. Paid (bank) = €6,000. Due = €2,800."
        },
        "accts": [
          {
            "n": "Debenture Interest",
            "d": [
              {
                "x": "9 months: 100k × 8% × 9/12",
                "v": "6,000",
                "h": "b"
              },
              {
                "x": "3 months: 140k × 8% × 3/12",
                "v": "2,800",
                "h": "g"
              },
              {
                "x": "TOTAL for year",
                "v": "8,800",
                "h": "a"
              },
              {
                "x": "Less: actual paid (bank)",
                "v": "(6,000)"
              },
              {
                "x": "Due (Current Liability)",
                "v": "2,800",
                "h": "r",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 3 — BDP adjustment.</strong> Adjusted debtors = €69,600 − €400 (discount correction N5) = €69,200. New BDP = €69,200 × 4% = <strong>€2,768</strong>. Old BDP = €3,200. Decrease = €432 (this is INCOME because the provision is being RELEASED)."
        },
        "accts": [
          {
            "n": "BDP Working",
            "d": [
              {
                "x": "Adjusted debtors",
                "v": "69,200"
              },
              {
                "x": "× 4%",
                "v": "× 4%"
              },
              {
                "x": "New BDP",
                "v": "2,768",
                "h": "b"
              },
              {
                "x": "Less: old BDP",
                "v": "(3,200)"
              },
              {
                "x": "DECREASE → Other Income",
                "v": "432",
                "h": "g",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          }
        ]
      },
      {
        "expl": {
          "t": "warning",
          "tx": "<strong>Step 4 — Capital reserve transfer.</strong> €20,000 moved FROM retained profit TO capital reserve. This happens INSIDE the P&L after Retained Profit (it's not an expense). Capital reserve becomes €15,000 + €20,000 = <strong>€35,000</strong> on the BS."
        },
        "accts": [
          {
            "n": "Capital Reserve Transfer",
            "d": [
              {
                "x": "From Retained Profit",
                "v": "20,000",
                "h": "r"
              }
            ],
            "c": [
              {
                "x": "To Capital Reserve",
                "v": "20,000",
                "h": "g"
              }
            ],
            "s": "a"
          }
        ]
      },
      {
        "expl": {
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Investment income → Other Income",
            "v": "2,400"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Investment income due (CA)",
            "v": "1,500"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Debenture interest (Financial)",
            "v": "8,800"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Debenture interest due (CL)",
            "v": "2,800"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Decrease in BDP → Other Income",
            "v": "432"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "BDP (deducted from Debtors)",
            "v": "2,768"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Transfer to Capital Reserve",
            "v": "20,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Capital Reserve (15k + 20k)",
            "v": "35,000"
          }
        ],
        "nw": [
          "W10 Inv income: 120,000 × 3% × 8/12 = 2,400",
          "W17 Inv due: 2,400 − 900 = 1,500",
          "W11 Deb int: (100k × 8% × 9/12) + (140k × 8% × 3/12) = 6,000 + 2,800 = 8,800",
          "W20 Deb int due: 8,800 − 6,000 = 2,800",
          "W16 BDP: 69,200 × 4% = 2,768",
          "W8  BDP decrease: 3,200 − 2,768 = 432",
          "Capital Reserve: 15,000 + 20,000 = 35,000"
        ],
        "trap": "<strong>Decrease in BDP is INCOME, not a negative expense.</strong> It goes in Other Income, not as a negative in S&D. And the €20,000 capital reserve transfer is NOT an expense — it goes AFTER Retained Profit in the P&L, then Capital Reserve increases by €20,000 on the BS."
      }
    ]
  }
];

export const CO_TPL_STEPS_NEW: BuilderStep[] = [
  {
    "title": "Sales and Cost of Sales — Opening Stock & Purchases",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Trading, Profit &amp; Loss Account of Yeats Ltd — y/e 31/12/2023</td></tr>",
      "<tr><td class=\"lbl\">Sales <span class=\"wtag\">TB</span></td><td></td><td class=\"amt\">1,080,700</td></tr>",
      "<tr class=\"heading\"><td colspan=\"3\">Less Cost of Sales</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Opening stock <span class=\"wtag\">TB</span></td><td class=\"amt\">44,400</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">+ Purchases <span class=\"wtag\">W1</span></td><td class=\"amt\">697,000</td><td></td></tr>"
    ],
    "source": "<strong>Sales €1,080,700</strong> from TB, unchanged. <strong>Opening stock €44,400</strong> from TB. <strong>Purchases €697,000</strong> (W1) = €747,000 − €46,000 (van cheque) − €4,000 (sale-or-return).",
    "reason": "Company format starts like any trading account: Sales minus Cost of Sales. The differences come later in the expense layout and the P&L balance carry-forward.",
    "watch": "<strong>The €46,000 trap:</strong> The net cheque for the new van (€56,000 − €10,000 trade-in = €46,000) was wrongly posted to Purchases. Miss the reversal and COS is wrong."
  },
  {
    "title": "Closing Stock, Cost of Sales & Gross Profit",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">− Closing stock <span class=\"wtag\">W2</span></td><td class=\"amt\">(51,380)</td><td class=\"amt\">(690,020)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Gross Profit</td><td></td><td class=\"amt\">390,680</td></tr>"
    ],
    "source": "<strong>Closing stock €51,380</strong> (W2) = €56,900 − €1,520 (damaged write-down) − €4,000 (sale-or-return).",
    "reason": "COS = €44,400 + €697,000 − €51,380 = €690,020. Gross Profit = €1,080,700 − €690,020 = <strong>€390,680</strong>.",
    "tip": "<strong>Damaged stock shortcut:</strong> The €1,520 write-down is absorbed into COS automatically via the lower closing stock figure — no separate expense line needed."
  },
  {
    "title": "Distribution Costs",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Less Expenses — Distribution Costs</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Discount (allowed) <span class=\"wtag\">TB</span></td><td class=\"amt\">3,500</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Depreciation — delivery vans <span class=\"wtag\">W3</span></td><td class=\"amt\">24,890</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Advertising <span class=\"wtag\">TB</span></td><td class=\"amt\">25,145</td><td class=\"amt\">53,535</td></tr>"
    ],
    "source": "<strong>Discount €3,500</strong> TB (debit side → discount ALLOWED, expense). <strong>Van depn €24,890</strong> (W3) = €131,000 × 95% / 5. <strong>Advertising €25,145</strong> from TB.",
    "reason": "Distribution Costs are the costs of selling goods. Discount allowed, delivery van depreciation, advertising all fit here.",
    "watch": "<strong>Discount side-check:</strong> Discount is on the DEBIT side (€3,500) → discount ALLOWED → expense → Distribution. If it had been on the credit side, it would be discount RECEIVED → Other Income."
  },
  {
    "title": "Administration Expenses",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Administration Expenses</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Patents written off <span class=\"wtag\">W4</span></td><td class=\"amt\">8,300</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Depreciation — buildings <span class=\"wtag\">W5</span></td><td class=\"amt\">7,330</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Salaries &amp; general expenses <span class=\"wtag\">W6</span></td><td class=\"amt\">218,155</td><td class=\"amt\">233,785</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Total Expenses</td><td></td><td class=\"amt\">(287,320)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\"></td><td></td><td class=\"amt\">103,360</td></tr>"
    ],
    "source": "<strong>Patents €8,300</strong> (W4) = €41,500 / 5 years remaining. <strong>Buildings depn €7,330</strong> (W5) = €366,500 × 2%. <strong>Salaries €218,155</strong> (W6) = €218,355 + €400 − €600 (suspense).",
    "reason": "Admin = Patents + Buildings depn + Salaries = <strong>€233,785</strong>. Total Expenses = €53,535 (Dist) + €233,785 (Admin) = <strong>€287,320</strong>. After expenses: €390,680 − €287,320 = <strong>€103,360</strong>.",
    "watch": "<strong>Don't put van depn in Admin.</strong> Vans are selling/distribution assets. Buildings depn goes in Admin because buildings are office. Match the asset to its function."
  },
  {
    "title": "Other Income (after Total Expenses)",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Add Other Income</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Rent received <span class=\"wtag\">W7</span></td><td class=\"amt\">10,500</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Decrease in bad debts provision <span class=\"wtag\">W8</span></td><td class=\"amt\">432</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Profit on disposal <span class=\"wtag\">W9</span></td><td class=\"amt\">400</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Investment income <span class=\"wtag\">W10</span></td><td class=\"amt\">2,400</td><td class=\"amt\">13,732</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Operating Profit</td><td></td><td class=\"amt\">117,092</td></tr>"
    ],
    "source": "<strong>Rent €10,500</strong> (W7) = 7 months × €1,500. <strong>BDP decrease €432</strong> (W8) = €3,200 − €2,768. <strong>Profit on disposal €400</strong> (W9) = trade-in €10,000 − NBV €9,600. <strong>Investment income €2,400</strong> (W10) = €120,000 × 3% × 8/12.",
    "reason": "Other Income goes <strong>after Total Expenses</strong>, not before. All four other-income lines are added together. Operating Profit = €103,360 + €13,732 = <strong>€117,092</strong>.",
    "tip": "<strong>Investment income placement:</strong> In the modern Company format, investment income goes in Other Income alongside rent, discount received, profits on disposal, and BDP decrease — NOT in a separate section after Operating Profit."
  },
  {
    "title": "Debenture Interest & Net Profit",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Less Debenture interest <span class=\"wtag\">W11</span></td><td></td><td class=\"amt\">(8,800)</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">Net Profit</td><td></td><td class=\"amt\">108,292</td></tr>"
    ],
    "source": "<strong>Debenture interest €8,800</strong> (W11) = (€100,000 × 8% × 9/12) + (€140,000 × 8% × 3/12).",
    "reason": "Debenture interest is a financial expense — the cost of long-term borrowing. It sits after Operating Profit. Net Profit = €117,092 − €8,800 = <strong>€108,292</strong>.",
    "watch": "<strong>Debenture mid-year issue:</strong> €40,000 issued on 01/10/2023. First 9 months only €100,000 outstanding, then €140,000 for last 3 months. Split the interest calculation."
  },
  {
    "title": "Dividends, Capital Reserve Transfer & Retained",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Less Dividends paid <span class=\"wtag\">TB</span></td><td></td><td class=\"amt\">(15,000)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Retained profit</td><td></td><td class=\"amt\">93,292</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Less Transfer to Capital Reserve <span class=\"wtag\">N9</span></td><td></td><td class=\"amt\">(20,000)</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td></td><td class=\"amt\">73,292</td></tr>"
    ],
    "source": "<strong>Dividends paid €15,000</strong> from TB. <strong>Transfer €20,000</strong> from Note 9(iii).",
    "reason": "Dividends come AFTER Net Profit (they're a distribution of profit, not an expense). Retained profit = €108,292 − €15,000 = <strong>€93,292</strong>. Then transfer €20,000 to capital reserve, leaving €73,292 available to carry forward.",
    "watch": "<strong>Capital reserve transfer placement:</strong> It's a movement WITHIN equity. It reduces distributable (retained) profit and increases non-distributable (capital) reserve. It must NOT appear as an expense above Net Profit."
  },
  {
    "title": "P&L Balance Carry-Forward",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">+ P&amp;L balance 01/01/2023 <span class=\"wtag\">TB</span></td><td></td><td class=\"amt\">34,800</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">P&amp;L balance 31/12/2023</td><td></td><td class=\"amt\">108,092</td></tr>"
    ],
    "source": "<strong>Opening P&amp;L balance €34,800</strong> from TB (credit side).",
    "reason": "A company carries forward its accumulated P&amp;L year on year. Opening balance + this year's retained figure = Closing balance. €73,292 + €34,800 = <strong>€108,092</strong>. Goes to the Balance Sheet Capital section.",
    "tip": "<strong>The P&amp;L balance is the \"retained earnings\" account.</strong> It tracks accumulated profits not yet paid out as dividends or transferred to reserves."
  }
];

export const CO_BS_STEPS_NEW: BuilderStep[] = [
  {
    "title": "Intangible Fixed Assets — Patents",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Balance Sheet of Yeats Ltd as at 31/12/2023</td></tr>",
      "<tr class=\"heading\"><td colspan=\"4\">Intangible Fixed Assets</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Patents <span class=\"wtag\">W12</span></td><td></td><td></td><td class=\"amt\">33,200</td></tr>"
    ],
    "source": "<strong>Patents €33,200</strong> (W12) = €41,500 (cleaned-up balance) − €8,300 (current year write-off).",
    "reason": "Intangibles always come first. Show the NBV.",
    "watch": "<strong>Do NOT use the TB figure of €40,600.</strong> It had 3 months of investment income hidden inside it. The cleaned-up balance is €41,500."
  },
  {
    "title": "Tangible Fixed Assets — Header & Land and Buildings",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Tangible Fixed Assets</td></tr>",
      "<tr><td class=\"lbl\"></td><td class=\"amt\"><strong>Cost</strong></td><td class=\"amt\"><strong>Acc Dep</strong></td><td class=\"amt\"><strong>NBV</strong></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Land &amp; Buildings</td><td class=\"amt\">700,000</td><td class=\"amt\">—</td><td class=\"amt\">700,000</td></tr>"
    ],
    "source": "<strong>Cost €700,000</strong> (revalued at 31/12/2023). <strong>Accum Depn €0</strong> (wiped by revaluation).",
    "reason": "When a building is revalued, all accumulated depreciation is wiped and the cost becomes the new valuation. Depreciation starts again from zero next year.",
    "tip": "The revaluation surplus (€178,830) appears in the Capital section, not here."
  },
  {
    "title": "Tangible Fixed Assets — Motor Vehicles",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Motor Vehicles <span class=\"wtag\">W13, W14</span></td><td class=\"amt\">131,000</td><td class=\"amt\">29,490</td><td class=\"amt\">101,510</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td class=\"amt\"><strong>831,000</strong></td><td class=\"amt\"><strong>29,490</strong></td><td class=\"amt\">801,510</td></tr>"
    ],
    "source": "<strong>Cost €131,000</strong> (W13) = €115,000 + €56,000 − €40,000. <strong>AD €29,490</strong> (W14) = €35,000 + €24,890 − €30,400.",
    "reason": "Both the cost AND accumulated depreciation of the disposed van must be removed from the totals. New van adds €56,000 to cost and gets a full year of depreciation.",
    "tip": "Total TFA NBV = 700,000 + 101,510 = <strong>€801,510</strong>."
  },
  {
    "title": "Financial Assets — 3% Investments",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Financial Assets</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">3% Investments <span class=\"wtag\">TB</span></td><td></td><td></td><td class=\"amt\">120,000</td></tr>",
      "<tr><td class=\"lbl\"></td><td></td><td></td><td class=\"amt\"><strong>954,710</strong></td></tr>"
    ],
    "source": "<strong>€120,000</strong> from TB.",
    "reason": "Total Fixed + Intangible + Financial = 33,200 + 801,510 + 120,000 = <strong>€954,710</strong>.",
    "tip": "The €120,000 is the asset itself. The €2,400 interest is in Other Income; the €1,500 interest due is in current assets."
  },
  {
    "title": "Current Assets — Stock & Debtors",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Current Assets</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Closing Stock <span class=\"wtag\">W2</span></td><td></td><td class=\"amt\">51,380</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Debtors <span class=\"wtag\">W15</span></td><td class=\"amt\">69,200</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Bad debts provision <span class=\"wtag\">W16</span></td><td class=\"amt\">(2,768)</td><td class=\"amt\">66,432</td><td></td></tr>"
    ],
    "source": "<strong>Stock €51,380</strong> (W2). <strong>Debtors €69,200</strong> (W15) = €69,600 − €400 (discount correction). <strong>BDP €2,768</strong> (W16) = €69,200 × 4%.",
    "reason": "Net debtors = €69,200 − €2,768 = <strong>€66,432</strong>.",
    "watch": "<strong>BDP on adjusted debtors, not TB debtors.</strong> €69,200 × 4% = €2,768."
  },
  {
    "title": "Current Assets — Receivables & VAT",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Investment income due <span class=\"wtag\">W17</span></td><td></td><td class=\"amt\">1,500</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">VAT <span class=\"wtag\">W18</span></td><td></td><td class=\"amt\">11,600</td><td class=\"amt\">130,912</td></tr>"
    ],
    "source": "<strong>Investment income due €1,500</strong> (W17) = €2,400 earned − €900 received. <strong>VAT €11,600</strong> (W18) = TB −€1,900 liability + €13,500 input VAT = €11,600 asset.",
    "reason": "VAT has FLIPPED SIDES. It was a credit in the TB (liability) but after claiming the €13,500 warehouse VAT it becomes a debit (asset). Total Current Assets = 51,380 + 66,432 + 1,500 + 11,600 = <strong>€130,912</strong>.",
    "watch": "<strong>VAT side-flip is easy to miss.</strong> Leave it in liabilities and the BS won't balance."
  },
  {
    "title": "Current Liabilities",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Creditors: amounts falling due within 1 year</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Creditors <span class=\"wtag\">W19</span></td><td class=\"amt\">60,900</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Bank <span class=\"wtag\">TB</span></td><td class=\"amt\">57,000</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Debenture interest due <span class=\"wtag\">W20</span></td><td class=\"amt\">2,800</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Rent receivable prepaid <span class=\"wtag\">W21</span></td><td class=\"amt\">3,000</td><td class=\"amt\">(123,700)</td><td></td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Working Capital</td><td></td><td></td><td class=\"amt\">7,212</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\"></td><td></td><td></td><td class=\"amt\">961,922</td></tr>"
    ],
    "source": "<strong>Creditors €60,900</strong> (W19) = €64,900 − €4,000. <strong>Bank €57,000</strong> TB overdraft. <strong>Deb int due €2,800</strong> (W20). <strong>Rent prepaid €3,000</strong> (W21).",
    "reason": "Total CL = €123,700. Working Capital = €130,912 − €123,700 = <strong>€7,212</strong>. Total Net Assets = €954,710 + €7,212 = <strong>€961,922</strong>.",
    "watch": "<strong>Rent received prepaid is a LIABILITY.</strong> The company has been paid for rent it hasn't yet earned — it owes the tenant time in the warehouse."
  },
  {
    "title": "Financed By — Debentures",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Financed By</td></tr>",
      "<tr class=\"heading\"><td colspan=\"4\">Creditors: amounts falling due after 1 year</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">8% Debentures <span class=\"wtag\">TB</span></td><td></td><td></td><td class=\"amt\">140,000</td></tr>"
    ],
    "source": "<strong>€140,000</strong> from TB. Includes €40,000 issued mid-year on 01/10/2023.",
    "reason": "Debentures are long-term loans (over 1 year). Interest due (€2,800) is in current liabilities; the principal is here.",
    "tip": "Alongside share capital and reserves, debentures make up the long-term financing."
  },
  {
    "title": "Share Capital",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Share Capital</td></tr>",
      "<tr><td class=\"lbl\"></td><td class=\"amt\"><strong>Authorised</strong></td><td class=\"amt\"><strong>Issued</strong></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Ordinary shares €1 each</td><td class=\"amt\">1,000,000</td><td class=\"amt\">400,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">4% Preference shares €1 each</td><td class=\"amt\">600,000</td><td class=\"amt\">100,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td class=\"amt\"><strong>1,600,000</strong></td><td class=\"amt\"><strong>500,000</strong></td><td></td></tr>"
    ],
    "source": "<strong>Authorised:</strong> 1,000,000 ord + 600,000 pref = €1,600,000 (from question intro). <strong>Issued:</strong> €400,000 + €100,000 = <strong>€500,000</strong> (TB).",
    "reason": "Authorised is a disclosure. Issued is what's actually in circulation. Only the Issued figure counts for Capital Employed.",
    "watch": "<strong>Never add Authorised to Capital Employed.</strong> Only Issued €500,000 is real money raised."
  },
  {
    "title": "Reserves &amp; P&amp;L Balance",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Revaluation Reserve <span class=\"wtag\">W22</span></td><td></td><td class=\"amt\">178,830</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Capital reserve</td><td></td><td class=\"amt\">35,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Profit &amp; Loss balance</td><td></td><td class=\"amt\">108,092</td><td class=\"amt\">821,922</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">Capital Employed</td><td></td><td></td><td class=\"amt\">961,922</td></tr>"
    ],
    "source": "<strong>Reval Reserve €178,830</strong> (W22) = €133,500 + €38,000 + €7,330. <strong>Capital reserve €35,000</strong> = TB €15,000 + €20,000 transfer. <strong>P&amp;L balance €108,092</strong> from TPL.",
    "reason": "Three reserves + Issued SC make up the shareholders' equity. Capital Employed = Debentures €140,000 + SC €500,000 + Reserves (€178,830 + €35,000 + €108,092) = <strong>€961,922</strong>.",
    "watch": "<strong>Three reserves in the capital section:</strong> Revaluation Reserve (N7), Capital Reserve (TB €15,000 + €20,000 transfer from N9), and P&amp;L balance (from TPL). Missing any unbalances the BS."
  },
  {
    "title": "Final Verification",
    "rows": [],
    "source": "<strong>Total Net Assets = €961,922 = Capital Employed = €961,922</strong> ✓",
    "reason": "All 22 workings placed. Net Profit €108,292. Retained Profit €93,292 (before capital reserve transfer). P&amp;L balance 31/12/2023 €108,092.",
    "tip": "<strong>If your two totals don't match</strong> for Company 2024: (1) forgot the revaluation reserve, (2) VAT still in liabilities, (3) capital reserve transfer above Net Profit, (4) used TB debtors for BDP, (5) forgot to strip VAT from buildings cost."
  }
];
