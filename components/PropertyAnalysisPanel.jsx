"use client";

import { AlertTriangle, Edit2, MapPin, Sparkles } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/properties";

export function PropertyAnalysisPanel({ property, comparables, onEdit }) {
  const riskAdjusted = Math.max(0, 100 - property.riskScore);

  return (
    <aside className="flex h-full w-[430px] shrink-0 flex-col overflow-hidden border-l border-[#e2ddd5] bg-[#fffdf9]">
      <div className="shrink-0 border-b border-[#e2ddd5] bg-[#f7f3ed] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-teal">
              <Sparkles size={13} />
              Property Analysis
            </p>
            <h1 className="mt-2 truncate text-[17px] font-bold text-ink">{property.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-[12px] leading-5 text-muted">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{property.address}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[rgba(15,148,136,0.24)] bg-[rgba(15,148,136,0.08)] px-3 py-2 text-[12px] font-bold text-teal transition hover:bg-[rgba(15,148,136,0.14)]"
          >
            <Edit2 size={13} />
            Edit
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {property.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#e9e3da] px-2.5 py-1 text-[10px] font-bold text-[#536176]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="workspace-scroll min-h-0 flex-1 overflow-y-auto">
        <Section title="Property Data">
          <div className="grid grid-cols-2 gap-2">
            <DataCard label="Owner Price" value={formatCurrency(property.ownerPrice)} accent />
            <DataCard label="Market Price" value={formatCurrency(property.marketPrice)} />
            <DataCard label="Appraisal Price" value={formatCurrency(property.appraisalPrice)} />
            <DataCard label="Land Size" value={`${formatNumber(property.landSize)} m2`} />
            <DataCard label="Land Use" value={property.landUse} wide />
            <DataCard label="Property Type" value={property.propertyType} />
            <DataCard label="Price / m2" value={formatCurrency(property.pricePerM2)} accent />
            <DataCard label="District" value={`${property.district}, ${property.province}`} />
          </div>
          <PriceAlignment ownerPrice={property.ownerPrice} marketPrice={property.marketPrice} />
        </Section>

        <Section title="AI Investment Score">
          <div className="flex items-center gap-4">
            <ScoreRing score={property.investmentScore} />
            <div className="min-w-0 flex-1">
              <p>
                <span className="text-[28px] font-extrabold text-coral">
                  {property.investmentScore}
                </span>
                <span className="ml-1 text-[13px] font-semibold text-[#9ba6b7]">/ 100</span>
              </p>
              <p className="mt-1 text-[12px] leading-5 text-muted">
                {property.scoreExplanation}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <ScoreBar label="Liquidity" value={property.liquidityScore} />
            <ScoreBar label="Infrastructure" value={property.infrastructureScore} />
            <ScoreBar label="Zoning fit" value={property.zoningFit} />
            <ScoreBar label="Risk adjusted" value={riskAdjusted} warn={riskAdjusted < 66} />
          </div>

          <div className="mt-4 rounded-md border border-[rgba(223,106,60,0.2)] bg-[rgba(223,106,60,0.06)] p-3">
            <p className="flex items-start gap-2 text-[12px] leading-5 text-[#8b4a2d]">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              {property.ownerAlignment}
            </p>
          </div>
        </Section>

        <Section title="Nearby Services">
          <div className="space-y-3">
            {property.nearbyServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-ink">{service.name}</p>
                  <p className="text-[11px] text-[#8d98aa]">{service.note}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[12px] font-extrabold text-teal">{service.distance}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#a4acb9]">
                    {service.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Comparable Properties">
          <div className="space-y-2">
            {comparables.map((comparable) => (
              <div
                key={comparable.id}
                className="rounded-md border border-[#e4ded6] bg-[#f8f5ef] p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-ink">{comparable.name}</p>
                    <p className="mt-1 text-[11px] text-muted">
                      {comparable.distanceKm} km away - {formatCurrency(comparable.pricePerM2)}/m2
                    </p>
                  </div>
                  <span className="rounded bg-[rgba(15,148,136,0.11)] px-2 py-1 text-[11px] font-extrabold text-teal">
                    {comparable.similarityScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-b border-[#eee9e2] p-4">
      <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal">
        {title}
      </p>
      {children}
    </section>
  );
}

function DataCard({ label, value, accent = false, wide = false }) {
  return (
    <div
      className={`rounded-md border border-[#e4ded6] bg-[#f8f5ef] p-3 ${wide ? "col-span-2" : ""}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8d98aa]">
        {label}
      </p>
      <p
        className="mt-1 text-[13px] font-extrabold leading-5"
        style={{ color: accent ? "#df6a3c" : "#1f2a3d" }}
      >
        {value}
      </p>
    </div>
  );
}

function PriceAlignment({ ownerPrice, marketPrice }) {
  if (!ownerPrice || !marketPrice) return null;

  const diff = ((ownerPrice - marketPrice) / marketPrice) * 100;
  const label =
    diff > 5
      ? `${diff.toFixed(1)}% above market`
      : diff < -5
        ? `${Math.abs(diff).toFixed(1)}% below market`
        : "Aligned with market";
  const color = diff > 5 ? "#df6a3c" : diff < -5 ? "#0f9488" : "#c47a22";

  return (
    <div className="mt-2 flex items-center justify-between rounded-md border border-[#e4ded6] bg-white px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8d98aa]">
        Owner vs. market
      </p>
      <p className="text-[11px] font-extrabold" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

function ScoreRing({ score }) {
  const size = 72;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e4ded6"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0f9488"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-[18px] font-extrabold text-coral">
        {score}
      </div>
    </div>
  );
}

function ScoreBar({ label, value, warn = false }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-[#8d98aa]">{label}</p>
        <p className="text-[12px] font-extrabold text-ink">{value}</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#e4ded6]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: warn ? "#df6a3c" : "#0f9488" }}
        />
      </div>
    </div>
  );
}
