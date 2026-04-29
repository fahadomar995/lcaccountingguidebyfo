import fs from 'fs';
import path from 'path';

const root = '/dev-server/src/data';

// 1) Theory bank — Q/A across all topics
const theoryRaw = fs.readFileSync(path.join(root, 'theory.ts'), 'utf8');
const flashRaw = theoryRaw; // same file holds FLASHCARDS

// Extract THEORY_BANK entries via simple regex on object literals
const bankItems = [];
const objRegex = /\{topic:"([^"]+)",year:(\d+),marks:(\d+),tags:\[([^\]]*)\],q:"((?:[^"\\]|\\.)*)",a:"((?:[^"\\]|\\.)*)"\}/g;
let m;
while ((m = objRegex.exec(theoryRaw)) !== null) {
  bankItems.push({
    topic: m[1], year: +m[2], marks: +m[3],
    q: m[5].replace(/\\n/g,' ').replace(/\\"/g,'"'),
    a: m[6].replace(/\\n/g,' ').replace(/\\"/g,'"'),
  });
}
console.error('theory bank items:', bankItems.length);

// 2) Learn modules — strip HTML
const learnDir = path.join(root, 'learn');
const learnFiles = ['errors','club','service','published','cashflow','approach-q1','approach-q4','approach-q5','exam-technique'];
const learnSummaries = {};
for (const f of learnFiles) {
  const p = path.join(learnDir, `${f}.ts`);
  if (!fs.existsSync(p)) continue;
  const raw = fs.readFileSync(p, 'utf8');
  // Strip HTML tags, take text only
  const stripped = raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/data-correct="[^"]*"/g, '')
    .replace(/data-target="[^"]*"/g, '')
    .replace(/data-answer="[^"]*"/g, '')
    .replace(/[`'"\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Take only meaningful chunks (longer than 40 chars, skip identifier lists)
  learnSummaries[f] = stripped.slice(0, 8000);
}

// 3) Build the compact digest
let digest = `# LEAVING CERT HIGHER LEVEL ACCOUNTING (2026) — COURSE KNOWLEDGE BASE\n\n`;
digest += `## EXAM STRUCTURE\n`;
digest += `Paper is 3 hours (180 min), 400 marks. Section 1 = Question 1 (Final Accounts of a Sole Trader, 120 marks, ~75 min). Section 2 = Q2-Q7 — choose 2 from Club, Manufacturing, Service Firm, Tabular Statements, Cash Flow, Published Accounts, Departmental, Farm, Correction of Errors, Incomplete Records, Interpretation (60 marks each). Section 3 = Q8 (Costing) and Q9 (Budgeting) — choose 1 (80 marks).\n\n`;

// Group bank by topic
const byTopic = {};
for (const it of bankItems) {
  byTopic[it.topic] ??= [];
  byTopic[it.topic].push(it);
}

digest += `## TOPIC-BY-TOPIC THEORY (verified SEC marking-scheme answers)\n\n`;
for (const topic of Object.keys(byTopic)) {
  digest += `### ${topic}\n`;
  for (const q of byTopic[topic]) {
    digest += `Q (${q.year}, ${q.marks}m): ${q.q}\nA: ${q.a}\n\n`;
  }
}

digest += `## FINAL-ACCOUNTS METHOD NOTES\n\n`;
const labels = {
  errors:'Correction of Errors',club:'Club Accounts',service:'Service Firms',
  published:'Published Accounts',cashflow:'Cash Flow Statements',
  'approach-q1':'Q1 Sole Trader Approach','approach-q4':'Q4 Approach','approach-q5':'Q5 Interpretation Approach',
  'exam-technique':'Exam Technique'
};
for (const f of Object.keys(learnSummaries)) {
  digest += `### ${labels[f] || f}\n${learnSummaries[f]}\n\n`;
}

fs.writeFileSync('/tmp/digest.txt', digest);
console.error('digest length:', digest.length, 'chars');
