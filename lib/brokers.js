export const mockBrokers = [
  {
    id: "maria-alfaro",
    name: "Maria Alfaro",
    location: "San Jose, Costa Rica",
    specialty: "Urban redevelopment and commercial corridors",
    experience: "12 years",
    phone: "+506 2220 1840",
    email: "maria.alfaro@allstateintelligence.com",
    rating: "4.9",
    propertiesManaged: 46,
    avatarInitials: "MA",
    bio:
      "Maria supports owners and investors with pricing strategy, municipal readiness, and broker-led listing preparation for high-visibility urban assets.",
    serviceAreas: ["Escazu", "Santa Ana", "San Jose Central", "Heredia"],
    specialties: ["Mixed-use sites", "Commercial lots", "Owner representation"],
    recentProperties: [
      "Escazu Mixed-Use Corner",
      "Sabana Norte Redevelopment Site",
      "Santa Ana Service Corridor",
    ],
  },
  {
    id: "carlos-rojas",
    name: "Carlos Rojas",
    location: "Guanacaste, Costa Rica",
    specialty: "Hospitality land and coastal investment sites",
    experience: "9 years",
    phone: "+506 2653 0911",
    email: "carlos.rojas@allstateintelligence.com",
    rating: "4.8",
    propertiesManaged: 31,
    avatarInitials: "CR",
    bio:
      "Carlos focuses on tourism-led properties where access, water availability, and zoning restrictions need careful review before market launch.",
    serviceAreas: ["Tamarindo", "Santa Cruz", "Nosara", "Liberia"],
    specialties: ["Tourism land", "Hospitality concepts", "Coastal due diligence"],
    recentProperties: [
      "Tamarindo Hospitality Lot",
      "Santa Cruz Boutique Villas Site",
      "Liberia Airport Corridor Parcel",
    ],
  },
  {
    id: "ana-campos",
    name: "Ana Campos",
    location: "Heredia, Costa Rica",
    specialty: "Residential redevelopment and student housing",
    experience: "7 years",
    phone: "+506 2260 4418",
    email: "ana.campos@allstateintelligence.com",
    rating: "4.7",
    propertiesManaged: 28,
    avatarInitials: "AC",
    bio:
      "Ana helps property owners organize intake records, comparable evidence, and positioning for residential infill and rental-driven projects.",
    serviceAreas: ["Heredia", "Mercedes", "Belen", "Alajuela"],
    specialties: ["Residential redevelopment", "Student housing", "Rental analysis"],
    recentProperties: [
      "Heredia Student Housing Site",
      "Mercedes Multifamily Parcel",
      "Belen Infill Opportunity",
    ],
  },
];

export const selectedBrokerStorageKey = "asi:selectedBrokerId";

export function findBrokerById(id) {
  return mockBrokers.find((broker) => broker.id === id) || null;
}
