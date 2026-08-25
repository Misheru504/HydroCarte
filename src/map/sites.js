import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl.mjs';

export async function loadSites(map) {
  console.log("Chargement des sites")

  const url = "https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/sites?format=geojson&size=10000"

  const response = await fetch("/src/assets/sites.json");

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const geojson = await response.json()
  map.getSource("sites").setData(geojson);

  console.log("Chargement des sites fini !")
}