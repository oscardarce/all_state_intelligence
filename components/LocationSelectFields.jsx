"use client";

import {
  getCantonOptions,
  getDistrictLocation,
  getDistrictOptions,
  getProvinceOptions,
} from "@/lib/locations";

export function LocationSelectFields({
  values,
  onPatch,
  latKey = "lat",
  lngKey = "lng",
  showCoordinateInputs = true,
}) {
  const province = values.province || "";
  const canton = values.canton || "";
  const district = values.district || "";
  const latitude = values[latKey] || "";
  const longitude = values[lngKey] || "";

  const provinceOptions = withCurrentOption(getProvinceOptions(), province);
  const cantonOptions = withCurrentOption(getCantonOptions(province), canton);
  const districtOptions = withCurrentOption(getDistrictOptions(province, canton), district);

  const updateCoordinates = (location) => ({
    [latKey]: location ? String(location.lat) : "",
    [lngKey]: location ? String(location.lng) : "",
  });

  const handleProvince = (event) => {
    onPatch({
      province: event.target.value,
      canton: "",
      district: "",
      ...updateCoordinates(null),
    });
  };

  const handleCanton = (event) => {
    onPatch({
      canton: event.target.value,
      district: "",
      ...updateCoordinates(null),
    });
  };

  const handleDistrict = (event) => {
    const nextDistrict = event.target.value;
    const location = getDistrictLocation(province, canton, nextDistrict);

    onPatch({
      district: nextDistrict,
      ...updateCoordinates(location),
    });
  };

  const handleCoordinate = (key) => (event) => {
    onPatch({ [key]: event.target.value });
  };

  return (
    <>
      <SelectField label="Province" required>
        <select required value={province} onChange={handleProvince} className="form-field">
          <option value="">Select province</option>
          {provinceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </SelectField>

      <SelectField label="Canton" required>
        <select
          required
          value={canton}
          onChange={handleCanton}
          disabled={!province}
          className="form-field disabled:cursor-not-allowed disabled:bg-[#ebe5dd] disabled:text-[#9aa5b5]"
        >
          <option value="">Select canton</option>
          {cantonOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </SelectField>

      <SelectField label="District" required>
        <select
          required
          value={district}
          onChange={handleDistrict}
          disabled={!province || !canton}
          className="form-field disabled:cursor-not-allowed disabled:bg-[#ebe5dd] disabled:text-[#9aa5b5]"
        >
          <option value="">Select district</option>
          {districtOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </SelectField>

      {showCoordinateInputs ? (
        <>
          <SelectField label="Latitude">
            <input
              value={latitude}
              onChange={handleCoordinate(latKey)}
              type="number"
              step="any"
              placeholder="Auto from district"
              className="form-field"
            />
          </SelectField>
          <SelectField label="Longitude">
            <input
              value={longitude}
              onChange={handleCoordinate(lngKey)}
              type="number"
              step="any"
              placeholder="Auto from district"
              className="form-field"
            />
          </SelectField>
        </>
      ) : null}

      <div className="md:col-span-2 rounded-md border border-[rgba(15,148,136,0.22)] bg-[rgba(15,148,136,0.06)] px-3 py-2.5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal">
          Property coordinates
        </p>
        <p className="mt-1 text-[12px] font-bold text-[#344155]">
          {formatCoordinate(latitude, longitude)}
        </p>
        <p className="mt-1 text-[11px] leading-5 text-muted">
          Coordinates are filled from the selected district and can be adjusted when an exact site pin is known.
        </p>
      </div>
    </>
  );
}

function SelectField({ label, children, required = false }) {
  return (
    <label>
      <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8d98aa]">
        {label}
        {required ? <span className="ml-1 text-coral">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function withCurrentOption(options, current) {
  if (!current || options.includes(current)) return options;
  return [current, ...options];
}

function formatCoordinate(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return "Select province, canton, and district to load coordinates.";
  }

  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}
