"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MobileLayout from "@/components/MobileLayout";
import { useEffect, useState, useMemo, useRef } from "react";
import menuData from "@/data/menu.json";
import { useCart } from "@/context/CartContext";

/* ─────────────────────── Types ─────────────────────── */

interface MenuItem {
  id: number;
  name: string;
  category: string;
  prepTime: string;
  available: boolean;
  price: number;
  image: string;
}

/* ─────────────────────── Icons ─────────────────────── */

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function SearchIcon({ stroke = "rgba(255,255,255,0.35)" }: { stroke?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ─────────────────────── Categories ─────────────────────── */

const CATEGORIES = [
  { name: "All",     emoji: "🍽️" },
  { name: "Veg",     emoji: "🥦" },
  { name: "Non Veg", emoji: "🍗" },
  { name: "Snacks",  emoji: "🍔" },
  { name: "Chinese", emoji: "🍜" },
  { name: "Dessert", emoji: "🍰" },
  { name: "Drinks",  emoji: "🥤" },
];

/* ─────────────────────── Menu Card ─────────────────────── */

function MenuCard({ item }: { item: MenuItem }) {
  const isNonVeg = item.category === "Non Veg";
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ position: "relative", width: "100%", height: "110px" }}>
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        <div style={{
          position: "absolute", top: "8px", right: "8px",
          width: "14px", height: "14px", borderRadius: "3px",
          border: `2px solid ${isNonVeg ? "#ef4444" : "#22c55e"}`,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: isNonVeg ? "#ef4444" : "#22c55e" }} />
        </div>
      </div>
      <div style={{ padding: "10px 10px 12px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{
          fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "6px",
          lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#f97316" }}>₹{item.price}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <ClockIcon />
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{item.prepTime}</span>
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category, prepTime: item.prepTime })}
              style={{
                width: "100%", height: "36px", borderRadius: "8px",
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                border: "none", color: "#fff", fontSize: "13px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
              }}
            >
              Add
            </button>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              height: "36px", background: "rgba(249,115,22,0.15)", borderRadius: "8px",
              padding: "0 4px", border: "1px solid rgba(249,115,22,0.3)"
            }}>
              <button
                onClick={() => decreaseQuantity(item.id)}
                style={{
                  width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.1)", borderRadius: "6px"
                }}
              >
                <div style={{ width: "10px", height: "2px", background: "#f97316", borderRadius: "2px" }} />
              </button>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                style={{
                  width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#f97316", borderRadius: "6px"
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allItems: MenuItem[] = menuData as MenuItem[];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery, allItems]);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const todaySpecials = allItems.filter((i) => [1, 2, 3].includes(i.id));
  const userName = session?.user?.name?.split(" ")[0] || "Guest";
  const showDropdown = searchFocused && searchQuery.trim().length > 0;
  
  const { cartTotalCount } = useCart();

  if (status === "loading") {
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

  return (
    <MobileLayout>
      <style>{`
        .home-scroll::-webkit-scrollbar { display: none; }
        .home-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div
        className="home-scroll"
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "scroll",
          background: "#0d0d0f",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Ambient glow — fixed so it doesn't scroll */}
        <div style={{
          position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "300px", height: "200px", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div style={{ padding: "52px 20px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "2px", letterSpacing: "0.3px" }}>
                  Good morning 👋
                </p>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
                  {userName}
                </h2>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button style={{
                  width: "40px", height: "40px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BellIcon />
                </button>
                <Link href="/cart" style={{
                  width: "40px", height: "40px", borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(249,115,22,0.15))",
                  border: "1px solid rgba(249,115,22,0.3)",
                  display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", position: "relative"
                }}>
                  <CartIcon />
                  {cartTotalCount > 0 && (
                    <div style={{
                      position: "absolute", top: "-4px", right: "-4px",
                      background: "#f97316", color: "#fff", fontSize: "10px", fontWeight: 800,
                      width: "18px", height: "18px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "2px solid #0d0d0f"
                    }}>
                      {cartTotalCount}
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* ── Search Bar ── */}
          <div style={{ padding: "0 20px 20px" }}>
            <div ref={searchRef} style={{ position: "relative", zIndex: 50 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                height: "48px",
                background: searchFocused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)",
                border: searchFocused ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: showDropdown ? "14px 14px 0 0" : "14px",
                padding: "0 14px", transition: "all 0.2s",
              }}>
                <SearchIcon stroke={searchFocused ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.3)"} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search dishes, categories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontSize: "14px", color: "#fff", caretColor: "#f97316",
                  }}
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); inputRef.current?.focus(); }}>
                    <CloseIcon />
                  </button>
                )}
              </div>

              {/* Floating dropdown */}
              {showDropdown && (
                <div style={{
                  position: "absolute", top: "48px", left: 0, right: 0,
                  background: "#1a1a1f",
                  border: "1px solid rgba(249,115,22,0.25)",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "0 0 16px 16px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
                  maxHeight: "260px", overflowY: "auto",
                  zIndex: 100,
                }}>
                  {searchResults.length > 0 ? (
                    <>
                      <div style={{ padding: "8px 14px 4px" }}>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "1px", textTransform: "uppercase" }}>
                          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {searchResults.map((item, idx) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex", alignItems: "center", gap: "12px",
                            padding: "10px 14px",
                            borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                            cursor: "pointer",
                          }}
                          onClick={() => { setSearchFocused(false); setSearchQuery(""); }}
                        >
                          <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "2px" }}>{item.name}</p>
                            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{item.category} · {item.prepTime}</p>
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#f97316", flexShrink: 0 }}>₹{item.price}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div style={{ padding: "24px 14px", textAlign: "center" }}>
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>No dishes found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Today's Special Banner ── */}
          <div style={{ padding: "0 20px 24px" }}>
            <div style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              background: "linear-gradient(135deg, #f59e0b 0%, #f97316 55%, #ea580c 100%)",
              padding: "18px 20px", minHeight: "130px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              boxShadow: "0 10px 28px rgba(249,115,22,0.28)",
            }}>
              <div style={{ position: "absolute", right: "-20px", top: "-20px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "86px", height: "86px", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.3)" }}>
                <Image src={todaySpecials[0].image} alt="Today's special" fill className="object-cover" />
              </div>
              <div style={{ width: "55%" }}>
                <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>Today&apos;s Special</p>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "7px" }}>Chef&apos;s Pick Menu</h4>
                {todaySpecials.slice(0, 3).map((s) => (
                  <p key={s.id} style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>· {s.name}</p>
                ))}
              </div>
            </div>
          </div>

          {/* ── Categories label — scrolls normally ── */}
          <div style={{ padding: "0 20px 10px", position: "sticky", top: 0, zIndex: 20,background: "#0d0d0f" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>Categories</h3>
          </div>
          <div style={{
            position: "sticky",
            top: 30,
            zIndex: 20,
            background: "#0d0d0f",
            padding: "10px 20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                      padding: "8px 4px", borderRadius: "12px",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.15))"
                        : "rgba(255,255,255,0.04)",
                      border: isActive ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{cat.emoji}</span>
                    <span style={{
                      fontSize: "10px", fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#f97316" : "rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                    }}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Dishes header ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 20px 12px",
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
              {activeCategory === "All" ? "All Dishes" : activeCategory}
              <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.3)", marginLeft: "6px" }}>
                ({filteredMenu.length})
              </span>
            </h3>
          </div>

          {/* ── Dishes grid ── */}
          <div style={{ padding: "0 20px 40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>

            {filteredMenu.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ fontSize: "28px", marginBottom: "10px" }}>🍽️</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>No dishes in this category</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </MobileLayout>
  );
}