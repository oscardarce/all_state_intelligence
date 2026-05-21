import { Mail, MapPin, Phone, Star, UserRound } from "lucide-react";

export function BrokerCard({ broker, onSelect, onViewProfile, selected = false }) {
  return (
    <article
      className="flex h-full flex-col rounded-lg border bg-[#fffdf9] p-5 shadow-workspace transition"
      style={{
        borderColor: selected ? "rgba(15,148,136,0.52)" : "#e2ddd5",
        boxShadow: selected ? "0 14px 34px rgba(15,148,136,0.12)" : undefined,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[rgba(15,148,136,0.1)] text-[16px] font-extrabold text-teal">
          {broker.avatarInitials || <UserRound size={22} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-[17px] font-extrabold text-ink">{broker.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{broker.location}</span>
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[rgba(15,148,136,0.1)] px-2 py-1 text-[11px] font-extrabold text-teal">
              <Star size={12} fill="currentColor" />
              {broker.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#8a98ad]">
          Specialty
        </p>
        <p className="mt-1 text-[13px] leading-6 text-[#344155]">{broker.specialty}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniMetric label="Experience" value={broker.experience} />
          <MiniMetric label="Managed" value={`${broker.propertiesManaged} properties`} />
        </div>

        <div className="mt-4 space-y-2 text-[12px] text-muted">
          <p className="flex items-center gap-2">
            <Phone size={13} className="text-teal" />
            {broker.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={13} className="text-teal" />
            <span className="truncate">{broker.email}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => onSelect(broker.id)}
          className="flex-1 rounded-md bg-teal px-3 py-2 text-[12px] font-extrabold text-white transition hover:bg-[#0c766f]"
        >
          {selected ? "Selected" : "Select Broker"}
        </button>
        <button
          type="button"
          onClick={() => onViewProfile(broker)}
          className="flex-1 rounded-md border border-[#d8d1c8] bg-[#f7f3ed] px-3 py-2 text-[12px] font-extrabold text-[#536176] transition hover:border-teal hover:text-teal"
        >
          View Profile
        </button>
      </div>
    </article>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] px-3 py-2">
      <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
        {label}
      </p>
      <p className="mt-1 text-[12px] font-extrabold text-ink">{value}</p>
    </div>
  );
}
