export default function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8">
      <h1 className="font-display text-2xl font-bold mb-1 pb-4 relative">
        {title}
        <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-sage-bg rounded-full" />
      </h1>
      <p className="text-sm text-muted-foreground font-light mb-8">{description}</p>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground text-sm">This page is coming soon.</p>
      </div>
    </div>
  );
}
