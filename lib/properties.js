export const initialProperties = [
  {
    id: "escazu-mixed-use-corner",
    name: "Escazu Mixed-Use Corner",
    province: "San Jose",
    canton: "Escazu",
    district: "San Rafael",
    address: "San Rafael de Escazu, near Multiplaza and Ruta 27",
    coordinates: { lat: 9.9362, lng: -84.1426 },
    ownerPrice: 1850000,
    marketPrice: 1942500,
    appraisalPrice: 1572500,
    landSize: 1850,
    landUse: "Mixed-use commercial corridor",
    propertyType: "Urban lot",
    pricePerM2: 1040,
    investmentScore: 91,
    liquidityScore: 88,
    infrastructureScore: 94,
    zoningFit: 90,
    riskScore: 24,
    tags: ["San Jose", "Escazu", "Urban lot"],
    scoreExplanation:
      "Premium infill parcel with strong access to affluent demand, private services, and commercial footfall.",
    ownerAlignment:
      "Owner price is slightly below the current market estimate, leaving room for investor upside if due diligence confirms access and parking capacity.",
    nearbyServices: [
      { name: "Ruta 27 access", category: "Transit", distance: "0.8 km", note: "Regional highway connection" },
      { name: "Multiplaza Escazu", category: "Retail", distance: "1.1 km", note: "Major commercial anchor" },
      { name: "CIMA Hospital", category: "Health", distance: "1.4 km", note: "Premium healthcare cluster" },
      { name: "International schools", category: "Education", distance: "2.8 km", note: "Family demand driver" },
    ],
    notes: [
      {
        author: "Analyst",
        date: "May 2026",
        text: "Premium infill location with strong commercial footprint. Access via Ruta 27 reduces logistics friction for mixed-use concepts.",
      },
      {
        author: "Investment Lead",
        date: "May 2026",
        text: "Entry pricing at $1,040 per m2 is near the upper bound for corridor transactions. Validate parking baseline with municipal records.",
      },
    ],
    photos: ["Satellite view", "Street frontage", "Adjacent lots", "Access road"],
    parcel: {
      registryId: "SJ-ESC-40518",
      frontage: "42 m",
      depth: "46 m",
      coverage: "70% max coverage",
    },
    zoning: {
      classification: "ZC-2 Mixed Commercial",
      permitted: ["Retail commerce", "Commercial offices", "Upper-floor residential", "Medical services"],
      restrictions: ["Max height: 6 floors", "Front setback: 3 m", "Side setback: 2 m"],
    },
    risks: [
      "Entry price requires disciplined absorption assumptions.",
      "Traffic congestion may affect access design and parking requirements.",
      "Comparable transactions vary by frontage quality.",
    ],
  },
  {
    id: "santa-ana-logistics-parcel",
    name: "Santa Ana Logistics Parcel",
    province: "San Jose",
    canton: "Santa Ana",
    district: "Pozos",
    address: "Pozos de Santa Ana, west corridor industrial edge",
    coordinates: { lat: 9.9328, lng: -84.1822 },
    ownerPrice: 2100000,
    marketPrice: 2163000,
    appraisalPrice: 1785000,
    landSize: 4200,
    landUse: "Light industrial and services",
    propertyType: "Development land",
    pricePerM2: 515,
    investmentScore: 84,
    liquidityScore: 79,
    infrastructureScore: 90,
    zoningFit: 86,
    riskScore: 31,
    tags: ["San Jose", "Santa Ana", "Logistics"],
    scoreExplanation:
      "Well-positioned land for last-mile logistics, service retail, or flex warehouse near the west-side growth corridor.",
    ownerAlignment:
      "Owner price is close to market support, with a modest premium justified by lot size and corridor access.",
    nearbyServices: [
      { name: "Lindora business district", category: "Infrastructure", distance: "1.9 km", note: "Office and service cluster" },
      { name: "Ruta 27 interchange", category: "Transit", distance: "1.5 km", note: "Distribution advantage" },
      { name: "Forum business parks", category: "Infrastructure", distance: "3.1 km", note: "Corporate demand node" },
      { name: "Automercado Lindora", category: "Retail", distance: "2.2 km", note: "Consumer traffic signal" },
    ],
    notes: [
      {
        author: "Analyst",
        date: "May 2026",
        text: "Strong logistics positioning near the Lindora business district. Lot size supports phased warehouse development.",
      },
      {
        author: "Site Coordinator",
        date: "May 2026",
        text: "Truck access via Route 27 interchange confirmed at 1.5 km. Visit should verify frontage quality and peak-hour access.",
      },
    ],
    photos: ["Satellite view", "Warehouse context", "Route access", "Utility edge"],
    parcel: {
      registryId: "SJ-STA-88402",
      frontage: "58 m",
      depth: "72 m",
      coverage: "60% max coverage",
    },
    zoning: {
      classification: "ZI-1 Light Industrial",
      permitted: ["Warehousing", "Light manufacturing", "Distribution", "Industrial services"],
      restrictions: ["Max warehouse height: 12 m", "Front setback: 5 m", "Green buffer: 10 m"],
    },
    risks: [
      "Utility capacity should be validated before design commitments.",
      "Truck access and neighborhood compatibility require review.",
      "Demand profile is less premium than Escazu office-retail nodes.",
    ],
  },
  {
    id: "heredia-student-housing-site",
    name: "Heredia Student Housing Site",
    province: "Heredia",
    canton: "Heredia",
    district: "Mercedes",
    address: "Mercedes, Heredia, near Universidad Nacional",
    coordinates: { lat: 10.0024, lng: -84.1161 },
    ownerPrice: 585000,
    marketPrice: 609000,
    appraisalPrice: 497250,
    landSize: 960,
    landUse: "Medium-density residential",
    propertyType: "Residential redevelopment",
    pricePerM2: 635,
    investmentScore: 78,
    liquidityScore: 82,
    infrastructureScore: 76,
    zoningFit: 77,
    riskScore: 36,
    tags: ["Heredia", "Student housing", "Redevelopment"],
    scoreExplanation:
      "Compact redevelopment opportunity supported by student demand, walkability, and attainable entry pricing.",
    ownerAlignment:
      "Owner price is below the market estimate, but density and parking constraints drive the risk review.",
    nearbyServices: [
      { name: "Universidad Nacional", category: "Education", distance: "1.3 km", note: "Primary demand driver" },
      { name: "Heredia train station", category: "Transit", distance: "1.8 km", note: "Commuter access" },
      { name: "Hospital San Vicente", category: "Health", distance: "2.4 km", note: "Civic service anchor" },
      { name: "Paseo de las Flores", category: "Retail", distance: "3.5 km", note: "Regional shopping node" },
    ],
    notes: [
      {
        author: "Analyst",
        date: "May 2026",
        text: "Walkable service density supports the rental story. Parking constraints need early resolution in design phase.",
      },
    ],
    photos: ["Satellite view", "Neighborhood edge", "Transit route", "Street access"],
    parcel: {
      registryId: "HD-MER-12991",
      frontage: "31 m",
      depth: "30 m",
      coverage: "Medium density residential",
    },
    zoning: {
      classification: "ZR-3 Medium Residential",
      permitted: ["Multi-family housing", "Student residences", "Neighborhood retail", "Professional services"],
      restrictions: ["Max height: 4 floors", "Parking: 1 space per unit", "Front setback: 2 m"],
    },
    risks: [
      "Parking constraints may limit unit density.",
      "Rental upside depends on permitting and product quality.",
      "Neighborhood engagement should happen before design lock.",
    ],
  },
  {
    id: "tamarindo-hospitality-lot",
    name: "Tamarindo Hospitality Lot",
    province: "Guanacaste",
    canton: "Santa Cruz",
    district: "Tamarindo",
    address: "Tamarindo beach corridor, Santa Cruz",
    coordinates: { lat: 10.2993, lng: -85.8371 },
    ownerPrice: 1320000,
    marketPrice: 1384000,
    appraisalPrice: 1122000,
    landSize: 2400,
    landUse: "Tourism commercial",
    propertyType: "Tourism development land",
    pricePerM2: 585,
    investmentScore: 73,
    liquidityScore: 70,
    infrastructureScore: 68,
    zoningFit: 74,
    riskScore: 44,
    tags: ["Guanacaste", "Hospitality", "Tourism"],
    scoreExplanation:
      "Tourism-led upside with boutique lodging potential, balanced by infrastructure and seasonality risk.",
    ownerAlignment:
      "Owner price is within the tourism corridor range, but infrastructure checks should drive negotiation posture.",
    nearbyServices: [
      { name: "Tamarindo beach", category: "Infrastructure", distance: "0.9 km", note: "Tourism anchor" },
      { name: "Route 152 access", category: "Transit", distance: "0.5 km", note: "Local connectivity" },
      { name: "Restaurants and surf schools", category: "Retail", distance: "0.7 km", note: "Visitor activity" },
      { name: "Tamarindo Airport", category: "Transit", distance: "4.1 km", note: "Regional air access" },
    ],
    notes: [
      {
        author: "Investment Lead",
        date: "May 2026",
        text: "Strong long-term fundamentals if entry timing is right. Water availability and seasonal demand need early technical diligence.",
      },
    ],
    photos: ["Satellite view", "Beach corridor", "Access road", "Adjacent parcels"],
    parcel: {
      registryId: "GU-SCZ-77401",
      frontage: "45 m",
      depth: "53 m",
      coverage: "40% max coverage",
    },
    zoning: {
      classification: "ZT-2 Tourism Commercial",
      permitted: ["Tourist accommodation", "Restaurants", "Villas", "Spa and wellness"],
      restrictions: ["Max height: 3 floors", "Maritime setback review", "Water protection: 15 m"],
    },
    risks: [
      "Water availability and infrastructure capacity need early diligence.",
      "Revenue model is exposed to tourism seasonality.",
      "Construction logistics can widen contingency budgets.",
    ],
  },
];

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

