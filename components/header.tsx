export default function Header() {
  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                ⌨️
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              TypeMaster
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Master your typing skills
          </div>
        </div>
      </div>
    </header>
  );
}
