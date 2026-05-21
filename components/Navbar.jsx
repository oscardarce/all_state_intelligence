"use client";

import Link from "next/link";
import { Building2, ChevronDown, Home, Plus, RotateCcw } from "lucide-react";

export function Navbar({
  filters,
  options,
  propertyCount,
  onFilterChange,
  onClearFilters,
  onAddProperty,
}) {
  const hasFilters = filters.province || filters.canton || filters.district;

  return (
    <header className="z-20 flex min-h-[58px] shrink-0 items-center gap-3 border-b border-[#e2ddd5] bg-[#fffdf9] px-4 shadow-sm">
      <div className="flex shrink-0 items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal text-white shadow-sm">
          <Building2 size={18} />
        </div>
        <div className="leading-none">
          <p className="text-[14px] font-bold tracking-tight text-ink">All State Intelligence</p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8a98ad]">
            Property Intelligence
          </p>
        </div>
      </div>

      <div className="hidden h-5 w-px shrink-0 bg-[#e2ddd5] md:block" />

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        <FilterSelect
          label="Province"
          value={filters.province}
          options={options.provinces}
          onChange={(value) =>
            onFilterChange({ province: value, canton: "", district: "" })
          }
        />
        <FilterSelect
          label="Canton"
          value={filters.canton}
          options={options.cantons}
          disabled={!filters.province}
          onChange={(value) =>
            onFilterChange({ ...filters, canton: value, district: "" })
          }
        />
        <FilterSelect
          label="District"
          value={filters.district}
          options={options.districts}
          disabled={!filters.canton}
          onChange={(value) => onFilterChange({ ...filters, district: value })}
        />
        {hasFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-[#d8d1c8] bg-[#f5f1eb] px-3 text-[12px] font-semibold text-muted transition hover:border-teal hover:text-teal"
          >
            <RotateCcw size={13} />
            Clear
          </button>
        ) : null}
      </div>

      <div className="hidden shrink-0 text-[12px] font-medium text-[#8a98ad] sm:block">
        {propertyCount} {propertyCount === 1 ? "property" : "properties"}
      </div>

      <button
        type="button"
        onClick={onAddProperty}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-teal px-3.5 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#0c766f]"
      >
        <Plus size={14} />
        Add Property
      </button>

      <Link
        href="/"
        className="inline-flex h-9 shrink-0 items-center gap-1 rounded-md px-2 text-[12px] font-semibold text-[#8a98ad] transition hover:bg-[#f5f1eb] hover:text-teal"
      >
        <Home size={13} />
        <span className="hidden lg:inline">Home</span>
      </Link>
    </header>
  );
}

function FilterSelect({ label, value, options, onChange, disabled = false }) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-9 min-w-[118px] appearance-none rounded-md border bg-[#f7f3ed] pl-3 pr-8 text-[12px] font-semibold outline-none transition disabled:cursor-not-allowed disabled:opacity-55"
        style={{
          borderColor: value ? "rgba(15, 148, 136, 0.42)" : "#d8d1c8",
          color: value ? "#0f9488" : "#344155",
        }}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a98ad]"
      />
    </div>
  );
}
