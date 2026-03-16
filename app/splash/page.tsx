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
      <div
        className="flex flex-col flex-1 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0a0a0d 0%, #000000 55%, #0a0500 100%)",
        }}
      >
        {/* Top ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "340px",
            height: "340px",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Bottom ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "280px",
            height: "220px",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          {/* Logo with glow ring */}
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "28px",
              padding: "3px",
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.35), rgba(234,88,12,0.15))",
              boxShadow:
                "0 0 0 8px rgba(249,115,22,0.05), 0 24px 64px rgba(249,115,22,0.18)",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "26px",
                background: "#080808",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/assets/logo.png"
                alt="Mess Mafia Logo"
                fill
                className="object-contain"
                style={{ padding: "10px" }}
                priority
              />
            </div>
          </div>

          {/* Brand text */}
          <div className="text-center" style={{ marginBottom: "8px" }}>
            <p
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #f59e0b, #f97316, #ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                marginBottom: "4px",
              }}
            >
              MESS
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 900,
                fontFamily: "'Georgia', serif",
                color: "#ffffff",
                letterSpacing: "0.35em",
                lineHeight: 1,
              }}
            >
              MAFIA
            </p>
          </div>

          {/* Tagline */}
          <p
            style={{
              marginTop: "12px",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}
          >
            Food. Fire. Family.
          </p>
        </div>

        {/* Bottom loader area */}
        <div
          className="relative z-10 flex flex-col items-center pb-16"
          style={{ gap: "14px" }}
        >
          {/* Orange arc spinner */}
          <div style={{ width: "36px", height: "36px", position: "relative" }}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              style={{
                animation: "spin 1s linear infinite",
                display: "block",
              }}
            >
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="rgba(249,115,22,0.12)"
                strokeWidth="2.5"
              />
              <path
                d="M18 3 A15 15 0 0 1 33 18"
                stroke="url(#spinGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="spinGrad" x1="18" y1="3" x2="33" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
            `}</style>
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Loading
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}