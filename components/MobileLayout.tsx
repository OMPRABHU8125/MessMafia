import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MobileLayout({ children, className = "" }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div
        className={`relative w-full max-w-[420px] min-h-screen bg-[#0f1115] overflow-hidden flex flex-col ${className}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}
