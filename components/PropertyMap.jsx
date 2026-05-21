"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Layers, Maximize2 } from "lucide-react";
import { formatCurrency } from "@/lib/properties";

const DEFAULT_ZOOM = 16;

export function PropertyMap({
  properties,
  selectedProperty,
  visiblePropertyIds,
  comparables,
  onSelectProperty,
}) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const layerGroupRef = useRef(null);
  const [ready, setReady] = useState(false);

  const visibleIds = useMemo(() => new Set(visiblePropertyIds), [visiblePropertyIds]);
  const comparableIds = useMemo(() => new Set(comparables.map((item) => item.id)), [comparables]);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      const leafletModule = await import("leaflet");
      if (cancelled || !mapEl.current || mapRef.current) return;

      const L = leafletModule.default || leafletModule;
      leafletRef.current = L;

      const map = L.map(mapEl.current, {
        center: [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng],
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: true,
        minZoom: 7,
        maxZoom: 19,
      });

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
          attribution: "Imagery Esri, Maxar, Earthstar Geographics, GIS Community",
        }
      ).addTo(map);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19, opacity: 0.82 }
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);

      mapRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
      setReady(true);

      setTimeout(() => map.invalidateSize(), 120);
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerGroupRef.current = null;
        leafletRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current || !leafletRef.current || !layerGroupRef.current) return;

    const L = leafletRef.current;
    const group = layerGroupRef.current;
    group.clearLayers();

    const selectedPosition = [
      selectedProperty.coordinates.lat,
      selectedProperty.coordinates.lng,
    ];

    L.circle(selectedPosition, {
      radius: 560,
      color: "#df6a3c",
      weight: 1.6,
      opacity: 0.72,
      fillColor: "#df6a3c",
      fillOpacity: 0.06,
      dashArray: "6 8",
      interactive: false,
    }).addTo(group);

    L.polygon(buildParcelPolygon(selectedProperty), {
      color: "#df6a3c",
      weight: 2,
      opacity: 0.95,
      fillColor: "#df6a3c",
      fillOpacity: 0.18,
      interactive: false,
    }).addTo(group);

    const renderableProperties = properties.filter(
      (property) => visibleIds.has(property.id) || property.id === selectedProperty.id
    );

    renderableProperties.forEach((property) => {
      const isSelected = property.id === selectedProperty.id;
      const isComparable = comparableIds.has(property.id);

      if (!isSelected && !isComparable) return;

      const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
        icon: buildMarkerIcon(L, property, { isSelected, isComparable }),
        zIndexOffset: isSelected ? 1000 : 250,
      }).addTo(group);

      marker.on("click", () => onSelectProperty(property.id));
    });

    mapRef.current.flyTo(selectedPosition, DEFAULT_ZOOM, {
      animate: true,
      duration: 0.9,
      easeLinearity: 0.35,
    });
  }, [
    ready,
    properties,
    selectedProperty,
    visibleIds,
    comparableIds,
    onSelectProperty,
  ]);

  const showAll = () => {
    if (!mapRef.current || !leafletRef.current) return;
    const L = leafletRef.current;
    const coordinates = properties
      .filter((property) => visibleIds.has(property.id))
      .map((property) => [property.coordinates.lat, property.coordinates.lng]);

    if (coordinates.length === 0) return;
    if (coordinates.length === 1) {
      mapRef.current.flyTo(coordinates[0], DEFAULT_ZOOM, { animate: true, duration: 0.8 });
      return;
    }

    mapRef.current.flyToBounds(L.latLngBounds(coordinates).pad(0.18), {
      animate: true,
      duration: 0.9,
    });
  };

  return (
    <section className="relative min-h-0 flex-1 overflow-hidden bg-[#172033]">
      <div ref={mapEl} className="h-full w-full" />

      {!ready ? (
        <div className="absolute inset-0 grid place-items-center bg-[#172033]">
          <div className="text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-teal border-t-transparent" />
            <p className="mt-3 text-[13px] font-semibold text-[#d9eee9]">
              Loading satellite intelligence layer
            </p>
            <p className="mt-1 text-[11px] text-[#8ba0b7]">Esri World Imagery - Costa Rica</p>
          </div>
        </div>
      ) : null}

      <div className="absolute left-4 top-4 rounded-lg border border-[rgba(20,184,166,0.28)] bg-[rgba(24,31,45,0.92)] px-3 py-2 shadow-lg backdrop-blur">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#99f6e4]">
          <Layers size={12} />
          Satellite Analysis
        </p>
        <p className="mt-1 max-w-[260px] truncate text-[12px] font-semibold text-white">
          {selectedProperty.name}
        </p>
      </div>

      <button
        type="button"
        onClick={showAll}
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg border border-[rgba(20,184,166,0.28)] bg-[rgba(24,31,45,0.92)] px-3 py-2 text-[11px] font-bold text-[#99f6e4] shadow-lg backdrop-blur transition hover:bg-[rgba(15,148,136,0.28)]"
      >
        <Maximize2 size={13} />
        All visible
      </button>
    </section>
  );
}

