"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MobileLayout from "@/components/MobileLayout";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

/* ─────────────────────── Icons ─────────────────────── */

function BackArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 5l-7 7 7 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

/* ─────────────────────── Cart Item Card ─────────────────────── */

function CartItemCard({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: {
  item: any;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const isNonVeg = item.category === "Non Veg";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "14px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "76px",
          height: "76px",
          borderRadius: "14px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        {/* Veg/NonVeg dot */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            width: "13px",
            height: "13px",
            borderRadius: "3px",
            border: `1.5px solid ${isNonVeg ? "#ef4444" : "#22c55e"}`,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: isNonVeg ? "#ef4444" : "#22c55e" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top row: name + delete */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3px" }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
            {item.name}
          </p>
          <button
            onClick={onRemove}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginLeft: "8px",
            }}
          >
            <TrashIcon />
          </button>
        </div>

        {/* Category + prep time */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{item.category}</span>
          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
          <ClockIcon />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{item.prepTime}</span>
        </div>

        {/* Bottom row: price + qty */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "#f97316" }}>₹{item.price}</span>
            {item.quantity > 1 && (
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginLeft: "5px" }}>
                × {item.quantity} = ₹{item.price * item.quantity}
              </span>
            )}
          </div>

          {/* Quantity stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={onDecrease}
              style={{
                width: "32px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 300,
              }}
            >
              −
            </button>
            <span
              style={{
                minWidth: "28px",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                height: "30px",
                lineHeight: "30px",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={onIncrease}
              style={{
                width: "32px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f97316",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Summary Row ─────────────────────── */

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: highlight ? "15px" : "14px", fontWeight: highlight ? 600 : 400, color: highlight ? "#fff" : "rgba(255,255,255,0.45)" }}>
        {label}
      </span>
      <span style={{ fontSize: highlight ? "18px" : "14px", fontWeight: highlight ? 800 : 500, color: highlight ? "#f97316" : "rgba(255,255,255,0.6)" }}>
        {value}
      </span>
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotalCount,
    cartTotalPrice,
    clearCart
  } = useCart();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const handleCheckout = async () => {
    if (isEmpty || !session) return;
    
    setIsCheckoutLoading(true);
    setCheckoutMessage(null);

    console.log('Sending Token to Backend:', (session as any).backendToken);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any).backendToken}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            itemId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalPrice: cartTotalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCheckoutMessage({ type: 'success', text: 'Order placed successfully!' });
        clearCart();
      } else {
        setCheckoutMessage({ type: 'error', text: data.message || 'Failed to place order' });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutMessage({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center" style={{ background: "#0d0d0f" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ animation: "spin 1s linear infinite" }}>
            <circle cx="16" cy="16" r="13" stroke="rgba(249,115,22,0.15)" strokeWidth="2.5" fill="none" />
            <path d="M16 3 A13 13 0 0 1 29 16" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          </svg>
        </div>
      </MobileLayout>
    );
  }

  const maxPrepTime = cartItems.reduce((max, item) => {
    const t = parseInt(item.prepTime) || 10;
    return t > max ? t : max;
  }, 0);

  const isEmpty = cartItems.length === 0;

  return (
    <MobileLayout>
      <style>{`* { scrollbar-width: none; -ms-overflow-style: none; } *::-webkit-scrollbar { display: none; }`}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #0d0d0f 0%, #0a0500 100%)",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "280px", height: "200px", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }} />

        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "52px 20px 16px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <BackArrowIcon />
          </button>

          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>
              My Cart
            </h1>
            {!isEmpty && (
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>
                {cartTotalCount} item{cartTotalCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div style={{ width: "38px" }} />
        </div>

        {isEmpty && !checkoutMessage ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 32px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "28px",
                background: "rgba(249,115,22,0.07)",
                border: "1px solid rgba(249,115,22,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <BagIcon />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: "36px" }}>
              Looks like you haven&apos;t added anything yet. Go pick something delicious!
            </p>
            <Link
              href="/home"
              style={{
                width: "100%", height: "52px", borderRadius: "16px",
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ea580c 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "15px", fontWeight: 700,
                boxShadow: "0 8px 24px rgba(249,115,22,0.28)",
                textDecoration: "none",
              }}
            >
              Browse Menu
            </Link>
          </div>
        ) : isEmpty && checkoutMessage ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 32px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "28px",
                  background: checkoutMessage.type === 'success' ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: checkoutMessage.type === 'success' ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                {checkoutMessage.type === 'success' ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                )}
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                {checkoutMessage.type === 'success' ? 'Success!' : 'Oops!'}
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: "36px" }}>
                {checkoutMessage.text}
              </p>
              <button
                onClick={() => {
                  if (checkoutMessage.type === 'success') router.push('/home');
                  else setCheckoutMessage(null);
                }}
                style={{
                  width: "100%", height: "52px", borderRadius: "16px",
                  background: checkoutMessage.type === 'success' ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" : "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "15px", fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  border: "none",
                }}
              >
                {checkoutMessage.type === 'success' ? 'Back to Home' : 'Try Again'}
              </button>
            </div>
        ) : (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "scroll",
                padding: "8px 20px 0",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px" }}>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                flexShrink: 0,
                padding: "16px 20px 36px",
                background: "rgba(13,13,15,0.95)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <SummaryRow label="Items" value={`${cartTotalCount}`} />
                <SummaryRow
                  label="Est. prep time"
                  value={maxPrepTime > 0 ? `${maxPrepTime} min` : "15 min"}
                />
                <div style={{
                  borderTop: "1px dashed rgba(255,255,255,0.08)",
                  margin: "2px 0",
                }} />
                <SummaryRow label="Total" value={`₹${cartTotalPrice}`} highlight />
              </div>

              <button
                disabled={isCheckoutLoading}
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  height: "54px",
                  borderRadius: "16px",
                  background: isCheckoutLoading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ea580c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 700,
                  boxShadow: isCheckoutLoading ? "none" : "0 8px 28px rgba(249,115,22,0.3), 0 2px 8px rgba(249,115,22,0.15)",
                  letterSpacing: "0.3px",
                  border: "none",
                  cursor: isCheckoutLoading ? "not-allowed" : "pointer",
                }}
              >
                {isCheckoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                {!isCheckoutLoading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}