import { Zap } from "lucide-react";

export function Logo({ className = "", size = "md", showText = true, theme = "light" }: { className?: string, size?: "sm" | "md" | "lg", showText?: boolean, theme?: "light" | "dark" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20`}>
        <Zap className="text-white fill-white" size={size === "sm" ? 14 : size === "md" ? 24 : 36} />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textSizes[size]} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          AFFILIATEWAY
        </span>
      )}
    </div>
  );
}
