export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 flex-col items-center justify-center rounded-xl shadow-sm ${
          light
            ? "bg-white/15 text-white ring-1 ring-white/20"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <span className="font-display text-xl font-semibold leading-none">Ç</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          Akademika
        </span>
        <span className={`mt-0.5 text-[10px] font-medium tracking-[0.22em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
          ÇEVİRİ
        </span>
      </div>
    </div>
  );
}
