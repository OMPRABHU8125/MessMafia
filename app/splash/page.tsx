"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MobileLayout from "@/components/MobileLayout";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MobileLayout>
      {/* Centered logo content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Logo Image */}
        <div className="w-64 h-64 relative mb-6">
          <Image
            src="/assets/logo.png"
            alt="Mess Mafia Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* MESS MAFIA text */}
        <div className="text-center mt-2">
          <p
            className="text-5xl font-extrabold leading-none tracking-wide"
            style={{
              color: "#f97316",
              fontFamily: "'Georgia', serif",
              textShadow: "0 0 20px rgba(249,115,22,0.5)",
              fontStyle: "italic",
            }}
          >
            MESS
          </p>
          <p
            className="text-4xl font-black tracking-widest mt-1"
            style={{
              color: "#ffffff",
              fontFamily: "'Georgia', serif",
              letterSpacing: "0.3em",
            }}
          >
            MAFIA
          </p>
        </div>
      </div>

      {/* Loading spinner at bottom */}
      <div className="pb-12 flex justify-center">
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "#4ade80",
              borderRightColor: "#4ade80",
              animation: "spin 1s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    </MobileLayout>
  );
}
