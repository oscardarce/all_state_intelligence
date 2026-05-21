"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Camera,
  FileText,
  Layers,
  MapIcon,
  Plus,
  X,
} from "lucide-react";
import { clearFormDraft, getFormDraft, setFormDraft } from "@/lib/formDrafts";
import { currentNoteDate, formatCurrency, formatNumber } from "@/lib/properties";

const tabs = [
  { id: "photos", label: "Photos", icon: Camera },
  { id: "comments", label: "Broker Comments", icon: FileText },
  { id: "parcel", label: "Parcel Plan", icon: MapIcon },
  { id: "infrastructure", label: "Infrastructure", icon: Building2 },
  { id: "comparables", label: "Comparable Properties", icon: BarChart3 },
  { id: "zoning", label: "Zoning", icon: Layers },
  { id: "risk", label: "Risk Analysis", icon: AlertTriangle },
];

const photoSlots = [
  { id: "satellite", title: "Satellite view", helper: "Site context" },
  { id: "frontage", title: "Street frontage", helper: "Road-facing view" },
  { id: "adjacent", title: "Adjacent lots", helper: "Neighbor context" },
  { id: "access", title: "Access road", helper: "Entry conditions" },
  { id: "additional", title: "Additional photo", helper: "Optional upload" },
];

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

