export const locationCatalog = [
  {
    province: "San Jose",
    cantons: [
      {
        name: "Escazu",
        districts: [
          { name: "Escazu", lat: 9.9189, lng: -84.1398 },
          { name: "Guachipelin", lat: 9.9477, lng: -84.1608 },
          { name: "San Rafael", lat: 9.9362, lng: -84.1426 },
        ],
      },
      {
        name: "Santa Ana",
        districts: [
          { name: "Brasil", lat: 9.9363, lng: -84.2269 },
          { name: "Lindora", lat: 9.9522, lng: -84.1877 },
          { name: "Piedades", lat: 9.9185, lng: -84.2211 },
          { name: "Pozos", lat: 9.9328, lng: -84.1822 },
          { name: "Santa Ana", lat: 9.9326, lng: -84.1829 },
        ],
      },
      {
        name: "Curridabat",
        districts: [
          { name: "Curridabat", lat: 9.9139, lng: -84.0344 },
          { name: "Granadilla", lat: 9.9181, lng: -84.0195 },
          { name: "Sanchez", lat: 9.9071, lng: -84.0232 },
        ],
      },
      {
        name: "Montes de Oca",
        districts: [
          { name: "Sabanilla", lat: 9.9451, lng: -84.0392 },
          { name: "San Pedro", lat: 9.9307, lng: -84.0643 },
        ],
      },
      {
        name: "San Jose",
        districts: [
          { name: "Carmen", lat: 9.9364, lng: -84.0731 },
          { name: "Mata Redonda", lat: 9.9361, lng: -84.1057 },
          { name: "Pavas", lat: 9.9467, lng: -84.1348 },
        ],
      },
    ],
  },
  {
    province: "Heredia",
    cantons: [
      {
        name: "Belen",
        districts: [
          { name: "Asuncion", lat: 9.9856, lng: -84.1808 },
          { name: "La Ribera", lat: 9.9895, lng: -84.1818 },
        ],
      },
      {
        name: "Heredia",
        districts: [
          { name: "Mercedes", lat: 10.0024, lng: -84.1161 },
          { name: "San Francisco", lat: 9.9848, lng: -84.1148 },
          { name: "Ulloa", lat: 9.9766, lng: -84.1401 },
        ],
      },
    ],
  },
  {
    province: "Alajuela",
    cantons: [
      {
        name: "Alajuela",
        districts: [
          { name: "Alajuela", lat: 10.0162, lng: -84.2116 },
          { name: "Coyol", lat: 9.9997, lng: -84.2544 },
          { name: "La Guacima", lat: 9.9594, lng: -84.2597 },
          { name: "Rio Segundo", lat: 10.0008, lng: -84.2034 },
        ],
      },
      {
        name: "Atenas",
        districts: [{ name: "Atenas", lat: 9.9797, lng: -84.3782 }],
      },
      {
        name: "Grecia",
        districts: [{ name: "Grecia", lat: 10.0739, lng: -84.3117 }],
      },
      {
        name: "Naranjo",
        districts: [{ name: "Naranjo", lat: 10.0985, lng: -84.3789 }],
      },
      {
        name: "Palmares",
        districts: [{ name: "Palmares", lat: 10.0562, lng: -84.4315 }],
      },
      {
        name: "San Carlos",
        districts: [
          { name: "La Fortuna", lat: 10.4709, lng: -84.6451 },
          { name: "Muelle", lat: 10.4668, lng: -84.4884 },
        ],
      },
      {
        name: "San Ramon",
        districts: [{ name: "San Ramon", lat: 10.0871, lng: -84.4709 }],
      },
      {
        name: "Sarchi",
        districts: [{ name: "Sarchi Norte", lat: 10.0887, lng: -84.3479 }],
      },
    ],
  },
  {
    province: "Cartago",
    cantons: [
      {
        name: "Cartago",
        districts: [{ name: "Oriental", lat: 9.8644, lng: -83.9194 }],
      },
      {
        name: "El Guarco",
        districts: [{ name: "Tejar", lat: 9.8444, lng: -83.9383 }],
      },
      {
        name: "La Union",
        districts: [{ name: "Tres Rios", lat: 9.9082, lng: -83.9871 }],
      },
      {
        name: "Paraiso",
        districts: [{ name: "Paraiso", lat: 9.8385, lng: -83.8652 }],
      },
    ],
  },
  {
    province: "Guanacaste",
    cantons: [
      {
        name: "Liberia",
        districts: [
          { name: "Liberia", lat: 10.5925, lng: -85.5482 },
          { name: "Nacascolo", lat: 10.6368, lng: -85.6357 },
        ],
      },
      {
        name: "Nicoya",
        districts: [
          { name: "Nosara", lat: 9.9802, lng: -85.6532 },
          { name: "Samara", lat: 9.8814, lng: -85.5268 },
        ],
      },
      {
        name: "Santa Cruz",
        districts: [
          { name: "Cabo Velas", lat: 10.3334, lng: -85.8421 },
          { name: "Ostional", lat: 9.9933, lng: -85.7017 },
          { name: "Tamarindo", lat: 10.2993, lng: -85.8371 },
        ],
      },
    ],
  },
  {
    province: "Puntarenas",
    cantons: [
      {
        name: "Garabito",
        districts: [
          { name: "Herradura", lat: 9.6559, lng: -84.6581 },
          { name: "Jaco", lat: 9.6146, lng: -84.6299 },
        ],
      },
    ],
  },
];

export function getProvinceOptions() {
  return locationCatalog.map((location) => location.province);
}

export function getCantonOptions(province) {
  return findProvince(province)?.cantons.map((canton) => canton.name) || [];
}

export function getDistrictOptions(province, canton) {
  return findCanton(province, canton)?.districts.map((district) => district.name) || [];
}

export function getDistrictLocation(province, canton, district) {
  return findCanton(province, canton)?.districts.find((item) => item.name === district) || null;
}

function findProvince(province) {
  return locationCatalog.find((item) => item.province === province);
}

function findCanton(province, canton) {
  return findProvince(province)?.cantons.find((item) => item.name === canton);
}
