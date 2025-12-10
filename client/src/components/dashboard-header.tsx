import { Link } from "wouter";
import { Logo } from "./logo";
import { ChevronDown } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="w-full h-16 bg-black text-white px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      <Link href="/dashboard">
        <a className="hover:opacity-80 transition-opacity">
          <Logo size="sm" theme="dark" />
        </a>
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium text-sm hidden md:block">
        Marketing Data
      </div>

      <div className="flex items-center gap-6 text-sm">
        <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
          English <ChevronDown className="w-4 h-4" />
        </button>
        <Link href="/login">
          <a className="text-gray-300 hover:text-white transition-colors">Log Out</a>
        </Link>
      </div>
    </header>
  );
}
