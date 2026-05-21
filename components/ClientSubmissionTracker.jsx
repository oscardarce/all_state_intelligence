"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CalendarDays, FileText, ImageIcon, UserRound } from "lucide-react";
import { AppNavigation } from "@/components/AppNavigation";
import { findBrokerById } from "@/lib/brokers";
import { formatFileSize, getClientSubmissions } from "@/lib/clientSubmissions";

export function ClientSubmissionTracker() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(getClientSubmissions());
  }, []);

  const latestSubmission = submissions[0];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <AppNavigation />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal">
              Client View
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
              My property submission
            </h1>
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted">
              Review property information saved in this browser, including the chosen broker,
              parcel plan placeholder, photos, and current review status.
            </p>
          </div>
          <Link
            href="/submit-property"
            className="inline-flex rounded-md bg-teal px-4 py-2.5 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-[#0c766f]"
          >
            Submit another property
          </Link>
        </div>

        {submissions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {submissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-[#e2ddd5] bg-[#fffdf9] p-5 shadow-workspace">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal">
                Current Status
              </p>
              <div className="mt-4 rounded-lg border border-[rgba(15,148,136,0.2)] bg-[rgba(15,148,136,0.06)] p-4">
                <p className="text-[15px] font-extrabold text-ink">
                  {latestSubmission.status}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-muted">
                  All State Intelligence has received the local MVP submission record.
                  The next step is broker review and property intelligence validation.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-[#d8d1c8] bg-[#fffdf9] p-8 text-center shadow-workspace">
      <div className="max-w-md">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-[rgba(15,148,136,0.1)] text-teal">
          <Building2 size={24} />
        </div>
        <h2 className="mt-4 text-[20px] font-extrabold text-ink">No submissions yet</h2>
        <p className="mt-2 text-[13px] leading-6 text-muted">
          Submit a property first, then return here to review the saved local MVP record.
        </p>
        <Link
          href="/submit-property"
          className="mt-5 inline-flex rounded-md bg-teal px-4 py-2.5 text-[12px] font-extrabold text-white transition hover:bg-[#0c766f]"
        >
          Start property submission
        </Link>
      </div>
    </div>
  );
}

function SubmissionCard({ submission }) {
  const broker = useMemo(
    () => findBrokerById(submission.preferredBrokerId),
    [submission.preferredBrokerId]
  );
  const submittedDate = new Date(submission.submittedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden rounded-lg border border-[#e2ddd5] bg-[#fffdf9] shadow-workspace">
      <div className="flex flex-col gap-3 border-b border-[#e2ddd5] bg-[#f7f3ed] p-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal">
            {submission.status}
          </p>
          <h2 className="mt-1 truncate text-[21px] font-extrabold text-ink">
            {submission.property.title}
          </h2>
          <p className="mt-1 text-[12px] text-muted">
            {submission.property.district}, {submission.property.canton}, {submission.property.province}
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#66748a]">
          <CalendarDays size={13} className="text-teal" />
          {submittedDate}
        </p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="grid gap-2 sm:grid-cols-2">
            <DataItem label="Owner" value={submission.owner.fullName} />
            <DataItem label="Contact" value={submission.owner.email} />
            <DataItem label="Property type" value={submission.property.propertyType} />
            <DataItem label="Land size" value={`${submission.property.landSizeM2} m2`} />
            <DataItem label="Owner asking price" value={`$${Number(submission.property.ownerAskingPrice || 0).toLocaleString("en-US")}`} />
            <DataItem label="Estimated price / m2" value={submission.property.estimatedPricePerM2 ? `$${Number(submission.property.estimatedPricePerM2).toLocaleString("en-US")}` : "Pending"} />
            <DataItem label="Water" value={submission.property.waterAvailability || "Pending"} />
            <DataItem label="Electricity" value={submission.property.electricityAvailability || "Pending"} />
            <DataItem label="Road access" value={submission.property.roadAccess || "Pending"} wide />
            <DataItem label="Exact address" value={submission.property.exactAddress} wide />
          </div>

          {submission.property.notes ? (
            <div className="mt-3 rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
                Notes
              </p>
              <p className="mt-1 text-[13px] leading-6 text-[#344155]">{submission.property.notes}</p>
            </div>
          ) : null}
        </div>

        <aside className="space-y-3">
          <div className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
              <UserRound size={13} className="text-teal" />
              Selected broker
            </p>
            <p className="mt-2 text-[13px] font-extrabold text-ink">
              {broker?.name || "Broker pending"}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-muted">
              {broker?.specialty || "No broker profile found for this local record."}
            </p>
          </div>

          <div className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
              <FileText size={13} className="text-teal" />
              Parcel plan
            </p>
            {submission.parcelPlan ? (
              <>
                <p className="mt-2 truncate text-[13px] font-extrabold text-ink">
                  {submission.parcelPlan.name}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  {formatFileSize(submission.parcelPlan.size)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-[12px] text-muted">No parcel plan selected.</p>
            )}
          </div>

          <div className="rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
              <ImageIcon size={13} className="text-teal" />
              Photos
            </p>
            {submission.photos?.length ? (
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {submission.photos.slice(0, 6).map((photo, index) => (
                  <img
                    key={`${photo.name}-${index}`}
                    src={photo.dataUrl}
                    alt={photo.name}
                    className="h-16 w-full rounded object-cover"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[12px] text-muted">No photos selected.</p>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}

function DataItem({ label, value, wide = false }) {
  return (
    <div className={`rounded-md border border-[#e2ddd5] bg-[#f8f5ef] p-3 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a98ad]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-bold leading-5 text-ink">{value}</p>
    </div>
  );
}