function buildParcelPolygon(property) {
  const { lat, lng } = property.coordinates;
  const area = Math.max(Number(property.landSize) || 1, 1);
  const aspect = getAspectRatio(property.propertyType);
  const widthM = Math.sqrt(area * aspect);
  const heightM = area / widthM;
  const dLat = heightM / 2 / 111111;
  const dLng = widthM / 2 / (111111 * Math.cos((lat * Math.PI) / 180));
  const jitter = 0.000008;

  return [
    [lat + dLat + jitter, lng - dLng - jitter * 0.6],
    [lat + dLat - jitter * 0.4, lng + dLng + jitter],
    [lat - dLat - jitter * 0.6, lng + dLng + jitter * 0.5],
    [lat - dLat + jitter * 0.8, lng - dLng],
  ];
}

function getAspectRatio(propertyType) {
  if (propertyType.includes("Industrial") || propertyType.includes("Development")) return 1.75;
  if (propertyType.includes("Residential")) return 0.9;
  if (propertyType.includes("Tourism")) return 1.2;
  return 1.35;
}

function buildMarkerIcon(L, property, { isSelected, isComparable }) {
  const accent = isSelected ? "#df6a3c" : "#14b8a6";
  const ring = isSelected ? "rgba(223,106,60,0.26)" : "rgba(20,184,166,0.22)";
  const title = escapeHtml(property.name.split(" ").slice(0, 3).join(" "));
  const label = isSelected
    ? `${property.investmentScore}`
    : `${formatCurrency(property.pricePerM2)}/m2`;
  const sublabel = isSelected ? "AI score" : isComparable ? "Comparable" : "Marker";
  const size = isSelected ? 42 : 34;

  return L.divIcon({
    className: "",
    iconSize: [150, 76],
    iconAnchor: [75, 26],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 8px 18px rgba(0,0,0,0.45));cursor:pointer;">
        <div style="position:relative;width:${size}px;height:${size}px;display:grid;place-items:center;">
          ${
            isSelected
              ? `<div style="position:absolute;inset:-10px;border:1px solid ${ring};border-radius:999px;animation:mapPulse 3.4s ease-out infinite;"></div>`
              : ""
          }
          <div style="
            position:relative;z-index:1;display:grid;place-items:center;
            width:${size}px;height:${size}px;border-radius:999px;
            border:2px solid ${accent};background:rgba(24,31,45,0.92);
            box-shadow:0 0 0 4px ${ring};
            color:${accent};font-weight:800;font-size:${isSelected ? "13px" : "10px"};
            white-space:nowrap;">
            ${label}
          </div>
        </div>
        <div style="margin-top:6px;min-width:106px;max-width:138px;border-radius:7px;border:1px solid rgba(255,255,255,0.14);background:rgba(24,31,45,0.94);padding:4px 8px;text-align:center;">
          <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;font-weight:700;color:#f8fafc;">${title}</div>
          <div style="margin-top:1px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${accent};">${sublabel}</div>
        </div>
      </div>
    `,
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
