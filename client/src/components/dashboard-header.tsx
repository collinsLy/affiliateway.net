import { Link, useLocation } from "wouter";
import { Logo } from "./logo";
import { ChevronDown } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
        <a 
          href="#" 
          onClick={handleLogout}
          className="text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          Log Out
        </a>
      </div>
    </header>
  );
}
