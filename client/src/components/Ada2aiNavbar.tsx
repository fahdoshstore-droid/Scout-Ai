import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// Ada2ai Logo SVG — Teal rounded square with "A" + wordmark
function Ada2aiLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Badge icon */}
      <div
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: "#00DCC8",
          borderRadius: "8px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: size * 0.55,
            color: "#000A0F",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: size * 0.65,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#EEEFEE" }}>ada</span>
        <span style={{ color: "#00DCC8" }}>2</span>
        <span style={{ color: "#EEEFEE" }}>ai</span>
      </span>
    </div>
  );
}

// Governance dropdown items
const governanceItems = [
  { label: "Sub-Governance", href: "/governance/sub" },
  { label: "Team Members", href: "/governance/team" },
];

// Main nav — exactly 5 items
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "AI Demo", href: "/demo" },
  { label: "Partnerships", href: "/academies" },
  { label: "Governance", href: null, dropdown: governanceItems },
];

export default function Ada2aiNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const govRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setGovOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (govRef.current && !govRef.current.contains(e.target as Node)) {
        setGovOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinkStyle = (isActive: boolean) => ({
    fontFamily: "'Cairo', sans-serif",
    fontWeight: isActive ? 600 : 500,
    fontSize: "15px",
    color: isActive ? "#00DCC8" : "rgba(238, 239, 238, 0.82)",
    background: isActive ? "rgba(0, 220, 200, 0.08)" : "transparent",
  });

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(0, 10, 15, 0.96)"
            : "rgba(0, 10, 15, 0.72)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 220, 200, 0.18)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <Ada2aiLogo size={32} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  // Governance dropdown
                  return (
                    <div key="governance" className="relative" ref={govRef}>
                      <button
                        className="px-4 py-2 rounded-md flex items-center gap-1.5 transition-all duration-200"
                        style={navLinkStyle(location.startsWith("/governance"))}
                        onClick={() => setGovOpen((v) => !v)}
                        onMouseEnter={(e) => {
                          if (!location.startsWith("/governance")) {
                            (e.currentTarget as HTMLElement).style.color = "#EEEFEE";
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!location.startsWith("/governance")) {
                            (e.currentTarget as HTMLElement).style.color = "rgba(238, 239, 238, 0.82)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                          }
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          style={{
                            transform: govOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            color: "rgba(238,239,238,0.5)",
                          }}
                        />
                      </button>

                      {govOpen && (
                        <div
                          className="absolute top-full left-0 mt-1.5 rounded-lg overflow-hidden"
                          style={{
                            background: "rgba(0, 10, 15, 0.97)",
                            border: "1px solid rgba(0, 220, 200, 0.18)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                            minWidth: "180px",
                          }}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-5 py-3 text-sm transition-all duration-150"
                              style={{
                                fontFamily: "'Cairo', sans-serif",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "rgba(238,239,238,0.75)",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#00DCC8";
                                (e.currentTarget as HTMLElement).style.background = "rgba(0,220,200,0.06)";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "rgba(238,239,238,0.75)";
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href!}
                    href={link.href!}
                    className="px-4 py-2 rounded-md transition-all duration-200"
                    style={navLinkStyle(isActive)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "#EEEFEE";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(238, 239, 238, 0.82)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm"
                    style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif" }}
                  >
                    {user?.name || user?.email}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm px-4 py-1.5 rounded-md transition-all"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      color: "rgba(238,239,238,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href={getLoginUrl()}
                    className="text-sm px-4 py-1.5 rounded-md transition-all"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontSize: "15px",
                      color: "rgba(238,239,238,0.75)",
                    }}
                  >
                    Login
                  </a>
                  <Link href="/demo">
                    <button className="btn-ada-primary text-sm px-5 py-2">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md"
              style={{ color: "#EEEFEE" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden"
            style={{
              background: "rgba(0, 10, 15, 0.98)",
              borderTop: "1px solid rgba(0, 220, 200, 0.1)",
            }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key="governance-mobile">
                      <button
                        className="w-full text-left px-4 py-3 rounded-md text-sm flex items-center justify-between"
                        style={{
                          fontFamily: "'Cairo', sans-serif",
                          fontSize: "15px",
                          color: "rgba(238, 239, 238, 0.8)",
                          fontWeight: 500,
                        }}
                        onClick={() => setGovOpen((v) => !v)}
                      >
                        {link.label}
                        <ChevronDown size={14} style={{ transform: govOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      {govOpen && (
                        <div className="ml-4 flex flex-col gap-0.5">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="px-4 py-2.5 rounded-md text-sm"
                              style={{
                                fontFamily: "'Cairo', sans-serif",
                                fontSize: "14px",
                                color: "rgba(238,239,238,0.65)",
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href!}
                    href={link.href!}
                    className="px-4 py-3 rounded-md text-sm transition-all"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontSize: "15px",
                      color: isActive ? "#00DCC8" : "rgba(238, 239, 238, 0.8)",
                      background: isActive ? "rgba(0, 220, 200, 0.08)" : "transparent",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-white/10 flex gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="flex-1 py-2.5 text-sm rounded-md"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      color: "rgba(238,239,238,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <a
                      href={getLoginUrl()}
                      className="flex-1 py-2.5 text-sm rounded-md text-center"
                      style={{
                        fontFamily: "'Cairo', sans-serif",
                        color: "rgba(238,239,238,0.75)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      Login
                    </a>
                    <Link href="/demo" className="flex-1">
                      <button className="btn-ada-primary w-full text-sm py-2.5">
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div style={{ height: "64px" }} />
    </>
  );
}

export { Ada2aiLogo };
