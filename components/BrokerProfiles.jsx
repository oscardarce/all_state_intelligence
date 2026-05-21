"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, MapPin, Star, X } from "lucide-react";
import { AppNavigation } from "@/components/AppNavigation";
import { BrokerCard } from "@/components/BrokerCard";
import { mockBrokers, selectedBrokerStorageKey } from "@/lib/brokers";

export function BrokerProfiles() {
  const router = useRouter();
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [profileBroker, setProfileBroker] = useState(null);

  useEffect(() => {
    setSelectedBrokerId(window.localStorage.getItem(selectedBrokerStorageKey) || "");
  }, []);

  const selectBroker = (brokerId) => {
    window.localStorage.setItem(selectedBrokerStorageKey, brokerId);
    setSelectedBrokerId(brokerId);
    router.push("/submit-property");
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <AppNavigation />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 max-w-3xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal">
            Broker Profiles
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
            Choose a broker for property review
          </h1>
          <p className="mt-3 text-[14px] leading-7 text-muted">
            Alfaro PropTech brokers support owner intake, listing preparation, and
            property intelligence review before a property moves into active market work.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {mockBrokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              selected={broker.id === selectedBrokerId}
              onSelect={selectBroker}
              onViewProfile={setProfileBroker}
            />
          ))}
        </div>
      </section>

      {profileBroker ? (
        <BrokerProfileModal broker={profileBroker} onClose={() => setProfileBroker(null)} />
      ) : null}
    </main>
  );
}

function BrokerProfileModal({ broker, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-[rgba(31,42,61,0.58)] px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${broker.name} profile`}
    >
      <article className="max-h-full w-full max-w-3xl overflow-hidden rounded-lg border border-[#e2ddd5] bg-[#fffdf9] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#e2ddd5] bg-[#f7f3ed] p-5">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[rgba(15,148,136,0.12)] text-[18px] font-extrabold text-teal">
              {broker.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal">
                Broker Profile
              </p>
              <h2 className="mt-1 text-[22px] font-extrabold text-ink">{broker.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                <MapPin size={13} />
                {broker.location}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d8d1c8] bg-white text-[#536176] transition hover:border-teal hover:text-teal"
            aria-label="Close broker profile"
          >
            <X size={17} />
          </button>
        </div>

        <div className="workspace-scroll max-h-[70vh] overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={Star} label="Rating" value={broker.rating} />
            <Metric icon={BriefcaseBusiness} label="Experience" value={broker.experience} />
            <Metric label="Managed" value={`${broker.propertiesManaged} properties`} />
          </div>

          <section className="mt-5 rounded-lg border border-[#e2ddd5] bg-[#f8f5ef] p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">Bio</p>
            <p className="mt-2 text-[13px] leading-6 text-[#344155]">{broker.bio}</p>
          </section>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ListSection title="Service Areas" items={broker.serviceAreas} />
            <ListSection title="Specialties" items={broker.specialties} />
            <ListSection title="Recent Properties" items={broker.recentProperties} />
            <section className="rounded-lg border border-[#e2ddd5] bg-[#fffdf9] p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">
                Contact
              </p>
              <p className="mt-2 text-[13px] font-bold text-ink">{broker.phone}</p>
              <p className="mt-1 text-[13px] text-muted">{broker.email}</p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-[#e2ddd5] bg-white p-3">
      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
        {Icon ? <Icon size={12} className="text-teal" /> : null}
        {label}
      </p>
      <p className="mt-1 text-[14px] font-extrabold text-ink">{value}</p>
    </div>
  );
}

function ListSection({ title, items }) {
  return (
    <section className="rounded-lg border border-[#e2ddd5] bg-[#fffdf9] p-4">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] leading-5 text-[#344155]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
