"use client";

import Image from "next/image";
import MobileLayout from "@/components/MobileLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

/* ─────────────────────── Icons ─────────────────────── */

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path d="M47.532 24.552c0-1.636-.147-3.21-.42-4.72H24.48v8.946h12.98c-.56 3.02-2.26 5.575-4.817 7.29v6.056h7.794c4.563-4.204 7.095-10.39 7.095-17.572z" fill="#4285F4" />
      <path d="M24.48 48c6.508 0 11.965-2.156 15.953-5.85l-7.794-6.055c-2.16 1.447-4.92 2.3-8.159 2.3-6.275 0-11.588-4.237-13.49-9.934H2.95v6.258C6.926 43.078 15.1 48 24.48 48z" fill="#34A853" />
      <path d="M10.99 28.46A14.28 14.28 0 0 1 10.48 24c0-1.556.267-3.068.51-4.46V13.28H2.95A23.99 23.99 0 0 0 .48 24c0 3.87.928 7.53 2.47 10.72l8.04-6.26z" fill="#FBBC05" />
      <path d="M24.48 9.606c3.536 0 6.71 1.216 9.207 3.603l6.903-6.903C36.437 2.396 30.988 0 24.48 0 15.1 0 6.926 4.922 2.95 12.28l8.04 6.258c1.902-5.697 7.215-8.932 13.49-8.932z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
    </svg>
  );
}

/* ─────────────────────── Auth Button ─────────────────────── */

interface AuthButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "ghost" | "primary";
}

function AuthButton({ icon, label, onClick, variant = "ghost" }: AuthButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.97]"
      style={{
        height: "54px",
        borderRadius: "16px",
        background: isPrimary
          ? "linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ea580c 100%)"
          : "rgba(255,255,255,0.05)",
        border: isPrimary ? "none" : "1px solid rgba(255,255,255,0.09)",
        fontSize: "15px",
        fontWeight: isPrimary ? 700 : 500,
        letterSpacing: isPrimary ? "0.3px" : "0.01em",
        backdropFilter: isPrimary ? "none" : "blur(8px)",
        WebkitBackdropFilter: isPrimary ? "none" : "blur(8px)",
        color: "#fff",
        boxShadow: isPrimary
          ? "0 8px 28px rgba(249,115,22,0.35), 0 2px 8px rgba(249,115,22,0.2)"
          : "none",
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span style={{ color: isPrimary ? "#fff" : "rgba(255,255,255,0.8)" }}>{label}</span>
    </button>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <MobileLayout>
      <div
        className="flex flex-col flex-1 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0a0a0d 0%, #000000 60%, #0a0500 100%)",
        }}
      >
        {/* Top ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "360px",
            height: "360px",
            background: "radial-gradient(ellipse, rgba(249,115,22,0.13) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Bottom ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "240px",
            background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* ── Logo ── */}
        <div className="flex justify-center relative z-10" style={{ marginTop: "72px" }}>
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              padding: "3px",
              background: "linear-gradient(135deg, rgba(245,158,11,0.35), rgba(234,88,12,0.15))",
              boxShadow: "0 0 0 8px rgba(249,115,22,0.05), 0 24px 64px rgba(249,115,22,0.20)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
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
                style={{ padding: "6px" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Heading ── */}
        <div className="relative z-10 text-center" style={{ marginTop: "28px", padding: "0 28px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "5px",
              color: "rgba(249,115,22,0.5)",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Mess Mafia
          </p>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Welcome{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Back.
            </span>
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.28)",
              fontWeight: 400,
              letterSpacing: "0.2px",
            }}
          >
            Sign in to continue your food journey
          </p>
        </div>

        {/* ── Buttons ── */}
        <div
          className="relative z-10 flex flex-col"
          style={{ padding: "36px 20px 0", gap: "12px" }}
        >
          {/* Primary CTA — most used action first */}
          <AuthButton
            icon={<PhoneIcon />}
            label="Sign in with Contact Number"
            onClick={() => router.push("/phone-login")}
            variant="primary"
          />

          {/* Divider */}
          <div className="flex items-center gap-3" style={{ padding: "2px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              or
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Secondary — Google */}
          <AuthButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onClick={handleGoogleSignIn}
            variant="ghost"
          />

          {/* Secondary — Apple */}
          <AuthButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onClick={() => {}}
            variant="ghost"
          />
        </div>

        {/* ── Terms footnote ── */}
        <div
          className="relative z-10 mt-auto text-center"
          style={{ padding: "28px 32px 44px" }}
        >
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", lineHeight: 1.6 }}>
            By continuing, you agree to our{" "}
            <span style={{ color: "rgba(249,115,22,0.5)" }}>Terms of Service</span>{" "}
            and{" "}
            <span style={{ color: "rgba(249,115,22,0.5)" }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}