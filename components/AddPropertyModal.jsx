"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { makePropertyFromForm } from "@/lib/properties";

const emptyForm = {
  name: "",
  province: "",
  canton: "",
  district: "",
  address: "",
  lat: "",
  lng: "",
  ownerPrice: "",
  landSize: "",
  landUse: "",
  propertyType: "Urban lot",
  pricePerM2: "",
  notes: "",
};

export function AddPropertyModal({ onSave, onCancel }) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setMounted(true);
  }, []);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSave(makePropertyFromForm(form));
  };

  if (!mounted) return null;

  return createPortal(
    <ModalFrame title="Add Property" subtitle="Create a new broker intake record." onCancel={onCancel}>
      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
        <div className="workspace-scroll grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto p-5 md:grid-cols-2">
          <Field label="Property Name" required wide>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Sabana Norte Redevelopment Site"
              className="form-field"
            />
          </Field>

          <Field label="Province" required>
            <input required value={form.province} onChange={update("province")} placeholder="San Jose" className="form-field" />
          </Field>
          <Field label="Canton" required>
            <input required value={form.canton} onChange={update("canton")} placeholder="Escazu" className="form-field" />
          </Field>
          <Field label="District" required>
            <input required value={form.district} onChange={update("district")} placeholder="San Rafael" className="form-field" />
          </Field>
          <Field label="Property Type">
            <PropertyTypeSelect value={form.propertyType} onChange={update("propertyType")} />
          </Field>

          <Field label="Address" wide>
            <input
              value={form.address}
              onChange={update("address")}
              placeholder="Street, landmark, or broker reference"
              className="form-field"
            />
          </Field>

          <Field label="Latitude">
            <input value={form.lat} onChange={update("lat")} type="number" step="any" placeholder="9.9281" className="form-field" />
          </Field>
          <Field label="Longitude">
            <input value={form.lng} onChange={update("lng")} type="number" step="any" placeholder="-84.0907" className="form-field" />
          </Field>

          <Field label="Owner Price" required>
            <input required value={form.ownerPrice} onChange={update("ownerPrice")} type="number" min="0" placeholder="950000" className="form-field" />
          </Field>
          <Field label="Land Size (m2)" required>
            <input required value={form.landSize} onChange={update("landSize")} type="number" min="1" placeholder="1500" className="form-field" />
          </Field>
          <Field label="Price per m2">
            <input value={form.pricePerM2} onChange={update("pricePerM2")} type="number" min="0" placeholder="Auto calculated" className="form-field" />
          </Field>
          <Field label="Land Use">
            <input value={form.landUse} onChange={update("landUse")} placeholder="Mixed-use commercial corridor" className="form-field" />
          </Field>

          <Field label="Notes" wide>
            <textarea
              value={form.notes}
              onChange={update("notes")}
              rows={4}
              placeholder="Initial observations, owner context, access conditions, or visit notes..."
              className="form-field resize-none"
            />
          </Field>
        </div>

        <ModalActions onCancel={onCancel} submitLabel="Save Property" />
      </form>
    </ModalFrame>,
    document.body
  );
}

function ModalFrame({ title, subtitle, onCancel, children }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(31,42,61,0.48)] p-4 backdrop-blur-sm"
      style={{ zIndex: 10000 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div className="soft-rise flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#ddd6cc] bg-[#fffdf9] shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e2ddd5] bg-[#f7f3ed] px-5 py-4">
          <div>
            <h2 className="text-[18px] font-extrabold text-ink">{title}</h2>
            <p className="mt-1 text-[12px] text-muted">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-2 text-[#8d98aa] transition hover:bg-white hover:text-ink"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, required = false, wide = false }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8d98aa]">
        {label}
        {required ? <span className="ml-1 text-coral">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function PropertyTypeSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="form-field">
      <option>Urban lot</option>
      <option>Development land</option>
      <option>Residential redevelopment</option>
      <option>Tourism development land</option>
      <option>Commercial</option>
      <option>Industrial</option>
    </select>
  );
}

function ModalActions({ onCancel, submitLabel }) {
  return (
    <div className="flex shrink-0 justify-end gap-2 border-t border-[#e2ddd5] bg-[#fffdf9] px-5 py-4">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-[#d8d1c8] bg-[#f7f3ed] px-4 py-2 text-[13px] font-bold text-muted transition hover:text-ink"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-teal px-4 py-2 text-[13px] font-extrabold text-white transition hover:bg-[#0c766f]"
      >
        {submitLabel}
      </button>
    </div>
  );
}
