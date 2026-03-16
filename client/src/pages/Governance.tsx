import Ada2aiNavbar from "@/components/Ada2aiNavbar";
import { Shield, Users, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Governance() {
  return (
    <div className="min-h-screen bg-[#000A0F] text-[#EEEFEE]">
      <Ada2aiNavbar />
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{ background: "rgba(0,220,200,0.08)", border: "1px solid rgba(0,220,200,0.25)" }}>
          <Shield size={14} style={{ color: "#00DCC8" }} />
          <span className="text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#00DCC8" }}>
            Governance
          </span>
        </div>
        <h1 className="font-orbitron font-black text-4xl lg:text-5xl mb-6 text-[#EEEFEE]">
          Platform <span style={{ color: "#00DCC8" }}>Governance</span>
        </h1>
        <p className="text-base max-w-xl mx-auto mb-12"
          style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
          ada2ai is committed to transparent governance, ethical AI practices, and structured accountability across all platform operations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <Link href="/governance/sub">
            <div className="ada-card p-7 text-left cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="ada-icon-box"><BookOpen size={20} /></div>
                <h3 className="font-bold text-base text-[#EEEFEE]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>Sub-Governance</h3>
              </div>
              <p className="text-sm mb-4"
                style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>
                Operational policies, data governance framework, and platform compliance standards.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#00DCC8", fontFamily: "'Orbitron', sans-serif" }}>
                View Details <ChevronRight size={13} />
              </div>
            </div>
          </Link>
          <Link href="/governance/team">
            <div className="ada-card p-7 text-left cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="ada-icon-box"><Users size={20} /></div>
                <h3 className="font-bold text-base text-[#EEEFEE]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>Team Members</h3>
              </div>
              <p className="text-sm mb-4"
                style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>
                Leadership team, advisory board, and key contributors driving the ada2ai platform.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#00DCC8", fontFamily: "'Orbitron', sans-serif" }}>
                Meet the Team <ChevronRight size={13} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
