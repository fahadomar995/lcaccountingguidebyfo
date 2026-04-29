import fs from 'fs';
const txt = fs.readFileSync('/tmp/digest.txt','utf8');
// Escape for a TS template literal
const escaped = txt.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
const out = `// AUTO-GENERATED from src/data/theory.ts and src/data/learn/* — see scripts/build-tutor-digest.mjs
// This is the authoritative course content used to ground the AI tutor.
export const COURSE_DIGEST = \`${escaped}\`;
`;
fs.writeFileSync('/dev-server/supabase/functions/ai-tutor/courseDigest.ts', out);
console.log('wrote', out.length, 'chars');
