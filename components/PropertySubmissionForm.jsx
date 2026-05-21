"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, ImagePlus, Trash2 } from "lucide-react";
import { AppNavigation } from "@/components/AppNavigation";
import { mockBrokers, selectedBrokerStorageKey } from "@/lib/brokers";
import { addClientSubmission, formatFileSize, readFileAsDataUrl } from "@/lib/clientSubmissions";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const emptyForm = {
  ownerFullName: "",
  ownerEmail: "",
  ownerPhone: "",
  propertyTitle: "",
  province: "",
  canton: "",
  district: "",
  exactAddress: "",
  propertyType: "",
  landSizeM2: "",
  ownerAskingPrice: "",
  estimatedPricePerM2: "",
  landUse: "",
  servicesAvailable: "",
  waterAvailability: "",
  electricityAvailability: "",
  roadAccess: "",
  notes: "",
  preferredBrokerId: "",
};

const propertyTypes = [
  "Urban lot",
  "Development land",
  "Residential redevelopment",
  "Tourism development land",
  "Commercial",
  "Industrial",
  "Agricultural land",
];

export function PropertySubmissionForm() {
  const [form, setForm] = useState(emptyForm);
  const [parcelPlan, setParcelPlan] = useState(null);
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [error, setError] = useState("");
  const [successSubmission, setSuccessSubmission] = useState(null);

  useEffect(() => {
    const selectedBrokerId = window.localStorage.getItem(selectedBrokerStorageKey) || "";
    if (selectedBrokerId) {
      setForm((current) => ({ ...current, preferredBrokerId: selectedBrokerId }));
    }
  }, []);

  const selectedBroker = useMemo(
    () => mockBrokers.find((broker) => broker.id === form.preferredBrokerId),
    [form.preferredBrokerId]
  );

  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "preferredBrokerId" && value) {
      window.localStorage.setItem(selectedBrokerStorageKey, value);
    }
  };

  const handleParcelPlan = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setParcelPlan({
      name: file.name,
      type: file.type || "document",
      size: file.size,
    });
  };

  const handlePhotos = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (files.length === 0) return;

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/") || !allowedImageTypes.includes(file.type)
    );
    if (invalidFile) {
      setError("Please upload property photos as JPG, PNG, or WEBP images.");
      return;
    }

    try {
      const nextPhotos = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );
      setPropertyPhotos((current) => [...current, ...nextPhotos].slice(0, 8));
      setError("");
    } catch {
      setError("One or more images could not be previewed. Please try again.");
    }
  };

  const removePhoto = (indexToRemove) => {
    setPropertyPhotos((current) => current.filter((_, index) => index !== indexToRemove));
  };

  const validate = () => {
    const requiredFields = [
      ["ownerFullName", "Owner full name is required."],
      ["ownerEmail", "Owner email is required."],
      ["ownerPhone", "Owner phone is required."],
      ["propertyTitle", "Property title is required."],
      ["province", "Province is required."],
      ["canton", "Canton is required."],
      ["district", "District is required."],
      ["exactAddress", "Exact address is required."],
      ["propertyType", "Property type is required."],
      ["landSizeM2", "Land size is required."],
      ["ownerAskingPrice", "Owner asking price is required."],
      ["preferredBrokerId", "Please choose a preferred broker."],
    ];
    const missing = requiredFields.find(([key]) => !String(form[key]).trim());

    if (missing) return missing[1];
    if (!form.ownerEmail.includes("@")) return "Please enter a valid owner email address.";
    return "";
  };

  const submit = (event) => {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const submission = addClientSubmission({
      owner: {
        fullName: form.ownerFullName.trim(),
        email: form.ownerEmail.trim(),
        phone: form.ownerPhone.trim(),
      },
      property: {
        title: form.propertyTitle.trim(),
        province: form.province.trim(),
        canton: form.canton.trim(),
        district: form.district.trim(),
        exactAddress: form.exactAddress.trim(),
        propertyType: form.propertyType,
        landSizeM2: form.landSizeM2,
        ownerAskingPrice: form.ownerAskingPrice,
        estimatedPricePerM2: form.estimatedPricePerM2,
        landUse: form.landUse.trim(),
        servicesAvailable: form.servicesAvailable.trim(),
        waterAvailability: form.waterAvailability,
        electricityAvailability: form.electricityAvailability,
        roadAccess: form.roadAccess,
        notes: form.notes.trim(),
      },
      preferredBrokerId: form.preferredBrokerId,
      parcelPlan,
      photos: propertyPhotos,
    });

    setSuccessSubmission(submission);
    setError("");
    setForm({ ...emptyForm, preferredBrokerId: form.preferredBrokerId });
    setParcelPlan(null);
    setPropertyPhotos([]);
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <AppNavigation />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal">
              Client Property Submission
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
              Submit a property for intelligence review
            </h1>
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted">
              Share owner details, property data, photos, and the preferred Alfaro PropTech
              broker. This MVP stores submissions locally in this browser.
            </p>
          </div>

          <aside className="rounded-lg border border-[rgba(15,148,136,0.2)] bg-[#fffdf9] p-4 shadow-workspace">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal">
              Preferred broker
            </p>
            {selectedBroker ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[rgba(15,148,136,0.12)] text-[13px] font-extrabold text-teal">
                  {selectedBroker.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-extrabold text-ink">
                    {selectedBroker.name}
                  </p>
                  <p className="truncate text-[11px] text-muted">{selectedBroker.specialty}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-[12px] leading-5 text-muted">
                Choose a broker below or start from the broker profiles page.
              </p>
            )}
          </aside>
        </div>

        {successSubmission ? (
          <div className="mb-5 rounded-lg border border-[rgba(15,148,136,0.28)] bg-[rgba(15,148,136,0.08)] p-4">
            <p className="flex items-center gap-2 text-[14px] font-extrabold text-teal">
              <CheckCircle2 size={18} />
              Property submission received
            </p>
            <p className="mt-1 text-[13px] text-[#344155]">
              {successSubmission.property.title} is now saved locally for review.
            </p>
            <Link
              href="/my-property-submission"
              className="mt-3 inline-flex rounded-md bg-teal px-3 py-2 text-[12px] font-extrabold text-white transition hover:bg-[#0c766f]"
            >
              View my submission
            </Link>
          </div>
        ) : null}

        {error ? (
          <div className="mb-5 rounded-lg border border-[rgba(223,106,60,0.28)] bg-[rgba(223,106,60,0.07)] px-4 py-3 text-[13px] font-semibold text-[#9a4c2d]">
            {error}
          </div>
        ) : null}

        <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <FormSection title="Owner Information">
              <Field label="Owner full name" required>
                <input value={form.ownerFullName} onChange={update("ownerFullName")} className="form-field" />
              </Field>
              <Field label="Owner email" required>
                <input value={form.ownerEmail} onChange={update("ownerEmail")} type="email" className="form-field" />
              </Field>
              <Field label="Owner phone" required>
                <input value={form.ownerPhone} onChange={update("ownerPhone")} className="form-field" />
              </Field>
            </FormSection>

            <FormSection title="Property Data">
              <Field label="Property title" required wide>
                <input value={form.propertyTitle} onChange={update("propertyTitle")} className="form-field" />
              </Field>
              <Field label="Province" required>
                <input value={form.province} onChange={update("province")} className="form-field" />
              </Field>
              <Field label="Canton" required>
                <input value={form.canton} onChange={update("canton")} className="form-field" />
              </Field>
              <Field label="District" required>
                <input value={form.district} onChange={update("district")} className="form-field" />
              </Field>
              <Field label="Property type" required>
                <select value={form.propertyType} onChange={update("propertyType")} className="form-field">
                  <option value="">Select property type</option>
                  {propertyTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </Field>
              <Field label="Exact address" required wide>
                <textarea value={form.exactAddress} onChange={update("exactAddress")} rows={3} className="form-field resize-none" />
              </Field>
              <Field label="Land size in m2" required>
                <input value={form.landSizeM2} onChange={update("landSizeM2")} type="number" min="1" className="form-field" />
              </Field>
              <Field label="Owner asking price" required>
                <input value={form.ownerAskingPrice} onChange={update("ownerAskingPrice")} type="number" min="0" className="form-field" />
              </Field>
              <Field label="Estimated price per m2">
                <input value={form.estimatedPricePerM2} onChange={update("estimatedPricePerM2")} type="number" min="0" className="form-field" />
              </Field>
              <Field label="Land use">
                <input value={form.landUse} onChange={update("landUse")} className="form-field" />
              </Field>
            </FormSection>

            <FormSection title="Services and Access">
              <Field label="Services available" wide>
                <textarea
                  value={form.servicesAvailable}
                  onChange={update("servicesAvailable")}
                  rows={3}
                  placeholder="Water, electricity, internet, sewer, stormwater, nearby public services..."
                  className="form-field resize-none"
                />
              </Field>
              <Field label="Water availability">
                <AvailabilitySelect value={form.waterAvailability} onChange={update("waterAvailability")} />
              </Field>
              <Field label="Electricity availability">
                <AvailabilitySelect value={form.electricityAvailability} onChange={update("electricityAvailability")} />
              </Field>
              <Field label="Road access">
                <select value={form.roadAccess} onChange={update("roadAccess")} className="form-field">
                  <option value="">Select road access</option>
                  <option>Paved public road</option>
                  <option>Gravel public road</option>
                  <option>Private road</option>
                  <option>Access needs validation</option>
                </select>
              </Field>
              <Field label="Notes / comments" wide>
                <textarea value={form.notes} onChange={update("notes")} rows={4} className="form-field resize-none" />
              </Field>
            </FormSection>
          </div>

          <aside className="space-y-5">
            <FormSection title="Broker Selection" compact>
              <Field label="Preferred broker" required wide>
                <select value={form.preferredBrokerId} onChange={update("preferredBrokerId")} className="form-field">
                  <option value="">Select broker</option>
                  {mockBrokers.map((broker) => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name} - {broker.location}
                    </option>
                  ))}
                </select>
              </Field>
              <Link href="/brokers" className="text-[12px] font-extrabold text-teal hover:text-[#0c766f]">
                Compare broker profiles
              </Link>
            </FormSection>

            <FormSection title="Parcel Plan Upload" compact>
              <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-[rgba(15,148,136,0.35)] bg-[rgba(15,148,136,0.05)] px-4 py-6 text-center transition hover:bg-[rgba(15,148,136,0.09)]">
                <FileText size={22} className="text-teal" />
                <span className="mt-2 text-[12px] font-extrabold text-teal">Choose parcel plan</span>
                <span className="mt-1 text-[11px] text-muted">PDF or image placeholder</span>
                <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={handleParcelPlan} className="hidden" />
              </label>
              {parcelPlan ? (
                <div className="rounded-md border border-[#e2ddd5] bg-white px-3 py-2">
                  <p className="truncate text-[12px] font-extrabold text-ink">{parcelPlan.name}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8a98ad]">
                    {formatFileSize(parcelPlan.size)}
                  </p>
                </div>
              ) : null}
            </FormSection>

            <FormSection title="Property Photos" compact>
              <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-[rgba(15,148,136,0.35)] bg-[rgba(15,148,136,0.05)] px-4 py-6 text-center transition hover:bg-[rgba(15,148,136,0.09)]">
                <ImagePlus size={22} className="text-teal" />
                <span className="mt-2 text-[12px] font-extrabold text-teal">Upload photos</span>
                <span className="mt-1 text-[11px] text-muted">JPG, PNG, or WEBP</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePhotos} className="hidden" />
              </label>

              {propertyPhotos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {propertyPhotos.map((photo, index) => (
                    <div key={`${photo.name}-${index}`} className="group relative overflow-hidden rounded-md border border-[#e2ddd5] bg-[#f8f5ef]">
                      <img src={photo.dataUrl} alt={photo.name} className="h-24 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-[#536176] shadow-sm transition hover:text-coral"
                        aria-label={`Remove ${photo.name}`}
                      >
                        <Trash2 size={13} />
                      </button>
                      <p className="truncate px-2 py-1.5 text-[10px] font-bold text-[#536176]">
                        {photo.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </FormSection>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal px-5 py-3 text-[13px] font-extrabold text-white shadow-workspace transition hover:bg-[#0c766f]"
            >
              Submit Property for Review
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}

function FormSection({ title, children, compact = false }) {
  return (
    <section className="rounded-lg border border-[#e2ddd5] bg-[#fffdf9] p-5 shadow-workspace">
      <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal">
        {title}
      </p>
      <div className={compact ? "space-y-3" : "grid gap-3 md:grid-cols-2"}>{children}</div>
    </section>
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

function AvailabilitySelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="form-field">
      <option value="">Select availability</option>
      <option>Available and connected</option>
      <option>Available nearby</option>
      <option>Not available</option>
      <option>Needs validation</option>
    </select>
  );
}
