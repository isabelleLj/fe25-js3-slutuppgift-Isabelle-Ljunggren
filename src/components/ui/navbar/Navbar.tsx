import { Link } from "react-router";
import { Globe } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-slate-900">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-sky-400" />

          <span className="text-lg font-bold tracking-tight text-white">
            Trevlig<span className="text-sky-400">Resa</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Hem
          </Link>

          <Link
            to="/countries"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Länder
          </Link>
        </div>
      </div>
    </nav>
  );
}
