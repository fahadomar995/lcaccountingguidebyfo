export interface PaperDocument {
  label: string;
  filename: string;
}

export interface PaperEntry {
  year: number;
  type: "sec" | "mock";
  source: string;
  documents: PaperDocument[];
}

export const PAST_PAPERS: PaperEntry[] = [
  // SEC Papers (scaffolded — add filenames when PDFs are dropped in)
  ...[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005].map(
    (year): PaperEntry => ({
      year,
      type: "sec",
      source: "SEC",
      documents: [
        // Uncomment and set filename when PDFs are added:
        // { label: "Exam Paper", filename: `sec-${year}-paper.pdf` },
        // { label: "Marking Scheme", filename: `sec-${year}-ms.pdf` },
      ],
    })
  ),
  // Mock Papers
  { year: 2026, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2026-paper.pdf" }] },
  { year: 2025, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2025-paper.pdf" }] },
  { year: 2024, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2024-paper.pdf" }] },
  { year: 2023, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2023-paper.pdf" }] },
  { year: 2022, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2022-paper.pdf" }] },
  { year: 2021, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2021-paper.pdf" }] },
  { year: 2020, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2020-paper.pdf" }] },
];
