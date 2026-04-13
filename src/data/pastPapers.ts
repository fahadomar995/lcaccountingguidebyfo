export interface PaperDocument {
  label: string;
  filename?: string;
  externalUrl?: string;
}

export interface PaperEntry {
  year: number;
  type: "sec" | "mock";
  source: string;
  documents: PaperDocument[];
}

const SEC_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005];

export const PAST_PAPERS: PaperEntry[] = [
  // SEC Papers — linked to examinations.ie
  ...SEC_YEARS.map(
    (year): PaperEntry => ({
      year,
      type: "sec",
      source: "SEC",
      documents: [
        { label: "Exam Paper", externalUrl: `https://www.examinations.ie/archive/exampapers/${year}/LC003ALP100EV.pdf` },
        { label: "Marking Scheme", externalUrl: `https://www.examinations.ie/archive/markingschemes/${year}/LC003ALP100EV.pdf` },
      ],
    })
  ),
  // Mock Papers — hosted locally
  { year: 2026, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2026-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2026-ms.pdf" }] },
  { year: 2025, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2025-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2025-ms.pdf" }] },
  { year: 2024, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2024-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2024-ms.pdf" }] },
  { year: 2023, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2023-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2023-ms.pdf" }] },
  { year: 2022, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2022-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2022-ms.pdf" }] },
  { year: 2021, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2021-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2021-ms.pdf" }] },
  { year: 2020, type: "mock", source: "Mock", documents: [{ label: "Exam Paper", filename: "mock-2020-paper.pdf" }, { label: "Marking Scheme", filename: "mock-2020-ms.pdf" }] },
];