export function getUniqueOptions(properties, key) {
  return [...new Set(properties.map((property) => property[key]).filter(Boolean))].sort();
}

export function haversineKm(a, b) {
  const radius = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return radius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function similarityScore(target, candidate) {
  let score = 18;
  if (target.province === candidate.province) score += 25;
  if (target.canton === candidate.canton) score += 22;
  if (target.district === candidate.district) score += 10;
  if (target.propertyType === candidate.propertyType) score += 16;

  const areaRatio =
    Math.min(target.landSize, candidate.landSize) /
    Math.max(target.landSize, candidate.landSize);
  const priceRatio =
    Math.min(target.pricePerM2, candidate.pricePerM2) /
    Math.max(target.pricePerM2, candidate.pricePerM2);

  score += Math.round(areaRatio * 6);
  score += Math.round(priceRatio * 8);

  return Math.min(score, 98);
}

export function getComparables(target, properties) {
  if (!target) return [];

  return properties
    .filter((property) => property.id !== target.id)
    .map((property) => ({
      id: property.id,
      name: property.name,
      distanceKm: Number(haversineKm(target.coordinates, property.coordinates).toFixed(1)),
      pricePerM2: property.pricePerM2,
      askingPrice: property.ownerPrice,
      landSize: property.landSize,
      similarityScore: similarityScore(target, property),
      coordinates: property.coordinates,
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}

export function makePropertyFromForm(form) {
  const ownerPrice = Number(form.ownerPrice) || 0;
  const landSize = Number(form.landSize) || 1;
  const pricePerM2 = Number(form.pricePerM2) || Math.round(ownerPrice / landSize);
  const name = form.name.trim() || "New Property";
  const idBase = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const marketPrice = Math.round(pricePerM2 * landSize * 1.04);
  const riskScore = 42;

  return {
    id: `${idBase || "property"}-${Date.now()}`,
    name,
    province: form.province.trim() || "San Jose",
    canton: form.canton.trim() || "Central",
    district: form.district.trim() || "Pending district",
    address: form.address.trim() || "Address pending",
    coordinates: {
      lat: Number(form.lat) || 9.9281,
      lng: Number(form.lng) || -84.0907,
    },
    ownerPrice,
    marketPrice,
    appraisalPrice: Math.round(ownerPrice * 0.86),
    landSize,
    landUse: form.landUse.trim() || "Pending classification",
    propertyType: form.propertyType || "Urban lot",
    pricePerM2,
    investmentScore: 67,
    liquidityScore: 65,
    infrastructureScore: 62,
    zoningFit: 61,
    riskScore,
    tags: [form.province || "Costa Rica", form.canton || "New intake", form.propertyType || "Property"],
    scoreExplanation:
      "New intake property. Complete site visit notes, zoning review, and comparables to improve the investment score.",
    ownerAlignment:
      "Market support is provisional until additional comparable evidence is added.",
    nearbyServices: [
      { name: "Access route review", category: "Transit", distance: "Pending", note: "Broker to confirm after visit" },
      { name: "Municipal zoning office", category: "Infrastructure", distance: "Pending", note: "Required for use validation" },
    ],
    notes: form.notes.trim()
      ? [{ author: "Broker", date: currentNoteDate(), text: form.notes.trim() }]
      : [],
    photos: ["Satellite view", "Street frontage", "Parcel access"],
    parcel: {
      registryId: "Pending registry",
      frontage: "Pending",
      depth: "Pending",
      coverage: "Pending municipal validation",
    },
    zoning: {
      classification: "Pending classification",
      permitted: ["To be confirmed with municipality"],
      restrictions: ["Confirm setbacks, coverage, and permitted use"],
    },
    risks: [
      "Zoning and registry records need validation.",
      "Comparable support is provisional until the property is reviewed.",
      "Infrastructure availability should be checked before investor presentation.",
    ],
  };
}

export function currentNoteDate() {
  return new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
