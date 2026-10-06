import { dataFolder } from "/src/config";

export async function loadSites() {
  const response = await fetch(dataFolder + "sites.geojson");

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const geojson = await response.json();
  return geojson;
}