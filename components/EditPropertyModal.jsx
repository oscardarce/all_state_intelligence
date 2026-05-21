"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function EditPropertyModal({ property, onSave, onCancel }) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(() => propertyToForm(property));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setForm(propertyToForm(property));
  }, [property]);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const ownerPrice = Number(form.ownerPrice) || 0;
    const marketPrice = Number(form.marketPrice) || 0;
    const appraisalPrice = Number(form.appraisalPrice) || 0;
    const landSize = Number(form.landSize) || 1;
    const pricePerM2 = Number(form.pricePerM2) || Math.round(ownerPrice / landSize);

    onSave({
      ...property,
      name: form.name.trim() || property.name,
      title: form.name.trim() || property.title || property.name,
      province: form.province.trim() || property.province,
      canton: form.canton.trim() || property.canton,
      district: form.district.trim() || property.district,
      address: form.address.trim() || property.address,
      latitude: Number(form.lat) || property.coordinates.lat,
      longitude: Number(form.lng) || property.coordinates.lng,
      coordinates: {
        lat: Number(form.lat) || property.coordinates.lat,
        lng: Number(form.lng) || property.coordinates.lng,
      },
      ownerPrice,
      marketPrice,
      appraisalPrice,
      landSize,
      landSizeM2: landSize,
      landUse: form.landUse.trim() || property.landUse,
      propertyType: form.propertyType,
      pricePerM2,
      tags: [
        form.province.trim() || property.province,
        form.canton.trim() || property.canton,
        form.propertyType,
      ],
      ownerAlignment: buildOwnerAlignment(ownerPrice, marketPrice),
    });
  };

  if (!mounted) return null;

  return createPortal(
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
            <h2 className="text-[18px] font-extrabold text-ink">Edit Property</h2>
            <p className="mt-1 text-[12px] text-muted">
              Update the selected property profile and market assumptions.
            </p>
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

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="workspace-scroll grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto p-5 md:grid-cols-2">
            <Field label="Property Name" required wide>
              <input required value={form.name} onChange={update("name")} className="form-field" />
            </Field>

            <Field label="Province" required>
              <input required value={form.province} onChange={update("province")} className="form-field" />
            </Field>
            <Field label="Canton" required>
              <input required value={form.canton} onChange={update("canton")} className="form-field" />
            </Field>
            <Field label="District" required>
              <input required value={form.district} onChange={update("district")} className="form-field" />
            </Field>
            <Field label="Property Type">
              <select value={form.propertyType} onChange={update("propertyType")} className="form-field">
                <option>Urban lot</option>
                <option>Development land</option>
                <option>Residential redevelopment</option>
                <option>Tourism development land</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </Field>

            <Field label="Address" wide>
              <input value={form.address} onChange={update("address")} className="form-field" />
            </Field>

            <Field label="Latitude">
              <input value={form.lat} onChange={update("lat")} type="number" step="any" className="form-field" />
            </Field>
            <Field label="Longitude">
              <input value={form.lng} onChange={update("lng")} type="number" step="any" className="form-field" />
            </Field>

            <Field label="Owner Price" required>
              <input required value={form.ownerPrice} onChange={update("ownerPrice")} type="number" min="0" className="form-field" />
            </Field>
            <Field label="Market Price" required>
              <input required value={form.marketPrice} onChange={update("marketPrice")} type="number" min="0" className="form-field" />
            </Field>
            <Field label="Appraisal Price" required>
              <input required value={form.appraisalPrice} onChange={update("appraisalPrice")} type="number" min="0" className="form-field" />
            </Field>
            <Field label="Land Size (m2)" required>
              <input required value={form.landSize} onChange={update("landSize")} type="number" min="1" className="form-field" />
            </Field>
            <Field label="Price per m2">
              <input value={form.pricePerM2} onChange={update("pricePerM2")} type="number" min="0" className="form-field" />
            </Field>
            <Field label="Land Use">
              <input value={form.landUse} onChange={update("landUse")} className="form-field" />
            </Field>
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function propertyToForm(property) {
  return {
    name: property.name,
    province: property.province,
    canton: property.canton,
    district: property.district,
    address: property.address,
    lat: String(property.coordinates.lat),
    lng: String(property.coordinates.lng),
    ownerPrice: String(property.ownerPrice),
    marketPrice: String(property.marketPrice),
    appraisalPrice: String(property.appraisalPrice),
    landSize: String(property.landSize),
    landUse: property.landUse,
    propertyType: property.propertyType,
    pricePerM2: String(property.pricePerM2),
  };
}

function buildOwnerAlignment(ownerPrice, marketPrice) {
  if (!ownerPrice || !marketPrice) {
    return "Market support is provisional until complete pricing data is available.";
  }

  const diff = ((ownerPrice - marketPrice) / marketPrice) * 100;
  if (diff > 5) {
    return "Owner price is above market support. Use comparable evidence to negotiate before investor presentation.";
  }
  if (diff < -5) {
    return "Owner price is below current market support. This may justify a faster investor review after diligence.";
  }
  return "Owner price is aligned with market support, pending zoning and infrastructure validation.";
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
