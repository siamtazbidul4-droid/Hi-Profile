import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 backdrop-blur-md shadow-xs ${className}`}
      role="group"
      aria-label="Theme selection"
    >
      <button
        onClick={() => setTheme('light')}
        title="Light Mode"
        className={`p-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-xs border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200'
        }`}
        aria-label="Switch to light mode"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        className={`p-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
          theme === 'dark'
            ? 'bg-neutral-800 text-cyan-400 shadow-xs border border-neutral-700/60'
            : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200'
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => setTheme('system')}
        title="System Preference"
        className={`p-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
          theme === 'system'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30'
            : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200'
        }`}
        aria-label="Switch to system theme"
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

