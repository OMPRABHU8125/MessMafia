"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/MobileLayout";

/* ─────────────────────── Icon Components ─────────────────────── */

function BackArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 5l-7 7 7 7" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path
        d="M47.532 24.552c0-1.636-.147-3.21-.42-4.72H24.48v8.946h12.98c-.56 3.02-2.26 5.575-4.817 7.29v6.056h7.794c4.563-4.204 7.095-10.39 7.095-17.572z"
        fill="#4285F4"
      />
      <path
        d="M24.48 48c6.508 0 11.965-2.156 15.953-5.85l-7.794-6.055c-2.16 1.447-4.92 2.3-8.159 2.3-6.275 0-11.588-4.237-13.49-9.934H2.95v6.258C6.926 43.078 15.1 48 24.48 48z"
        fill="#34A853"
      />
      <path
        d="M10.99 28.46A14.28 14.28 0 0 1 10.48 24c0-1.556.267-3.068.51-4.46V13.28H2.95A23.99 23.99 0 0 0 .48 24c0 3.87.928 7.53 2.47 10.72l8.04-6.26z"
        fill="#FBBC05"
      />
      <path
        d="M24.48 9.606c3.536 0 6.71 1.216 9.207 3.603l6.903-6.903C36.437 2.396 30.988 0 24.48 0 15.1 0 6.926 4.922 2.95 12.28l8.04 6.258c1.902-5.697 7.215-8.932 13.49-8.932z"
        fill="#EA4335"
      />
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

/* ─────────────────────── Auth Button ─────────────────────── */

interface AuthButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function AuthButton({ icon, label, onClick }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 text-white font-medium text-[15px] transition-all duration-200 active:scale-[0.97] hover:brightness-125"
      style={{
        height: "52px",
        borderRadius: "999px",
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        letterSpacing: "0.01em",
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function LoginPage() {
  const router = useRouter();

  return (
    <MobileLayout>
      {/* Full-height gradient container */}
      <div
        className="flex flex-col flex-1"
        style={{
          background: "linear-gradient(180deg, #0f1115 0%, #000000 100%)",
        }}
      >
        {/* Back Button */}
        <div className="pt-14 px-6">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center text-white transition-all duration-200 active:scale-90 hover:brightness-125"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <BackArrowIcon />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-6 mb-2">
          <div
            className="relative"
            style={{ width: "160px", height: "160px" }}
          >
            <Image
              src="/assets/logo.png"
              alt="Mess Mafia Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <div className="px-8 mt-4 mb-8 text-center">
          <h1
            className="text-white"
            style={{
              fontSize: "2.25rem",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s You In
          </h1>
        </div>

        {/* Social Auth Buttons */}
        <div className="px-6 flex flex-col gap-3">
          <AuthButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onClick={() => { }}
          />
          <AuthButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onClick={() => { }}
          />
        </div>

        {/* Divider */}
        <div className="px-6 mt-7 mb-7 flex items-center gap-3">
          <div
            className="flex-1"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
          />
          <span
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            or
          </span>
          <div
            className="flex-1"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* Primary CTA */}
        <div className="px-6">
          <button
            onClick={() => { }}
            className="w-full text-white font-bold text-[15px] tracking-wide transition-all duration-200 active:scale-[0.97]"
            style={{
              height: "54px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ea580c 100%)",
              boxShadow:
                "0 0 32px rgba(249, 115, 22, 0.45), 0 4px 16px rgba(249, 115, 22, 0.25)",
              letterSpacing: "0.02em",
            }}
          >
            Sign in with Contact Number
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pb-14 flex justify-center">
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Create a new account &gt;{" "}
            <span
              className="font-bold cursor-pointer"
              style={{ color: "#f97316" }}
            >
              Sign UP
            </span>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
