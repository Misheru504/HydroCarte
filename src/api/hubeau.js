import { observationsUrl } from "/src/config";

export async function getObservationsData(code_site, grandeur_hydro){
  const url = observationsUrl + `?code_entite=${code_site}&format=json&grandeur_hydro=${grandeur_hydro}&size=1&sort=desc`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const json = await response.json();

  const data = json.data[0];
  if (!data) throw new Error(`Aucune observation pour le site : ${code_site}`);

  return data;
}