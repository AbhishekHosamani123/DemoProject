import { DatabaseZap } from "lucide-react";

export function Header() {
  return (
    <header className="p-4 border-b border-border">
      <div className="container mx-auto flex items-center gap-4">
        <DatabaseZap className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">
          INERA Navigator
        </h1>
      </div>
    </header>
  );
}
