import { dataFolder } from "/src/config";

export async function loadSites(map) {
  console.log("Chargement des sites")

  const response = await fetch(dataFolder + "sites.geojson");

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const geojson = await response.json();
  map.getSource("sites").setData(geojson);

  console.log("Chargement des sites fini !")
}