export function WorkspaceTabs({ property, comparables, onAddNote }) {
  const [activeTab, setActiveTab] = useState("comments");
  const [photoUploadsByProperty, setPhotoUploadsByProperty] = useState({});
  const objectUrlsRef = useRef(new Set());

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  const savePhotoUpload = (slotId, file) => {
    const previewUrl = URL.createObjectURL(file);
    const previousUpload = photoUploadsByProperty[property.id]?.[slotId];

    objectUrlsRef.current.add(previewUrl);
    if (previousUpload?.url) {
      URL.revokeObjectURL(previousUpload.url);
      objectUrlsRef.current.delete(previousUpload.url);
    }

    setPhotoUploadsByProperty((current) => {
      const propertyUploads = current[property.id] || {};

      return {
        ...current,
        [property.id]: {
          ...propertyUploads,
          [slotId]: {
            fileName: file.name,
            type: file.type,
            url: previewUrl,
          },
        },
      };
    });
  };

  return (
    <section className="flex h-[286px] shrink-0 flex-col border-t border-[#e2ddd5] bg-[#fffdf9]">
      <div className="workspace-scroll flex min-h-[44px] shrink-0 overflow-x-auto border-b border-[#e2ddd5] bg-[#f7f3ed]">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = id === activeTab;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className="inline-flex shrink-0 items-center gap-2 border-b-2 px-4 text-[12px] font-bold transition"
              style={{
                borderColor: active ? "#0f9488" : "transparent",
                color: active ? "#0f9488" : "#66748a",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="workspace-scroll min-h-0 flex-1 overflow-y-auto">
        {activeTab === "photos" ? (
          <Photos
            property={property}
            uploads={photoUploadsByProperty[property.id] || {}}
            onUpload={savePhotoUpload}
          />
        ) : null}
        {activeTab === "comments" ? (
          <BrokerComments property={property} onAddNote={onAddNote} />
        ) : null}
        {activeTab === "parcel" ? <ParcelPlan property={property} /> : null}
        {activeTab === "infrastructure" ? <Infrastructure property={property} /> : null}
        {activeTab === "comparables" ? <Comparables comparables={comparables} /> : null}
        {activeTab === "zoning" ? <Zoning property={property} /> : null}
        {activeTab === "risk" ? <RiskAnalysis property={property} /> : null}
      </div>
    </section>
  );
}

function Photos({ property, uploads, onUpload }) {
  const fileInputRef = useRef(null);
  const [activeSlotId, setActiveSlotId] = useState(null);
  const [previewSlotId, setPreviewSlotId] = useState(null);
  const [error, setError] = useState("");

  const previewSlot = photoSlots.find((slot) => slot.id === previewSlotId);
  const previewUpload = previewSlot ? uploads[previewSlot.id] : null;

  const openFilePicker = (slotId) => {
    setActiveSlotId(slotId);
    setError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !activeSlotId) return;

    if (!file.type.startsWith("image/") || !allowedImageTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    onUpload(activeSlotId, file);
    setError("");
  };

  return (
    <>
      <div className="p-4">
        {error ? (
          <div className="mb-3 rounded-md border border-[rgba(223,106,60,0.28)] bg-[rgba(223,106,60,0.07)] px-3 py-2 text-[12px] font-semibold text-[#9a4c2d]">
            {error}
          </div>
        ) : null}

        <div className="flex gap-3 overflow-x-auto">
          {photoSlots.map((slot) => {
            const upload = uploads[slot.id];

            return (
              <article
                key={slot.id}
                className="relative h-36 w-48 shrink-0 overflow-hidden rounded-lg border border-[#e2ddd5] bg-[#f3efe8] shadow-sm"
              >
                {upload ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreviewSlotId(slot.id)}
                      className="group h-full w-full text-left"
                      aria-label={`Preview ${slot.title}`}
                    >
                      <img
                        src={upload.url}
                        alt={`${slot.title} for ${property.name}`}
                        className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(31,42,61,0.86)] to-transparent p-3">
                        <span className="block text-[12px] font-extrabold text-white">
                          {slot.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[#cde9e5]">
                          {upload.fileName}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openFilePicker(slot.id)}
                      className="absolute right-2 top-2 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[10px] font-extrabold text-teal shadow-sm transition hover:bg-[#edf8f6]"
                    >
                      Change photo
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openFilePicker(slot.id)}
                    className="relative flex h-full w-full flex-col items-center justify-center text-center transition hover:bg-[rgba(15,148,136,0.06)]"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,148,136,0.11),rgba(31,42,61,0.03))]" />
                    <span className="relative mx-auto grid h-9 w-9 place-items-center rounded-full bg-white text-teal shadow-sm">
                      {slot.id === "additional" ? <Plus size={18} /> : <Camera size={16} />}
                    </span>
                    <span className="relative mt-2 text-[12px] font-extrabold text-ink">
                      {slot.title}
                    </span>
                    <span className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8d98aa]">
                      {slot.helper}
                    </span>
                  </button>
                )}
              </article>
            );
          })}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {previewSlot && previewUpload ? (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-[rgba(31,42,61,0.68)] px-4 py-6"
          onClick={() => setPreviewSlotId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewSlot.title} preview`}
        >
          <div
            className="max-h-full w-full max-w-4xl overflow-hidden rounded-lg border border-[#e2ddd5] bg-[#fffdf9] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#e2ddd5] bg-[#f7f3ed] px-4 py-3">
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">
                  Photo preview
                </p>
                <h2 className="truncate text-[15px] font-extrabold text-ink">
                  {previewSlot.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewSlotId(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d8d1c8] bg-white text-[#536176] transition hover:border-teal hover:text-teal"
                aria-label="Close photo preview"
              >
                <X size={17} />
              </button>
            </div>
            <div className="bg-[#101827] p-3">
              <img
                src={previewUpload.url}
                alt={`${previewSlot.title} for ${property.name}`}
                className="mx-auto max-h-[72vh] w-auto max-w-full rounded-md object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function BrokerComments({ property, onAddNote }) {
  const draftKey = `dashboard-broker-comment:${property.id}`;
  const [draft, setDraft] = useState(() => getFormDraft(draftKey, ""));
  const notes = property.notes || [];

  useEffect(() => {
    setDraft(getFormDraft(draftKey, ""));
  }, [draftKey]);

  useEffect(() => {
    setFormDraft(draftKey, draft);
  }, [draftKey, draft]);

  const saveNote = () => {
    if (!draft.trim()) return;
    onAddNote({
      author: "Broker",
      date: currentNoteDate(),
      text: draft.trim(),
    });
    clearFormDraft(draftKey);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="space-y-2">
        {notes.length === 0 ? (
          <div className="rounded-md border border-dashed border-[#d8d1c8] bg-[#f8f5ef] p-4 text-[13px] text-muted">
            No broker comments yet. Add the first site observation below.
          </div>
        ) : (
          notes.map((note, index) => (
            <article
              key={`${note.author}-${note.date}-${index}`}
              className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-teal">
                  {note.author}
                </p>
                <span className="h-1 w-1 rounded-full bg-[#c8c0b6]" />
                <p className="text-[11px] font-semibold text-[#8d98aa]">{note.date}</p>
              </div>
              <p className="text-[13px] leading-6 text-[#344155]">{note.text}</p>
            </article>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={2}
          placeholder="Add an observation or investment note..."
          className="min-h-[50px] flex-1 resize-none rounded-md border border-[#d8d1c8] bg-white px-3 py-2 text-[13px] text-ink outline-none transition focus:border-teal"
        />
        <button
          type="button"
          onClick={saveNote}
          className="self-end rounded-md bg-teal px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-[#0c766f]"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function ParcelPlan({ property }) {
  const parcel = property.parcel || {};

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[180px_1fr]">
      <div className="grid h-40 place-items-center rounded-lg border border-[#e2ddd5] bg-[#f8f5ef]">
        <svg width="136" height="136" viewBox="0 0 136 136" aria-label="Parcel plan placeholder">
          {[22, 44, 66, 88, 110].map((line) => (
            <g key={line}>
              <line x1={line} y1="8" x2={line} y2="128" stroke="#e0d8cd" strokeWidth="1" />
              <line x1="8" y1={line} x2="128" y2={line} stroke="#e0d8cd" strokeWidth="1" />
            </g>
          ))}
          <polygon
            points="34,34 104,28 112,94 42,110"
            fill="rgba(15,148,136,0.12)"
            stroke="#0f9488"
            strokeWidth="2"
          />
          <circle cx="34" cy="34" r="3" fill="#0f9488" />
          <circle cx="104" cy="28" r="3" fill="#0f9488" />
          <circle cx="112" cy="94" r="3" fill="#0f9488" />
          <circle cx="42" cy="110" r="3" fill="#0f9488" />
          <text x="68" y="123" textAnchor="middle" fontSize="9" fill="#66748a">
            Parcel plan placeholder
          </text>
        </svg>
      </div>

      <div>
        <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">
          Cadastral Details
        </p>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <SmallMetric label="Registry ID" value={parcel.registryId || "Pending"} />
          <SmallMetric label="Registry Area" value={`${formatNumber(property.landSize)} m2`} />
          <SmallMetric label="Frontage" value={parcel.frontage || "Pending"} />
          <SmallMetric label="Depth" value={parcel.depth || "Pending"} />
          <SmallMetric label="Coverage" value={parcel.coverage || "Pending"} wide />
          <SmallMetric label="Land Use" value={property.landUse} wide />
        </div>
      </div>
    </div>
  );
}

function Infrastructure({ property }) {
  const nearbyServices = property.nearbyServices || [];
  const metrics = [
    ["Infrastructure", property.infrastructureScore],
    ["Liquidity", property.liquidityScore],
    ["Zoning fit", property.zoningFit],
    ["Risk score", property.riskScore],
  ];

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-4 gap-2">
        {metrics.map(([label, value]) => (
          <SmallMetric key={label} label={label} value={`${value}/100`} />
        ))}
      </div>

      <div className="grid gap-2 lg:grid-cols-2">
        {nearbyServices.map((service) => (
          <div
            key={service.name}
            className="flex items-center gap-3 rounded-md border border-[#e2ddd5] bg-[#f8f5ef] px-3 py-2"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-ink">{service.name}</p>
              <p className="text-[11px] text-muted">{service.note}</p>
            </div>
            <p className="text-[12px] font-extrabold text-teal">{service.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Comparables({ comparables }) {
  const comparableItems = comparables || [];

  return (
    <div className="flex gap-3 overflow-x-auto p-4">
      {comparableItems.map((comparable) => (
        <article
          key={comparable.id}
          className="w-64 shrink-0 rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[13px] font-extrabold text-ink">{comparable.name}</h3>
              <p className="mt-1 text-[11px] text-muted">{comparable.distanceKm} km from target</p>
            </div>
            <span className="rounded-md bg-[rgba(15,148,136,0.11)] px-2 py-1 text-[11px] font-extrabold text-teal">
              {comparable.similarityScore}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
            <MiniValue label="per m2" value={formatCurrency(comparable.pricePerM2)} />
            <MiniValue label="asking" value={formatCurrency(comparable.askingPrice)} />
            <MiniValue label="area" value={`${formatNumber(comparable.landSize)} m2`} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Zoning({ property }) {
  const zoning = property.zoning || {};

  return (
    <div className="grid gap-3 p-4 lg:grid-cols-3">
      <div className="rounded-md border border-[rgba(15,148,136,0.22)] bg-[rgba(15,148,136,0.06)] p-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal">
          Classification
        </p>
        <p className="mt-2 text-[14px] font-extrabold text-ink">
          {zoning.classification || "Pending classification"}
        </p>
        <p className="mt-1 text-[11px] text-muted">Municipality of {property.canton}</p>
      </div>

      <ListBlock title="Permitted Uses" color="#0f9488" items={zoning.permitted || []} />
      <ListBlock title="Restrictions" color="#df6a3c" items={zoning.restrictions || []} />
    </div>
  );
}

function RiskAnalysis({ property }) {
  const risks = property.risks || [];
  const level =
    property.riskScore < 30 ? "Low" : property.riskScore < 45 ? "Moderate" : "Elevated";
  const color = property.riskScore < 30 ? "#0f9488" : property.riskScore < 45 ? "#c47a22" : "#df6a3c";

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="rounded-md border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em]"
          style={{ borderColor: color, color, background: `${color}12` }}
        >
          Overall risk: {level}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e4ded6]">
          <div className="h-full rounded-full" style={{ width: `${property.riskScore}%`, background: color }} />
        </div>
        <span className="text-[12px] font-extrabold" style={{ color }}>
          {property.riskScore}/100
        </span>
      </div>

      <div className="grid gap-2 lg:grid-cols-3">
        {risks.map((risk) => (
          <div
            key={risk}
            className="flex items-start gap-2 rounded-md border border-[rgba(223,106,60,0.18)] bg-[rgba(223,106,60,0.05)] p-3"
          >
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-coral" />
            <p className="text-[12px] leading-5 text-[#344155]">{risk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmallMetric({ label, value, wide = false }) {
  return (
    <div
      className={`rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3 ${wide ? "lg:col-span-2" : ""}`}
    >
      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8d98aa]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-extrabold leading-5 text-ink">{value}</p>
    </div>
  );
}

function MiniValue({ label, value }) {
  return (
    <div className="rounded border border-[#e2ddd5] bg-white px-2 py-2">
      <p className="truncate text-[11px] font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8d98aa]">
        {label}
      </p>
    </div>
  );
}

function ListBlock({ title, color, items = [] }) {
  return (
    <div className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3">
      <p
        className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em]"
        style={{ color }}
      >
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[#344155]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
