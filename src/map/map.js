import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl.mjs';
import * as sites from '/src/map/sites.js'

export const map = new maplibregl.Map({
  container: 'map', // ID conteneur
  style: 'https://tiles.openfreemap.org/styles/positron',
  center: [2.2, 47], // France
  zoom: 5.5,
  fadeDuration: 0
});

map.on('load', async () => {
  changeLanguage('fr')

  map.addSource('sites', {
    type: 'geojson',
    data: [],
    cluster: true,
    clusterRadius: 30
  });

  map.addLayer({
    id: 'sites-clusters',
    type: 'circle',
    source: 'sites',
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": [
        "step",
        ["get", "point_count"],
        16,
        50,
        20,
        200,
        25
      ],
      "circle-color": "#0051d3"
    }
  });

  map.addLayer({
    id: "sites-cluster-count",
    type: "symbol",
    source: "sites",
    filter: ["has", "point_count"],

    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-size": 12
    },
    paint: {
      "text-color": "#e5e5e5"
    }
  });

  map.addLayer({
    id: "sites-points",
    type: "circle",
    source: "sites",

    filter: ["!", ["has", "point_count"]],

    paint: {
      "circle-color": "#ff0000",
      "circle-radius": 5,
      "circle-stroke-width": 1
    }
  });

  map.on('click', 'sites-points', (e) => {
    console.log(e)
    const coordinates = e.features[0].geometry.coordinates.slice();

    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 10
    });

    new maplibregl.Popup()
      .setLngLat(coordinates)
      .setHTML(makeDesc(e.features[0].properties))
      .addTo(map);

    document.getElementById("feature-panel").classList.add("show");
    document.getElementById("feature-title").textContent = e.features[0].properties.libelle_site;
  });

  map.on('mouseenter', 'sites-points', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

    // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'sites-points', () => {
    map.getCanvas().style.cursor = '';
  });

  await sites.loadSites(map);
});


export function changeLanguage(lang)
{
  [
    'label_country_1',
    'label_country_2',
    'label_country_3',
    'label_city_capital',
    'label_city',
    'label_state',
    'label_town',
    'label_village',
    'label_other',
    'airport',
    'highway-name-major',
    'highway-name-minor',
    'highway-name-path',
    'water_name_line_label',
    'water_name_point_label',
    'waterway_line_label'
  ].forEach(layerId => {
    map.setLayoutProperty(layerId, 'text-field', [
      'coalesce',
      ['get', `name:${lang}`],
      ['get', 'name']
    ]);
  });
}

function makeDesc(properties)
{
  const desc = `<strong>${properties.libelle_site}</strong>` + 
  `<p>Code site : ${properties.code_site}</p>`;

  return desc;
}