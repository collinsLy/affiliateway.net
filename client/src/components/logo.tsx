import logoImage from "@assets/image_1765385444035.png";

export function Logo({ className = "", size = "md", showText = true, theme = "light" }: { className?: string, size?: "sm" | "md" | "lg", showText?: boolean, theme?: "light" | "dark" }) {
  const sizeClasses = {
    sm: "w-8 h-8", // Slightly larger for better visibility of the detailed logo
    md: "w-12 h-12",
    lg: "w-20 h-20"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImage} 
        alt="AffiliateWay Logo" 
        className={`${sizeClasses[size]} object-contain rounded-xl`}
      />
      {showText && (
        <span className={`font-bold tracking-tight ${textSizes[size]} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          AFFILIATEWAY
        </span>
      )}
    </div>
  );
}
