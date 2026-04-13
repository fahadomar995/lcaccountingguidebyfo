// ═══════════════════════════════════════════════════
// MANUFACTURING WALKTHROUGH — McGuigan Ltd 2022
// Auto-extracted from q1mfg2022-2.html
// ═══════════════════════════════════════════════════

import type { WalkthroughNote, BuilderStep } from "./walkthroughData";

export const MFG_NOTES_STEPS: WalkthroughNote[] = [
  {
    "num": 1,
    "marks": 6,
    "title": "Closing Stocks (Raw, WIP, Finished)",
    "noteText": "Stocks on hand at 31/12/2021: <strong>Raw materials €28,300</strong>, <strong>Work in progress €27,600</strong>, <strong>Finished goods €58,000</strong>.",
    "tbLook": "<p>Look at the trial balance for opening stocks:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Raw materials</td><td>27,300</td></tr><tr><td>Work in progress</td><td>38,650</td></tr><tr><td>Finished goods</td><td>38,400</td></tr></table><p>The TB figures are the <strong>OPENING</strong> stocks. The closing stocks come from Note (i).</p>",
    "task": "<p><strong>Three categories of closing stock, each used in THREE different places:</strong></p><ol><li>Raw Materials (€28,300) — Mfg A/c + BS Current Assets</li><li>WIP (€27,600) — Mfg A/c + BS Current Assets</li><li>Finished Goods (€58,000) — Trading a/c + BS Current Assets (NOTE: this figure will be adjusted in Note 2)</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — The three stock figures.</strong> Each closing stock goes in TWO places: once in the accounts (Mfg or Trading) and once on the Balance Sheet under Current Assets. Unlike a non-manufacturing business, all three must appear SEPARATELY on the Balance Sheet."
        },
        "accts": [
          {
            "n": "Stocks Overview",
            "d": [
              {
                "x": "Raw Materials — opening",
                "v": "27,300"
              },
              {
                "x": "Raw Materials — closing",
                "v": "28,300",
                "h": "g"
              },
              {
                "x": "WIP — opening",
                "v": "38,650"
              },
              {
                "x": "WIP — closing",
                "v": "27,600",
                "h": "g"
              },
              {
                "x": "Finished Goods — opening",
                "v": "38,400"
              },
              {
                "x": "Finished Goods — closing (before adj)",
                "v": "58,000",
                "h": "b"
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
          "tx": "<strong>Step 2 — Closing Finished Goods will change!</strong> Note 2 has a sale of goods NOT dispatched — those goods were counted in closing stock at cost (€9,000) but have now been recognised as sold. So finished goods closing stock drops from €58,000 to <strong>€49,000</strong>."
        },
        "accts": [
          {
            "n": "Closing FG Adjustment",
            "d": [
              {
                "x": "Finished goods (as given)",
                "v": "58,000"
              },
              {
                "x": "Less: undispatched goods at cost (N2)",
                "v": "(9,000)",
                "h": "r"
              },
              {
                "x": "Adjusted Finished Goods",
                "v": "49,000",
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
            "l": "Mfg A/c",
            "x": "Opening RM €27,300",
            "v": "27,300"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Closing RM €28,300 (deduct)",
            "v": "28,300"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Opening WIP €38,650 (add)",
            "v": "38,650"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Closing WIP €27,600 (deduct)",
            "v": "27,600"
          },
          {
            "t": "trading",
            "l": "Trading",
            "x": "Opening FG €38,400",
            "v": "38,400"
          },
          {
            "t": "trading",
            "l": "Trading",
            "x": "Closing FG (adjusted)",
            "v": "49,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "All three stocks in Current Assets",
            "v": "104,900"
          }
        ],
        "nw": [
          "W9 Closing FG: 58,000 − 9,000 = 49,000",
          "Total stocks on BS: 28,300 + 27,600 + 49,000 = 104,900"
        ],
        "trap": "<strong>KEY:</strong> Show all three stock categories SEPARATELY on the Balance Sheet — do NOT combine them into one figure. This is the main visual difference from a sole trader BS."
      }
    ]
  },
  {
    "num": 2,
    "marks": 6,
    "title": "Sale of Goods Not Dispatched",
    "noteText": "No entry has been made in the books for sale of goods to a debtor on 31/12/2021. An invoice had been sent for <strong>€10,800</strong>, which included a <strong>mark-up on cost of 20%</strong>. The goods were not dispatched until 02/01/2022 and were <strong>included in closing stock</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Sales</td><td></td><td>1,650,000</td></tr><tr><td>Debtors</td><td>76,350</td><td></td></tr></table>",
    "task": "<p><strong>Two things:</strong></p><ol><li>Recognise the sale — add €10,800 to Sales and €10,800 to Debtors (the invoice was sent, so the sale has occurred even if the goods haven't left)</li><li>Since the goods were still in the warehouse on 31/12, they were INCLUDED in the closing stock count at cost. But we've now recognised them as sold, so REMOVE them from closing stock at cost: €10,800 ÷ 1.20 = €9,000</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Work back to cost.</strong> Selling price €10,800 = cost + 20% mark-up. So cost = €10,800 ÷ 1.20 = <strong>€9,000</strong>. This is the figure we'll remove from closing stock."
        },
        "accts": [
          {
            "n": "Cost Calculation",
            "d": [
              {
                "x": "Selling price",
                "v": "10,800"
              },
              {
                "x": "Mark-up on cost: 20%",
                "v": "÷ 1.20"
              },
              {
                "x": "Cost of goods",
                "v": "9,000",
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
          "tx": "<strong>Step 2 — Recognise the sale.</strong> Dr Debtors €10,800, Cr Sales €10,800. The invoice has been sent so the revenue is earned, even though the goods haven't physically left."
        },
        "accts": [
          {
            "n": "Sales A/C",
            "d": [],
            "c": [
              {
                "x": "Per TB",
                "v": "1,650,000"
              },
              {
                "x": "Add: undispatched sale",
                "v": "10,800",
                "h": "g"
              },
              {
                "x": "New total",
                "v": "1,660,800",
                "h": "b",
                "tot": 1
              }
            ],
            "s": "c"
          },
          {
            "n": "Debtors A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "76,350"
              },
              {
                "x": "Add: undispatched sale",
                "v": "10,800",
                "h": "g"
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
          "tx": "<strong>Step 3 — Remove from closing stock.</strong> The goods were counted in closing Finished Goods at cost (€9,000). Since they're now recognised as sold, remove them from closing stock."
        },
        "accts": [
          {
            "n": "Closing Stock — Finished Goods",
            "d": [
              {
                "x": "As counted",
                "v": "58,000"
              },
              {
                "x": "Less: undispatched goods at cost",
                "v": "(9,000)",
                "h": "r"
              },
              {
                "x": "Adjusted closing FG",
                "v": "49,000",
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
            "x": "Sales (+10,800)",
            "v": "1,660,800"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Debtors (+10,800) — feeds N18",
            "v": "see W18"
          },
          {
            "t": "trading",
            "l": "Trading",
            "x": "Closing FG (−9,000)",
            "v": "49,000"
          }
        ],
        "nw": [
          "W8 Sales: 1,650,000 + 10,800 = 1,660,800",
          "W9 Closing FG: 58,000 − 9,000 = 49,000",
          "W18 Debtors: 76,350 + 10,800 − 5,000 − 600 = 81,550"
        ],
        "trap": "<strong>Revenue recognition rule:</strong> A sale is recognised when the <em>invoice is sent</em> and legal title passes, not when the goods physically leave. The invoice date (31/12) means the sale belongs in this year's accounts."
      }
    ]
  },
  {
    "num": 3,
    "marks": 12,
    "title": "Sale of Scrap Includes Machine Disposal",
    "noteText": "Included in the figure for sale of scrap materials is <strong>€7,000</strong> received from the sale of an <strong>old machine on 31/03/2021</strong>. This machine had cost <strong>€30,000 on 01/09/2016</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Sale of scrap materials</td><td></td><td>18,950</td></tr><tr><td>Plant and machinery (cost €340,000)</td><td>290,000</td><td></td></tr></table><p>Machine cost = €340,000. NBV = €290,000. Opening accumulated depreciation = €50,000.</p>",
    "task": "<p><strong>Three things to sort out:</strong></p><ol><li>Separate €7,000 out of the scrap figure. True scrap = €18,950 − €7,000 = €11,950</li><li>Calculate accumulated depreciation on the OLD machine from 01/09/2016 to 31/03/2021 (55 months)</li><li>Calculate profit/loss on disposal</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Split the scrap figure.</strong> The TB shows €18,950 as \"sale of scrap materials\" but it secretly includes €7,000 from selling an old machine. Separate them."
        },
        "accts": [
          {
            "n": "Sale of Scrap — Cleanup",
            "d": [
              {
                "x": "Per TB",
                "v": "18,950"
              },
              {
                "x": "Less: old machine proceeds",
                "v": "(7,000)",
                "h": "r"
              },
              {
                "x": "True scrap → Mfg A/c",
                "v": "11,950",
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
          "tx": "<strong>Step 2 — Calculate accumulated depreciation on the disposed machine.</strong> Bought 01/09/2016, sold 31/03/2021 = <strong>55 months</strong> (4 years 7 months). At 15% straight line: €30,000 × 15% × 55/12 = <strong>€20,625</strong>."
        },
        "accts": [
          {
            "n": "Accum Depn — Old Machine",
            "d": [
              {
                "x": "01/09/2016 to 31/12/2016",
                "v": "4 months"
              },
              {
                "x": "2017 + 2018 + 2019 + 2020",
                "v": "48 months"
              },
              {
                "x": "01/01/2021 to 31/03/2021",
                "v": "3 months"
              },
              {
                "x": "Total months",
                "v": "55 months"
              },
              {
                "x": "€30,000 × 15% × 55/12",
                "v": "20,625",
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
          "t": "danger",
          "tx": "<strong>Step 3 — Disposal account.</strong> NBV = €30,000 − €20,625 = €9,375. Proceeds = €7,000. Loss on disposal = €9,375 − €7,000 = <strong>€2,375</strong>."
        },
        "accts": [
          {
            "n": "Disposal of Machine A/C",
            "d": [
              {
                "x": "Cost of old machine",
                "v": "30,000"
              },
              {
                "x": "",
                "v": ""
              },
              {
                "x": "",
                "v": "30,000",
                "tot": 1
              }
            ],
            "c": [
              {
                "x": "Accum depn (55 months)",
                "v": "20,625",
                "h": "a"
              },
              {
                "x": "Proceeds (scrap split)",
                "v": "7,000",
                "h": "b"
              },
              {
                "x": "LOSS → Mfg Factory OH",
                "v": "2,375",
                "h": "r",
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
          "tx": "<strong>Step 4 — Why the loss goes in Factory Overheads.</strong> The machine was a FACTORY asset. Gains and losses on disposal of factory assets are treated as factory overheads in the Manufacturing Account, not as operating items in the TPL. This is a manufacturing-specific rule."
        },
        "accts": [
          {
            "n": "Mfg A/c Factory Overheads",
            "d": [
              {
                "x": "Loss on disposal of machine",
                "v": "2,375",
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
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Sale of scrap (deduct)",
            "v": "11,950"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Loss on machine → Factory OH",
            "v": "2,375"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Machinery cost (−30,000)",
            "v": "310,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Machinery AD (−20,625)",
            "v": "see W17"
          }
        ],
        "nw": [
          "W7  Sale of scrap: 18,950 − 7,000 = 11,950",
          "W5  Loss on machine: 30,000 − 20,625 − 7,000 = 2,375",
          "W16 Machinery cost: 340,000 − 30,000 = 310,000",
          "W17 Machinery AD: 50,000 + 47,625 − 20,625 = 77,000"
        ],
        "trap": "<strong>THE TRAP:</strong> The scrap figure in the TB is contaminated with machine proceeds. If you use the full €18,950 as sale of scrap, you double-count the €7,000. You must split it first — the €7,000 is NOT scrap, it's proceeds from selling a capital asset which needs disposal treatment."
      }
    ]
  },
  {
    "num": 4,
    "marks": 4,
    "title": "Plant &amp; Machinery Depreciation",
    "noteText": "Plant and Machinery is to be depreciated at a rate of <strong>15% of cost</strong> from the <strong>date of purchase to the date of sale</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Plant and machinery (cost €340,000)</td><td>290,000</td></tr></table>",
    "task": "<p><strong>Two calculations:</strong></p><ol><li>Depreciation on the OLD machine (disposed 31/03/2021) — 3 months (Jan–Mar)</li><li>Depreciation on the REMAINING machines for the full year</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Depreciation on the OLD machine before disposal.</strong> The old machine (€30,000) was disposed of on 31/03/2021, so it gets 3 months of current-year depreciation: €30,000 × 15% × 3/12 = <strong>€1,125</strong>."
        },
        "accts": [
          {
            "n": "Old Machine — Current Year Depn",
            "d": [
              {
                "x": "Cost",
                "v": "30,000"
              },
              {
                "x": "Rate",
                "v": "15%"
              },
              {
                "x": "Period (Jan–Mar)",
                "v": "3/12"
              },
              {
                "x": "Depn",
                "v": "1,125",
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
          "tx": "<strong>Step 2 — Depreciation on the remaining machines.</strong> Remaining cost = €340,000 − €30,000 = €310,000. Full year at 15%: €310,000 × 15% = <strong>€46,500</strong>."
        },
        "accts": [
          {
            "n": "Remaining Machines — Depn",
            "d": [
              {
                "x": "Remaining cost",
                "v": "310,000"
              },
              {
                "x": "Rate (full year)",
                "v": "× 15%"
              },
              {
                "x": "Depn",
                "v": "46,500",
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
          "t": "info",
          "tx": "<strong>Step 3 — Total current year depreciation.</strong> €1,125 (old) + €46,500 (remaining) = <strong>€47,625</strong>. This goes in the Mfg A/c as a Factory Overhead."
        },
        "accts": [
          {
            "n": "Total P&M Depreciation",
            "d": [
              {
                "x": "Old machine (3 months)",
                "v": "1,125",
                "h": "r"
              },
              {
                "x": "Remaining (full year)",
                "v": "46,500",
                "h": "b"
              },
              {
                "x": "TOTAL → Mfg Factory OH",
                "v": "47,625",
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
          "t": "success",
          "tx": "<strong>Where everything goes.</strong>"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Depreciation on Machinery (Factory OH)",
            "v": "47,625"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Accum depn on machinery (+47,625)",
            "v": "see W17"
          }
        ],
        "nw": [
          "W4 P&M Depn: (30,000 × 15% × 3/12) + (310,000 × 15%) = 1,125 + 46,500 = 47,625",
          "Alternative: (340,000 × 15% × 3/12) + (310,000 × 15% × 9/12) = 12,750 + 34,875 = 47,625"
        ],
        "trap": "<strong>Why the Mfg A/c?</strong> Depreciation on FACTORY machinery is a FACTORY cost, so it belongs in the Manufacturing Account, not the TPL. Only depreciation on non-factory assets (office equipment, sales vehicles) goes in TPL expenses. This is the core manufacturing rule."
      }
    ]
  },
  {
    "num": 5,
    "marks": 8,
    "title": "Suspense Account",
    "noteText": "The suspense figure arises as a result of <strong>discount received €1,400</strong> entered only in the discount account and <strong>credit purchases of raw materials €11,000</strong> which were entered only in the creditors account.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Discount (net)</td><td></td><td>5,350</td></tr><tr><td>General factory overheads (including suspense)</td><td>126,700</td><td></td></tr><tr><td>Purchase of raw materials</td><td>760,400</td><td></td></tr><tr><td>Debtors and creditors</td><td>76,350</td><td>61,400</td></tr></table><p><strong>The suspense is HIDDEN inside General Factory Overheads.</strong></p>",
    "task": "<p><strong>Two errors:</strong></p><ol><li>Discount received €1,400 — only the credit to discount account was posted. Missing: Dr Creditors €1,400. Suspense was credited instead.</li><li>Credit purchases €11,000 — only the credit to creditors was posted. Missing: Dr Purchases €11,000. Suspense was credited instead.</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Identify the suspense balance.</strong> The suspense is hiding inside the €126,700 General Factory Overheads line. The two errors both credited suspense (€1,400 + €11,000 = €12,400 on the credit side of suspense)."
        },
        "accts": [
          {
            "n": "Suspense A/C (implied)",
            "d": [],
            "c": [
              {
                "x": "From discount error",
                "v": "1,400",
                "h": "a"
              },
              {
                "x": "From purchases error",
                "v": "11,000",
                "h": "a"
              },
              {
                "x": "Total Cr balance",
                "v": "12,400",
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
          "t": "warning",
          "tx": "<strong>Step 2 — Correct General Factory Overheads.</strong> The €126,700 TB figure is overstated by the €12,400 suspense balance. True overheads = €126,700 − €1,400 − €11,000 = <strong>€114,300</strong>."
        },
        "accts": [
          {
            "n": "General Factory O/H A/C",
            "d": [
              {
                "x": "Per TB (contaminated)",
                "v": "126,700"
              }
            ],
            "c": [
              {
                "x": "Remove discount suspense",
                "v": "1,400",
                "h": "r"
              },
              {
                "x": "Remove purchases suspense",
                "v": "11,000",
                "h": "r"
              },
              {
                "x": "Balance → Mfg A/c",
                "v": "114,300",
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
          "tx": "<strong>Step 3 — Correct Purchases.</strong> The €11,000 credit purchases were never debited to Purchases. Add them now: €760,400 + €11,000 = €771,400. (Will be reduced again in Note 7 for store materials.)"
        },
        "accts": [
          {
            "n": "Purchases A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "760,400"
              },
              {
                "x": "Add credit purchases (suspense)",
                "v": "11,000",
                "h": "g"
              },
              {
                "x": "Interim total",
                "v": "771,400",
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
          "tx": "<strong>Step 4 — Correct Creditors.</strong> Discount received (€1,400) reduces Creditors. TB shows €61,400; after correction: €61,400 − €1,400 = <strong>€60,000</strong>."
        },
        "accts": [
          {
            "n": "Creditors A/C",
            "d": [
              {
                "x": "Discount received (missed)",
                "v": "1,400",
                "h": "r"
              },
              {
                "x": "Balance → BS",
                "v": "60,000",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [
              {
                "x": "Per TB",
                "v": "61,400"
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
            "t": "trading",
            "l": "Mfg A/c",
            "x": "General Factory OH (corrected)",
            "v": "114,300"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Purchases RM (+11,000, feeds W1)",
            "v": "see W1"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Creditors (corrected)",
            "v": "60,000"
          }
        ],
        "nw": [
          "W3  General Factory OH: 126,700 − 1,400 − 11,000 = 114,300",
          "W1  Purchases: 760,400 + 11,000 − 62,000 = 709,400",
          "W21 Creditors: 61,400 − 1,400 = 60,000"
        ],
        "trap": "<strong>Suspense hidden in another line:</strong> The question says suspense is \"included\" in General Factory OH. The TB figure is the REAL overhead PLUS the suspense. You must subtract the corrections to get the real figure."
      }
    ]
  },
  {
    "num": 6,
    "marks": 4,
    "title": "Wage Increase Backdated",
    "noteText": "Provide for a <strong>recent wage increase of 2%</strong> to be <strong>backdated to cover the three months from 01/10/2021</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Direct factory wages</td><td>148,000</td></tr></table>",
    "task": "<p>Calculate a wage accrual of 2% × 3/12 × €148,000 = <strong>€740</strong>. The accrual goes to both Direct Wages (expense up) and Wages Due (liability up).</p>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate the accrual.</strong> 2% rise on 3 months of wages: €148,000 × 2% × 3/12 = <strong>€740</strong>."
        },
        "accts": [
          {
            "n": "Wage Accrual Calculation",
            "d": [
              {
                "x": "Annual wages (TB)",
                "v": "148,000"
              },
              {
                "x": "Rise %",
                "v": "× 2%"
              },
              {
                "x": "Months backdated",
                "v": "× 3/12"
              },
              {
                "x": "Accrual",
                "v": "740",
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
          "tx": "<strong>Step 2 — Process the double entry.</strong> Dr Wages €740 (expense up). Cr Wages Due €740 (current liability). Interim total = €148,740 (will be further adjusted in Note 7 for store wages)."
        },
        "accts": [
          {
            "n": "Direct Factory Wages",
            "d": [
              {
                "x": "Per TB",
                "v": "148,000"
              },
              {
                "x": "Accrual (2% × 3/12)",
                "v": "740",
                "h": "g"
              },
              {
                "x": "Interim total",
                "v": "148,740",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          },
          {
            "n": "Wages Due A/C",
            "d": [],
            "c": [
              {
                "x": "2% × 3/12 accrual",
                "v": "740",
                "h": "g",
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
          "tx": "<strong>Where everything goes.</strong> (Note 7 will further reduce wages by the store labour.)"
        },
        "dests": [
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Direct Wages +740 (before Note 7)",
            "v": "see W2"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Wages due (Current Liability)",
            "v": "740"
          }
        ],
        "nw": [
          "W2  Direct wages interim: 148,000 + 740 = 148,740",
          "Final in Note 7: 148,740 − 60,300 = 88,440"
        ],
        "trap": "<strong>Only 3 months, not the whole year.</strong> The rise is backdated 3 months (Oct–Dec). Workers are owed an extra 2% for the 3 months already worked, NOT for the entire year."
      }
    ]
  },
  {
    "num": 7,
    "marks": 14,
    "title": "Store Built by Own Employees",
    "noteText": "During 2021 a store was built by the firm's own employees. The cost of their labour <strong>€60,000 (before wage increase)</strong> had been treated as a business expense and the materials costing <strong>€62,000</strong> were taken from the firm's stocks. The building work commenced on 01/01/2021 and took 12 months to complete. <strong>No entry had been made in the books for the store.</strong>",
    "tbLook": "<p>This adjustment pulls costs OUT of the Manufacturing account and CAPITALISES them as a fixed asset. It affects Direct Wages, Purchases of Raw Materials, and Buildings Cost.</p>",
    "task": "<p><strong>Three entries:</strong></p><ol><li>Remove €60,000 (+2% accrual = €60,300) from Direct Wages</li><li>Remove €62,000 from Raw Material Purchases</li><li>Add total (€122,300) to Buildings Cost as a capital addition</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Calculate the store labour cost with accrual.</strong> €60,000 × 2% × 3/12 = €300 additional accrual on the store workers. Total store labour = <strong>€60,300</strong>."
        },
        "accts": [
          {
            "n": "Store Labour Cost",
            "d": [
              {
                "x": "Labour (before rise)",
                "v": "60,000"
              },
              {
                "x": "+ 2% × 3/12 accrual on store",
                "v": "300",
                "h": "g"
              },
              {
                "x": "Total store labour",
                "v": "60,300",
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
          "tx": "<strong>Step 2 — Remove labour from Direct Wages.</strong> Cr Direct Wages €60,300 (those workers were building a store, not making products). €148,740 − €60,300 = <strong>€88,440</strong>."
        },
        "accts": [
          {
            "n": "Direct Factory Wages A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "148,000"
              },
              {
                "x": "Accrual (N6)",
                "v": "740",
                "h": "g"
              }
            ],
            "c": [
              {
                "x": "Less: store workers",
                "v": "60,300",
                "h": "r"
              },
              {
                "x": "Final → Mfg A/c",
                "v": "88,440",
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
          "tx": "<strong>Step 3 — Remove materials from Purchases.</strong> Cr Purchases €62,000. Those materials went INTO the store, not into production. Purchases total = €760,400 + €11,000 − €62,000 = <strong>€709,400</strong>."
        },
        "accts": [
          {
            "n": "Purchases A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "760,400"
              },
              {
                "x": "Credit purchases (N5)",
                "v": "11,000",
                "h": "g"
              }
            ],
            "c": [
              {
                "x": "Less: store materials",
                "v": "62,000",
                "h": "r"
              },
              {
                "x": "Final → Mfg A/c",
                "v": "709,400",
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
          "tx": "<strong>Step 4 — Capitalise to Buildings.</strong> Dr Buildings €122,300 (€60,300 labour + €62,000 materials). The store is a new fixed asset built in-house. Buildings cost = €890,000 + €122,300 = <strong>€1,012,300</strong>."
        },
        "accts": [
          {
            "n": "Factory Buildings A/C",
            "d": [
              {
                "x": "Per TB",
                "v": "890,000"
              },
              {
                "x": "+ Store labour (capitalised)",
                "v": "60,300",
                "h": "g"
              },
              {
                "x": "+ Store materials (capitalised)",
                "v": "62,000",
                "h": "g"
              },
              {
                "x": "New buildings cost",
                "v": "1,012,300",
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
            "l": "Mfg A/c",
            "x": "Direct Wages (final)",
            "v": "88,440"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Purchases RM (final)",
            "v": "709,400"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Buildings Cost",
            "v": "1,012,300"
          }
        ],
        "nw": [
          "W2  Wages: 148,000 + 740 − 60,300 = 88,440",
          "W1  Purchases: 760,400 + 11,000 − 62,000 = 709,400",
          "W14 Buildings cost: 890,000 + 60,300 + 62,000 = 1,012,300"
        ],
        "trap": "<strong>Capitalising own work:</strong> When a business uses its own employees and materials to build a fixed asset, those costs must be moved from the P&L (expenses) to the Balance Sheet (assets). The asset will then be depreciated over its useful life. The store labour also attracts the 2% accrual (€300), so the full labour is €60,300, not €60,000."
      }
    ]
  },
  {
    "num": 8,
    "marks": 12,
    "title": "Bank Reconciliation",
    "noteText": "The figure for bank in the trial balance has been taken from the firm's own records. However, a bank statement dated 31/12/2021 shows an overdraft of <strong>€76,200</strong>. A comparison of the bank account and the bank statement revealed the following discrepancies: (1) A credit transfer for <strong>€3,500</strong> had been received on 31/12/2021 in respect of a debtor who has recently been declared bankrupt. This represents a first and final payment of <strong>70c for every €1 owed</strong>. (2) A cheque for <strong>€6,300</strong> received from a debtor had been entered in the books as <strong>€5,700</strong>. (3) A cheque for fees of <strong>€4,700</strong> issued to a creditor had not been presented for payment by 31/12/2021.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Cr</th></tr><tr><td>Bank</td><td>85,000</td></tr></table><p>Bank is on the credit side = <strong>overdraft of €85,000</strong> per the firm's records.</p>",
    "task": "<p><strong>Reconcile to find the corrected bank balance.</strong> Three discrepancies affect different accounts: the firm's bank, debtors, and bad debts. The unpresented cheque (€4,700) affects the bank statement side only — no adjustment in the firm's books.</p>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Credit transfer €3,500 (bankrupt debtor).</strong> The €3,500 is in the bank statement but not the books. It represents 70c on the €, so original debt = €3,500 ÷ 0.70 = <strong>€5,000</strong>. Bad debt written off = €1,500 (30% uncollected)."
        },
        "accts": [
          {
            "n": "Bankrupt Debtor Recovery",
            "d": [
              {
                "x": "Recovered (70c on €1)",
                "v": "3,500"
              },
              {
                "x": "Recovery rate",
                "v": "÷ 0.70"
              },
              {
                "x": "Original debt",
                "v": "5,000",
                "h": "b"
              },
              {
                "x": "Bad debt (30%)",
                "v": "1,500",
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
          "tx": "<strong>Step 2 — Cheque error €6,300 vs €5,700.</strong> The firm recorded the received cheque as €5,700 instead of €6,300. They understated the reduction in debtors by €600. Correction: reduce Debtors by another €600."
        },
        "accts": [
          {
            "n": "Debtors A/C — Cheque Error",
            "d": [],
            "c": [
              {
                "x": "Understated reduction",
                "v": "600",
                "h": "r",
                "tot": 1
              }
            ],
            "s": "c"
          }
        ]
      },
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 3 — Corrected bank balance — Approach 1.</strong> Start from the firm's books (€85,000 overdraft). Deduct €3,500 (credit transfer reduces the overdraft). Deduct €600 (cheque received but under-recorded). Final: €85,000 − €3,500 − €600 = <strong>€80,900 OD</strong>."
        },
        "accts": [
          {
            "n": "Bank A/C — From Firm Side",
            "d": [
              {
                "x": "Per firm's books (OD)",
                "v": "85,000"
              }
            ],
            "c": [
              {
                "x": "Credit transfer received",
                "v": "3,500",
                "h": "g"
              },
              {
                "x": "Cheque under-recorded",
                "v": "600",
                "h": "g"
              },
              {
                "x": "Corrected balance (OD)",
                "v": "80,900",
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
          "tx": "<strong>Step 4 — Approach 2 (reconciliation check).</strong> Start from the bank statement (€76,200 overdraft). Add back the unpresented cheque (€4,700) — not yet shown on statement. €76,200 + €4,700 = <strong>€80,900 OD</strong>. ✓ Both approaches must agree."
        },
        "accts": [
          {
            "n": "Bank A/C — From Statement Side",
            "d": [
              {
                "x": "Per bank statement (OD)",
                "v": "76,200"
              },
              {
                "x": "+ Unpresented cheque",
                "v": "4,700",
                "h": "g"
              },
              {
                "x": "Reconciled balance (OD)",
                "v": "80,900",
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
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Bank (corrected OD) — Current Liab",
            "v": "80,900"
          },
          {
            "t": "pnl",
            "l": "S&D",
            "x": "Bad debt (30% of €5,000)",
            "v": "1,500"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Debtors: −€5,000 bankrupt −€600 error",
            "v": "see W18"
          }
        ],
        "nw": [
          "W20 Bank: 85,000 − 3,500 − 600 = 80,900 (firm side)",
          "W20 Bank: 76,200 + 4,700 = 80,900 (statement side)",
          "W10 Bad debt: 5,000 × 30% = 1,500",
          "W18 Debtors: 76,350 + 10,800 − 5,000 − 600 = 81,550"
        ],
        "trap": "<strong>Unpresented cheques don't change the firm's books.</strong> The firm has already entered them correctly — the bank is just slow to process them. Only adjust for errors ON THE FIRM'S SIDE (credit transfers received but not posted, recording mistakes). The statement side uses the unpresented cheques only as a reconciliation check."
      }
    ]
  },
  {
    "num": 9,
    "marks": 12,
    "title": "End Adjustments (Investment Income, BDP, Buildings Depn)",
    "noteText": "Provision should be made for the following: (1) <strong>Investment income due</strong> and <strong>debenture interest due</strong>. (2) Provision for bad debts to be adjusted to <strong>4% of debtors</strong>. (3) Depreciation on buildings at a rate of <strong>2% of cost per annum</strong>.",
    "tbLook": "<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>4% Investments (01/04/2021)</td><td>250,000</td><td></td></tr><tr><td>Investment interest received</td><td></td><td>2,800</td></tr><tr><td>8% Debentures (incl €50,000 issued 01/04/2021)</td><td></td><td>300,000</td></tr><tr><td>Debenture interest paid</td><td>5,000</td><td></td></tr><tr><td>Bad debt provision</td><td></td><td>3,050</td></tr></table>",
    "task": "<p><strong>Four sub-calculations:</strong></p><ol><li>Investment income — 9 months (Apr–Dec)</li><li>Debenture interest — full year, split by issue date</li><li>BDP adjustment to 4% of adjusted debtors</li><li>Buildings depreciation on revised cost (after Note 7)</li></ol>",
    "steps": [
      {
        "expl": {
          "t": "info",
          "tx": "<strong>Step 1 — Investment income.</strong> Investments €250,000 at 4%, held from 01/04/2021 (9 months). €250,000 × 4% × 9/12 = <strong>€7,500</strong>. Received so far: €2,800. Due = €4,700."
        },
        "accts": [
          {
            "n": "Investment Income",
            "d": [
              {
                "x": "9 months: 250k × 4% × 9/12",
                "v": "7,500",
                "h": "g"
              },
              {
                "x": "Less: received (TB)",
                "v": "(2,800)",
                "h": "a"
              },
              {
                "x": "Income due (CA)",
                "v": "4,700",
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
          "tx": "<strong>Step 2 — Debenture interest.</strong> Split by issue date: €250,000 for 3 months (Jan–Mar) + €300,000 for 9 months (Apr–Dec). €250,000 × 8% × 3/12 = €5,000. €300,000 × 8% × 9/12 = €18,000. Total = <strong>€23,000</strong>. Paid = €5,000. Due = €18,000."
        },
        "accts": [
          {
            "n": "Debenture Interest",
            "d": [
              {
                "x": "3 months: 250k × 8% × 3/12",
                "v": "5,000",
                "h": "b"
              },
              {
                "x": "9 months: 300k × 8% × 9/12",
                "v": "18,000",
                "h": "g"
              },
              {
                "x": "TOTAL for year",
                "v": "23,000",
                "h": "a"
              },
              {
                "x": "Less: paid (TB)",
                "v": "(5,000)"
              },
              {
                "x": "Interest due (CL)",
                "v": "18,000",
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
          "tx": "<strong>Step 3 — Bad debts provision.</strong> First find adjusted debtors (W18): €76,350 + €10,800 − €5,000 − €600 = €81,550. New BDP = €81,550 × 4% = <strong>€3,262</strong>. Increase = €3,262 − €3,050 = <strong>€212</strong>."
        },
        "accts": [
          {
            "n": "BDP Working",
            "d": [
              {
                "x": "Adjusted debtors",
                "v": "81,550"
              },
              {
                "x": "× 4%",
                "v": "× 4%"
              },
              {
                "x": "New BDP",
                "v": "3,262",
                "h": "b"
              },
              {
                "x": "Less: old BDP (TB)",
                "v": "(3,050)"
              },
              {
                "x": "Increase → S&D",
                "v": "212",
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
          "tx": "<strong>Step 4 — Buildings depreciation.</strong> Use the REVISED cost (€1,012,300 from Note 7), not the TB figure. €1,012,300 × 2% = <strong>€20,246</strong>. Factory buildings → Mfg A/c (Factory OH)."
        },
        "accts": [
          {
            "n": "Buildings Depn",
            "d": [
              {
                "x": "Revised cost (N7)",
                "v": "1,012,300"
              },
              {
                "x": "× 2%",
                "v": "× 2%"
              },
              {
                "x": "Depn → Mfg Factory OH",
                "v": "20,246",
                "h": "b",
                "tot": 1
              }
            ],
            "c": [],
            "s": "d"
          },
          {
            "n": "Buildings Acc Depn",
            "d": [],
            "c": [
              {
                "x": "Per TB (opening)",
                "v": "25,000"
              },
              {
                "x": "Current year",
                "v": "20,246",
                "h": "g"
              },
              {
                "x": "Closing balance → BS",
                "v": "45,246",
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
            "x": "Investment income (Other Income)",
            "v": "7,500"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Investment income due (CA)",
            "v": "4,700"
          },
          {
            "t": "pnl",
            "l": "P&L",
            "x": "Debenture interest (Financial)",
            "v": "23,000"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Debenture interest due (CL)",
            "v": "18,000"
          },
          {
            "t": "pnl",
            "l": "S&D",
            "x": "BDP increase",
            "v": "212"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "BDP (deducted from Debtors)",
            "v": "3,262"
          },
          {
            "t": "trading",
            "l": "Mfg A/c",
            "x": "Buildings depn (Factory OH)",
            "v": "20,246"
          },
          {
            "t": "bs",
            "l": "Bal Sheet",
            "x": "Buildings Acc Depn",
            "v": "45,246"
          }
        ],
        "nw": [
          "W12 Inv income: 250,000 × 4% × 9/12 = 7,500",
          "W19 Inv due: 7,500 − 2,800 = 4,700",
          "W13 Deb int: (250,000 × 8% × 3/12) + (300,000 × 8% × 9/12) = 5,000 + 18,000 = 23,000",
          "W22 Deb int due: 23,000 − 5,000 = 18,000",
          "W11 BDP: 81,550 × 4% = 3,262; increase 3,262 − 3,050 = 212",
          "W6  Buildings depn: 1,012,300 × 2% = 20,246",
          "W15 Buildings AD: 25,000 + 20,246 = 45,246"
        ],
        "trap": "<strong>Watch which account gets which section:</strong> Investment income → P&L Other Income. Debenture interest → P&L Financial Expenses (own section). BDP increase → S&D. Buildings depreciation → Mfg A/c Factory OH (NOT the P&L, because the buildings are factory buildings)."
      }
    ]
  }
];

export const MFG_TPL_STEPS_NEW: BuilderStep[] = [
  {
    "title": "Raw Materials Consumed",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Manufacturing Account of McGuigan Ltd — y/e 31/12/2021</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Opening stock of raw materials</td><td class=\"amt\">27,300</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">+ Purchases of raw materials <span class=\"wtag\">W1</span></td><td class=\"amt\">709,400</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Closing stock of raw materials</td><td class=\"amt\">(28,300)</td><td></td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Cost of Raw Materials Consumed</td><td></td><td class=\"amt\">708,400</td></tr>"
    ],
    "source": "<strong>Opening stock €27,300</strong> from TB. <strong>Purchases €709,400</strong> (W1) = TB €760,400 + €11,000 (suspense) − €62,000 (store materials). <strong>Closing stock €28,300</strong> from Note 1.",
    "reason": "The Manufacturing Account starts with raw materials consumed — the same logic as Cost of Goods Sold but for raw materials. Opening + Purchases − Closing = Consumed.",
    "watch": "<strong>Don't forget the store materials adjustment.</strong> The €62,000 of materials used to build the store are NOT part of production — they became a fixed asset. Miss this and purchases is €62,000 too high."
  },
  {
    "title": "Direct Costs and Prime Cost",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Direct Costs</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Direct factory wages <span class=\"wtag\">W2</span></td><td class=\"amt\">88,440</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Royalties <span class=\"wtag\">TB</span></td><td class=\"amt\">29,600</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Hire of special equipment <span class=\"wtag\">TB</span></td><td class=\"amt\">37,800</td><td class=\"amt\">155,840</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Prime Cost</td><td></td><td class=\"amt\">864,240</td></tr>"
    ],
    "source": "<strong>Factory wages €88,440</strong> (W2) = €148,000 + €740 (2% accrual) − €60,300 (store labour). <strong>Royalties €29,600</strong> and <strong>Hire €37,800</strong> from TB.",
    "reason": "Prime Cost = Raw Materials Consumed + all Direct Costs. Royalties and hire of special equipment vary directly with output, so they're direct costs.",
    "tip": "<strong>Royalties are ALWAYS direct:</strong> paid per unit produced or as a % of sales, so they vary with output. They always sit in the prime cost section."
  },
  {
    "title": "Factory Overheads",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Factory Overheads</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">General factory overhead <span class=\"wtag\">W3</span></td><td class=\"amt\">114,300</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Depreciation of plant &amp; machinery <span class=\"wtag\">W4</span></td><td class=\"amt\">47,625</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Loss on disposal of machine <span class=\"wtag\">W5</span></td><td class=\"amt\">2,375</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Depreciation on factory buildings <span class=\"wtag\">W6</span></td><td class=\"amt\">20,246</td><td class=\"amt\">184,546</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td></td><td class=\"amt\">1,048,786</td></tr>"
    ],
    "source": "<strong>General Factory OH €114,300</strong> (W3) = €126,700 − €1,400 (discount suspense) − €11,000 (purchases suspense). <strong>Plant depn €47,625</strong> (W4). <strong>Loss €2,375</strong> (W5). <strong>Buildings depn €20,246</strong> (W6) = €1,012,300 × 2%.",
    "reason": "Factory overheads are indirect factory costs. Prime Cost + Factory Overheads = total factory costs for the period. Running total: <strong>€1,048,786</strong>.",
    "watch": "<strong>The loss on the machine goes here, not in TPL.</strong> It was a factory asset. Same rule: depreciation on factory buildings also goes here, not in TPL Admin expenses."
  },
  {
    "title": "WIP Adjustment & Sale of Scrap",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">+ Opening stock of Work in Progress</td><td class=\"amt\">38,650</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Closing stock of Work in Progress</td><td class=\"amt\">(27,600)</td><td class=\"amt\">11,050</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td></td><td class=\"amt\">1,059,836</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Sale of scrap <span class=\"wtag\">W7</span></td><td></td><td class=\"amt\">(11,950)</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">Cost of Manufacture</td><td></td><td class=\"amt\">1,047,886</td></tr>"
    ],
    "source": "<strong>Opening WIP €38,650</strong>, <strong>Closing WIP €27,600</strong>. <strong>Sale of scrap €11,950</strong> (W7) = TB €18,950 − €7,000 (machine disposal).",
    "reason": "WIP adjustment converts \"factory costs incurred\" into \"factory costs of goods completed\". Sale of scrap is a recovery of production cost. Cost of Manufacture = 1,048,786 + 11,050 − 11,950 = <strong>€1,047,886</strong>.",
    "tip": "<strong>Scrap reduces cost of manufacture:</strong> scrap sales are treated as a recovery of production costs, not as income. That's why they go in the Mfg A/c, not the TPL."
  },
  {
    "title": "Sales and Cost of Sales",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Trading, Profit &amp; Loss Account</td></tr>",
      "<tr><td class=\"lbl\">Sales <span class=\"wtag\">W8</span></td><td></td><td class=\"amt\">1,660,800</td></tr>",
      "<tr class=\"heading\"><td colspan=\"3\">Less Cost of Sales</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Opening stock of finished goods</td><td class=\"amt\">38,400</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">+ Cost of Manufacture</td><td class=\"amt\">1,047,886</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Closing stock of finished goods <span class=\"wtag\">W9</span></td><td class=\"amt\">(49,000)</td><td class=\"amt\">(1,037,286)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Gross Profit</td><td></td><td class=\"amt\">623,514</td></tr>"
    ],
    "source": "<strong>Sales €1,660,800</strong> (W8) = €1,650,000 + €10,800 (undispatched sale, N2). <strong>Opening FG €38,400</strong> from TB. <strong>Closing FG €49,000</strong> (W9) = €58,000 − €9,000.",
    "reason": "Cost of Manufacture REPLACES Purchases in the Trading section. Opening FG + Cost of Manufacture − Closing FG = Cost of Sales. GP = €1,660,800 − €1,037,286 = <strong>€623,514</strong>.",
    "watch": "<strong>Closing FG is €49,000, not €58,000.</strong> The €9,000 undispatched goods (N2) were removed because they've been recognised as sold."
  },
  {
    "title": "Selling &amp; Distribution Expenses",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Less Expenses — Selling &amp; Distribution</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Bad debt <span class=\"wtag\">W10</span></td><td class=\"amt\">1,500</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Selling expenses <span class=\"wtag\">TB</span></td><td class=\"amt\">45,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Increase in bad debts provision <span class=\"wtag\">W11</span></td><td class=\"amt\">212</td><td class=\"amt\">46,712</td></tr>"
    ],
    "source": "<strong>Bad debt €1,500</strong> (W10) = €5,000 × 30%. <strong>Selling expenses €45,000</strong> from TB. <strong>BDP increase €212</strong> (W11).",
    "reason": "S&D costs are the costs of selling finished goods. Bad debts, BDP adjustments and selling expenses all belong here.",
    "tip": "<strong>Bad debt vs BDP:</strong> The bad debt (€1,500) is a specific write-off. The BDP increase (€212) is a general allowance adjustment. Both go in S&D."
  },
  {
    "title": "Administration Expenses",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Administration Expenses</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Administration expenses <span class=\"wtag\">TB</span></td><td class=\"amt\">57,900</td><td class=\"amt\">57,900</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Total Expenses</td><td></td><td class=\"amt\">(104,612)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\"></td><td></td><td class=\"amt\">518,902</td></tr>"
    ],
    "source": "<strong>Administration expenses €57,900</strong> from TB. Total Expenses = S&D €46,712 + Admin €57,900 = <strong>€104,612</strong>.",
    "reason": "Administration expenses are the general running costs of the OFFICE, not the factory (those are in the Mfg A/c). GP − Total Expenses = €623,514 − €104,612 = <strong>€518,902</strong>.",
    "watch": "<strong>Factory costs are all in the Mfg A/c.</strong> Only office-related costs appear here. This is the cleanest separation: Mfg A/c = factory, TPL Admin = office."
  },
  {
    "title": "Other Income (after Total Expenses)",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"3\">Add Other Income</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Rent received <span class=\"wtag\">TB</span></td><td class=\"amt\">15,700</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Discount received <span class=\"wtag\">TB</span></td><td class=\"amt\">5,350</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Investment income <span class=\"wtag\">W12</span></td><td class=\"amt\">7,500</td><td class=\"amt\">28,550</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Operating Profit</td><td></td><td class=\"amt\">547,452</td></tr>"
    ],
    "source": "<strong>Rent received €15,700</strong> + <strong>Discount received €5,350</strong> from TB. <strong>Investment income €7,500</strong> (W12) = €250,000 × 4% × 9/12.",
    "reason": "Other Income goes <strong>after Total Expenses</strong>, not before. Rent, discount received, and investment income are all non-trading income that adds to Operating Profit. Operating Profit = €518,902 + €28,550 = <strong>€547,452</strong>.",
    "tip": "<strong>Check the side:</strong> Discount was on the credit side of TB (income) → Other Income. If it were on the debit side it would be discount allowed (expense → S&D)."
  },
  {
    "title": "Debenture Interest & Net Profit",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Less Debenture interest <span class=\"wtag\">W13</span></td><td></td><td class=\"amt\">(23,000)</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">Net Profit</td><td></td><td class=\"amt\">524,452</td></tr>"
    ],
    "source": "<strong>Debenture interest €23,000</strong> (W13) = 3 months on €250,000 + 9 months on €300,000.",
    "reason": "Debenture interest is a financial expense — the cost of long-term borrowing. It sits after Operating Profit. Net Profit = €547,452 − €23,000 = <strong>€524,452</strong>.",
    "tip": "<strong>Mid-year debenture issue:</strong> €50,000 issued 01/04/2021. First 3 months only €250,000 outstanding; last 9 months €300,000. Interest calculated in two chunks."
  },
  {
    "title": "Retained Profit &amp; P&amp;L Balance",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Less Dividends paid <span class=\"wtag\">TB</span></td><td></td><td class=\"amt\">(27,500)</td></tr>",
      "<tr class=\"subtotal\"><td class=\"lbl\">Retained Profit</td><td></td><td class=\"amt\">496,952</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">+ P&amp;L balance 01/01/2021 <span class=\"wtag\">TB</span></td><td></td><td class=\"amt\">69,500</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">P&amp;L balance 31/12/2021</td><td></td><td class=\"amt\">566,452</td></tr>"
    ],
    "source": "<strong>Dividends €27,500</strong> from TB. <strong>Opening P&L balance €69,500</strong> from TB.",
    "reason": "This is the company-specific section: a company carries forward its accumulated P&L. Retained Profit = 524,452 − 27,500 = €496,952. Closing P&L = 496,952 + 69,500 = <strong>€566,452</strong>. This figure goes into the Capital section of the Balance Sheet.",
    "watch": "<strong>Dividends are NOT an expense.</strong> They're a distribution of profit to shareholders, deducted AFTER Net Profit. Never put dividends in the expenses section."
  }
];

export const MFG_BS_STEPS_NEW: BuilderStep[] = [
  {
    "title": "Tangible Fixed Assets — Header",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Balance Sheet of McGuigan Ltd as at 31/12/2021</td></tr>",
      "<tr class=\"heading\"><td colspan=\"4\">Tangible Fixed Assets</td></tr>",
      "<tr><td class=\"lbl\"></td><td class=\"amt\"><strong>Cost</strong></td><td class=\"amt\"><strong>Acc Dep</strong></td><td class=\"amt\"><strong>NBV</strong></td></tr>"
    ],
    "source": "Three-column layout: Cost, Accumulated Depreciation, NBV.",
    "reason": "In a manufacturing company, the main fixed assets are typically Factory Buildings and Plant & Machinery — both subject to depreciation.",
    "tip": "Marks are awarded for the cost and acc dep figures separately — show them clearly, not just the NBV."
  },
  {
    "title": "Factory Buildings",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Factory Buildings <span class=\"wtag\">W14, W15</span></td><td class=\"amt\">1,012,300</td><td class=\"amt\">45,246</td><td class=\"amt\">967,054</td></tr>"
    ],
    "source": "<strong>Cost €1,012,300</strong> (W14) = €890,000 + €122,300 (store: €60,300 labour + €62,000 materials). <strong>Acc Dep €45,246</strong> (W15) = €25,000 + €20,246.",
    "reason": "The store built in Note 7 becomes a capital addition to buildings. Depreciation is charged on the NEW cost (€1,012,300), not the old.",
    "watch": "<strong>Opening acc depn on buildings = €25,000</strong> (€890,000 cost − €865,000 NBV). Add current year €20,246 = €45,246."
  },
  {
    "title": "Plant &amp; Machinery",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Plant &amp; Machinery <span class=\"wtag\">W16, W17</span></td><td class=\"amt\">310,000</td><td class=\"amt\">77,000</td><td class=\"amt\">233,000</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td class=\"amt\"><strong>1,322,300</strong></td><td class=\"amt\"><strong>122,246</strong></td><td class=\"amt\"><strong>1,200,054</strong></td></tr>"
    ],
    "source": "<strong>Cost €310,000</strong> (W16) = €340,000 − €30,000 (old machine). <strong>Acc Dep €77,000</strong> (W17) = €50,000 + €47,625 − €20,625.",
    "reason": "When a fixed asset is disposed, BOTH its cost AND its accumulated depreciation are removed. The disposed machine had €20,625 acc depn that's no longer on the books.",
    "tip": "Total TFA NBV = 967,054 + 233,000 = <strong>€1,200,054</strong>."
  },
  {
    "title": "Financial Assets — Investments",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Financial Assets</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">4% Investments <span class=\"wtag\">TB</span></td><td></td><td></td><td class=\"amt\">250,000</td></tr>"
    ],
    "source": "<strong>€250,000</strong> from TB, at cost.",
    "reason": "Financial assets sit between tangible fixed assets and current assets.",
    "tip": "Running total: 1,200,054 + 250,000 = €1,450,054."
  },
  {
    "title": "Current Assets — Three Stocks",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Current Assets</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Closing stock — Raw Materials</td><td class=\"amt\">28,300</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Closing stock — Work in Progress</td><td class=\"amt\">27,600</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Closing stock — Finished Goods <span class=\"wtag\">W9</span></td><td class=\"amt\">49,000</td><td class=\"amt\">104,900</td><td></td></tr>"
    ],
    "source": "<strong>Raw €28,300</strong>, <strong>WIP €27,600</strong>, <strong>FG €49,000</strong> (€58,000 − €9,000 undispatched). Total = <strong>€104,900</strong>.",
    "reason": "This is the visual signature of a manufacturing BS: three separate stock lines in current assets. The sum becomes the stock total.",
    "watch": "<strong>All three must be shown separately.</strong> Combining them loses marks."
  },
  {
    "title": "Current Assets — Debtors",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Debtors <span class=\"wtag\">W18</span></td><td class=\"amt\">81,550</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">− Bad debts provision <span class=\"wtag\">W11</span></td><td class=\"amt\">(3,262)</td><td class=\"amt\">78,288</td><td></td></tr>"
    ],
    "source": "<strong>Debtors €81,550</strong> (W18) = €76,350 + €10,800 (N2) − €5,000 (N8 bankrupt) − €600 (N8 cheque error). <strong>BDP €3,262</strong> = €81,550 × 4%.",
    "reason": "Debtors is adjusted for Note 2 (+€10,800) and Note 8 (−€5,000 bankrupt, −€600 cheque error). BDP is then based on the ADJUSTED figure.",
    "watch": "<strong>BDP based on ADJUSTED debtors (€81,550), not TB debtors.</strong> €81,550 × 4% = €3,262."
  },
  {
    "title": "Current Assets — Investment Income Due",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Investment income due <span class=\"wtag\">W19</span></td><td></td><td class=\"amt\">4,700</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td></td><td class=\"amt\">187,888</td><td></td></tr>"
    ],
    "source": "<strong>Investment income due €4,700</strong> (W19) = €7,500 − €2,800.",
    "reason": "9 months of interest earned, but only €2,800 actually received. The rest (€4,700) sits as a receivable. Total CA = 104,900 + 78,288 + 4,700 = <strong>€187,888</strong>.",
    "tip": "Investments acquired 01/04/2021 = 9 months owned. Income is accrued for all 9 months; received is whatever the TB shows."
  },
  {
    "title": "Current Liabilities",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Less Creditors: amounts falling due within 1 year</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Bank <span class=\"wtag\">W20</span></td><td class=\"amt\">80,900</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Creditors <span class=\"wtag\">W21</span></td><td class=\"amt\">60,000</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">PAYE</td><td class=\"amt\">1,850</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Wages due</td><td class=\"amt\">740</td><td></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Debenture interest due <span class=\"wtag\">W22</span></td><td class=\"amt\">18,000</td><td class=\"amt\">(161,490)</td><td class=\"amt\">26,398</td></tr>"
    ],
    "source": "<strong>Bank €80,900</strong> (W20) overdraft. <strong>Creditors €60,000</strong> (W21). <strong>PAYE €1,850</strong> TB. <strong>Wages due €740</strong> (N6). <strong>Deb int due €18,000</strong> (W22).",
    "reason": "Five current liabilities. Working Capital = Current Assets − Current Liabilities = 187,888 − 161,490 = <strong>€26,398</strong>.",
    "watch": "<strong>Bank is a LIABILITY here</strong> because it's an overdraft (credit side of TB). After reconciliation it's still OD at €80,900."
  },
  {
    "title": "Financed By — Debentures",
    "rows": [
      "<tr class=\"subtotal\"><td class=\"lbl\"></td><td></td><td></td><td class=\"amt\">1,476,452</td></tr>",
      "<tr class=\"heading\"><td colspan=\"4\">Financed By</td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">8% Debentures <span class=\"wtag\">TB</span></td><td></td><td></td><td class=\"amt\">300,000</td></tr>"
    ],
    "source": "<strong>Debentures €300,000</strong> from TB. Total Net Assets so far = 1,200,054 + 250,000 + 26,398 = <strong>€1,476,452</strong>.",
    "reason": "Debentures are long-term loans. The interest DUE (€18,000) is in current liabilities; the principal (€300,000) is in the \"Financed By\" section.",
    "tip": "Same rule applies to any long-term loan: principal in \"Financed By\", interest due in current liabilities."
  },
  {
    "title": "Share Capital",
    "rows": [
      "<tr class=\"heading\"><td colspan=\"4\">Share Capital</td></tr>",
      "<tr><td class=\"lbl\"></td><td class=\"amt\"><strong>Authorised</strong></td><td class=\"amt\"><strong>Issued</strong></td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">Ordinary shares €1 each <span class=\"wtag\">TB</span></td><td class=\"amt\">1,500,000</td><td class=\"amt\">460,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\">4% Preference shares €1 each <span class=\"wtag\">TB</span></td><td class=\"amt\">500,000</td><td class=\"amt\">150,000</td><td></td></tr>",
      "<tr class=\"indent\"><td class=\"lbl\"></td><td class=\"amt\"><strong>2,000,000</strong></td><td class=\"amt\"><strong>610,000</strong></td><td></td></tr>"
    ],
    "source": "Authorised €2,000,000 from question intro. Issued: €460,000 ordinary + €150,000 preference = <strong>€610,000</strong> from TB.",
    "reason": "Authorised is a disclosure showing maximum shares the company CAN issue. Issued is what's actually in circulation. Only the Issued figure counts for Capital Employed.",
    "watch": "<strong>Never add the authorised figure to Capital Employed.</strong> Only the Issued €610,000 is real money raised."
  },
  {
    "title": "Revenue Reserve &amp; Capital Employed",
    "rows": [
      "<tr class=\"indent\"><td class=\"lbl\">Revenue Reserve / P&amp;L Balance 31/12/2021</td><td></td><td class=\"amt\">566,452</td><td class=\"amt\">1,176,452</td></tr>",
      "<tr class=\"total\"><td class=\"lbl\">Capital Employed</td><td></td><td></td><td class=\"amt\">1,476,452</td></tr>"
    ],
    "source": "<strong>P&L balance €566,452</strong> from TPL (after retained profit + opening balance). Capital Employed = Debentures €300,000 + Issued SC €610,000 + P&L €566,452 = <strong>€1,476,452</strong>.",
    "reason": "The P&L balance represents accumulated undistributed profits — owned by the shareholders, so in the \"Financed By\" section with share capital.",
    "watch": "<strong>FINAL CHECK:</strong> Capital Employed €1,476,452 = Total Net Assets €1,476,452 ✓."
  },
  {
    "title": "Final Verification",
    "rows": [],
    "source": "<strong>Total Net Assets = €1,476,452 = Capital Employed = €1,476,452</strong> ✓",
    "reason": "All 22 workings placed. Cost of Manufacture: €1,047,886. Net Profit: €524,452. Retained Profit: €496,952. P&L balance 31/12/2021: €566,452.",
    "tip": "<strong>If your two totals don't match</strong> for Manufacturing: (1) forgot to capitalise the store, (2) double-counted the scrap, (3) wrong BDP on TB debtors, (4) bank reconciliation wrong, (5) debenture interest calculated on wrong balance."
  }
];
