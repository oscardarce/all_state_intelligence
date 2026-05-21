import Link from "next/link";
import { ArrowRight, Building2, ClipboardList, LayoutDashboard, Users } from "lucide-react";
import { AppNavigation } from "@/components/AppNavigation";

const menuCards = [
  {
    href: "/submit-property",
    title: "Add Property",
    description: "Submit owner, parcel, pricing, and photo information for review.",
    icon: ClipboardList,
    eyebrow: "Client intake",
  },
  {
    href: "/brokers",
    title: "Broker Profiles",
    description: "Review Alfaro PropTech broker profiles and choose who should manage the listing.",
    icon: Users,
    eyebrow: "Broker network",
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Open the internal property intelligence workspace with map, analysis, and tabs.",
    icon: LayoutDashboard,
    eyebrow: "Internal workspace",
  },
  {
    href: "/my-property-submission",
    title: "My Property Submission",
    description: "Check submitted property records, review status, selected broker, and uploaded files.",
    icon: Building2,
    eyebrow: "Client view",
  },
];

export function MainMenu() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <AppNavigation />

      <section className="mx-auto grid min-h-[calc(100vh-62px)] max-w-7xl content-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal">
            Property Intelligence Platform
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            All State Intelligence
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            A calm operational workspace for property intake, broker coordination, and
            internal intelligence review across Alfaro PropTech workflows.
          </p>
          <div className="mt-6 rounded-lg border border-[rgba(15,148,136,0.18)] bg-[#fffdf9] p-4 shadow-workspace">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a98ad]">
              Start here
            </p>
            <p className="mt-2 text-[13px] leading-6 text-[#344155]">
              Choose a workflow below. Public users can submit a property or choose a broker;
              internal users can continue to the intelligence dashboard.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {menuCards.map(({ href, title, description, icon: Icon, eyebrow }) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-[190px] flex-col justify-between rounded-lg border border-[#e2ddd5] bg-[#fffdf9] p-5 shadow-workspace transition hover:-translate-y-0.5 hover:border-[rgba(15,148,136,0.42)]"
            >
              <span>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[rgba(15,148,136,0.1)] text-teal">
                  <Icon size={20} />
                </span>
                <span className="mt-4 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8a98ad]">
                  {eyebrow}
                </span>
                <span className="mt-2 block text-[18px] font-extrabold text-ink">{title}</span>
                <span className="mt-2 block text-[13px] leading-6 text-muted">{description}</span>
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold text-teal">
                Open workflow
                <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
