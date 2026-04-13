import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search, X, BookOpen, Hash, FileText, Tag } from "lucide-react";
import Fuse from "fuse.js";
import { buildSearchIndex, type SearchableItem } from "@/data/theoryChapters";

interface Props {
  onSelect: (chapterId: number, sectionId?: string, subTopicId?: string) => void;
}

const TYPE_ICONS: Record<string, typeof Search> = { chapter: BookOpen, section: Hash, subtopic: FileText, keyterm: Tag };

export default function TheorySearch({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useLocalRecent();
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => buildSearchIndex(), []);
  const fuse = useMemo(() => new Fuse(index, {
    keys: [{ name: 'title', weight: 3 }, { name: 'body', weight: 1 }, { name: 'breadcrumb', weight: 1.5 }],
    threshold: 0.35,
    includeMatches: true,
    minMatchCharLength: 2,
  }), [index]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query.trim()).slice(0, 15);
  }, [query, fuse]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  const handleSelect = useCallback((item: SearchableItem) => {
    setRecent(prev => {
      const filtered = prev.filter(r => r.title !== item.title);
      return [item, ...filtered].slice(0, 5);
    });
    onSelect(item.chapterId, item.sectionId || undefined, item.subTopicId || undefined);
    setOpen(false);
    setQuery("");
  }, [onSelect, setRecent]);

  // Inline search bar (always visible)
  const inlineBar = (
    <div
      className="relative cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full hover:border-primary/40 transition-colors">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-light flex-1">Search chapters, sections, key terms...</span>
        <kbd className="hidden sm:inline-flex text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border">Ctrl+K</kbd>
      </div>
    </div>
  );

  if (!open) return inlineBar;

  return (
    <>
      {inlineBar}
      {/* Modal overlay */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
        <div className="w-full max-w-[560px] mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search chapters, sections, key terms..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <kbd className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[350px] overflow-y-auto">
            {query.trim() === "" ? (
              <>
                {recent.length > 0 && (
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1 mb-1">Recent</p>
                    {recent.map((item, i) => (
                      <ResultRow key={i} item={item} onSelect={handleSelect} />
                    ))}
                  </div>
                )}
                {recent.length === 0 && (
                  <div className="py-8 text-center">
                    <Search className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Start typing to search across all 24 chapters</p>
                  </div>
                )}
              </>
            ) : results.length > 0 ? (
              <div className="px-3 py-2">
                {results.map((r, i) => (
                  <ResultRow key={i} item={r.item} onSelect={handleSelect} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No results for "{query}"</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different term or browse the chapters below</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ResultRow({ item, onSelect }: { item: SearchableItem; onSelect: (i: SearchableItem) => void }) {
  const Icon = TYPE_ICONS[item.type] || FileText;
  return (
    <button
      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors group"
      onClick={() => onSelect(item)}
    >
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0 group-hover:text-primary" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate group-hover:text-primary">{item.title}</p>
        <p className="text-[10px] text-muted-foreground truncate">{item.breadcrumb}</p>
      </div>
      <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">{item.type}</span>
    </button>
  );
}

function useLocalRecent(): [SearchableItem[], React.Dispatch<React.SetStateAction<SearchableItem[]>>] {
  const [items, setItems] = useState<SearchableItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('lc-theory-search-recent') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('lc-theory-search-recent', JSON.stringify(items)); }, [items]);
  return [items, setItems];
}
