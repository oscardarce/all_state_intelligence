"use client";

import { MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/properties";

export function PropertyList({ properties, selectedId, onSelectProperty }) {
  return (
    <aside className="flex w-[272px] shrink-0 flex-col overflow-hidden border-r border-[#e2ddd5] bg-[#f7f3ed]">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#e2ddd5] px-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8796ad]">
          Properties
        </p>
        <span className="rounded-full bg-[rgba(15,148,136,0.12)] px-2 py-0.5 text-[11px] font-bold text-teal">
          {properties.length}
        </span>
      </div>

      <div className="workspace-scroll min-h-0 flex-1 overflow-y-auto">
        {properties.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-[13px] font-semibold text-ink">No properties found</p>
            <p className="mt-1 text-[12px] leading-5 text-muted">
              Adjust the geographic filters or add a new property intake.
            </p>
          </div>
        ) : (
          properties.map((property) => {
            const active = property.id === selectedId;

            return (
              <button
                key={property.id}
                type="button"
                onClick={() => onSelectProperty(property.id)}
                className="group w-full border-b border-[#ebe5dc] px-4 py-3.5 text-left transition hover:bg-white"
                style={{
                  background: active ? "rgba(15, 148, 136, 0.08)" : "transparent",
                  borderLeft: active ? "3px solid #0f9488" : "3px solid transparent",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="truncate text-[13px] font-bold leading-5"
                      style={{ color: active ? "#0c766f" : "#25324a" }}
                    >
                      {property.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-[#8796ad]">
                      <MapPin size={11} />
                      {property.district} - {property.province}
                    </p>
                  </div>
                  <span className="rounded-md bg-[rgba(223,106,60,0.12)] px-1.5 py-0.5 text-[11px] font-bold text-coral">
                    {property.investmentScore}
                  </span>
                </div>

                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-[12px] font-bold text-teal">
                    {formatCurrency(property.ownerPrice)}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a0a9b8]">
                    Owner price
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
