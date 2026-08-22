import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl.mjs';

export async function loadStations(map) {
  console.log("Chargement des stations")

  const url = "https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/sites?format=geojson&size=10000"

  const response = await fetch("/src/assets/stations.json");

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const geojson = await response.json()
  map.getSource("stations").setData(geojson);

  console.log("Chargement des stations fini !")
}