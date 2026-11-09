export default function SectionHeading({ tag, title, highlight, subtitle }) {
  return (
    <div className="text-center mb-16">
      <span
        className="inline-block px-4 py-1 rounded-full text-xs font-mono font-medium tracking-widest uppercase mb-4"
        style={{
          background: "hsl(var(--primary) / 0.1)",
          color: "hsl(var(--primary))",
          border: "1px solid hsl(var(--primary) / 0.3)",
        }}
      >
        {tag}
      </span>
      <h2 className="section-title text-foreground">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
        <div className="glow-dot" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
    </div>
  );
}
