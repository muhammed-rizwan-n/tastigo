import { Utensils } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              TASTIGO
            </h1>
            <p className="text-xs text-muted-foreground">College Canteen</p>
          </div>
        </div>
      </div>
    </header>
  );
}
