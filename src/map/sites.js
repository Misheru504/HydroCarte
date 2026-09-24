import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl.mjs';

export async function loadSites(map) {
  console.log("Chargement des sites")

  const response = await fetch("/src/assets/sites.json");

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const geojson = await response.json();
  map.getSource("sites").setData(geojson);

  console.log("Chargement des sites fini !")
}

export async function getObservationsData(code_site){
  const url = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${code_site}&format=json&grandeur_hydro=H&size=1&sort=desc`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const json = await response.json();

  const data = json.data[0];
  if (!data) throw new Error(`Aucune observation pour le site : ${code_site}`);

  return data;
}