import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Įsitikinkite, kad komponentas yra užkrautas kliento pusėje
  useEffect(() => {
    setMounted(true);
  }, []);

  // Jei komponentas dar neužkrautas, rodome "tuščią" mygtuką, kad išvengtumėme Layout Shift
  if (!mounted) {
    return (
      <button className="p-2 hover:bg-muted rounded-md transition-colors">
        <div className="h-5 w-5" />
      </button>
    );
  }

  // Naudojame resolvedTheme vietoj theme, kad gautume faktinę temą
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-muted rounded-md transition-colors"
      aria-label="Perjungti temą"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle; 