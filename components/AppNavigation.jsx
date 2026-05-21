"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ClipboardList, Home, LayoutDashboard, Users } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/submit-property", label: "Submit Property", icon: ClipboardList },
  { href: "/brokers", label: "Broker Profiles", icon: Users },
  { href: "/my-property-submission", label: "My Submission", icon: ClipboardList },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e2ddd5] bg-[#fffdf9]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[62px] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal text-white shadow-sm">
            <Building2 size={19} />
          </span>
          <span className="leading-none">
            <span className="block text-[14px] font-extrabold tracking-tight text-ink">
              All State Intelligence
            </span>
            <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8a98ad]">
              Alfaro PropTech
            </span>
          </span>
        </Link>

        <nav className="workspace-scroll ml-auto flex min-w-0 items-center gap-1 overflow-x-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[12px] font-bold transition"
                style={{
                  background: active ? "rgba(15,148,136,0.1)" : "transparent",
                  color: active ? "#0f9488" : "#66748a",
                }}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
