import { Popup } from 'maplibre-gl';

export function addSitesLayer(map, geojsonSites, onSiteClick)
{
    map.addSource('sites', {
        type: 'geojson',
        data: geojsonSites,
        cluster: false
    });
    map.addLayer({
        id: "sites-points",
        type: "circle",
        source: "sites",

        paint: {
            "circle-color": "#1177EC",
            "circle-radius": 3,
            "circle-stroke-width": 1
        }
    });

    map.on('click', 'sites-points', async (e) => {
        const feature = e.features[0];
        const coordinates = feature.geometry.coordinates;
        feature.properties.coords = coordinates;
        
        onSiteClick(feature.properties)
        const title = document.createElement('strong');
        title.textContent = feature.properties.libelle_site;

        new Popup()
            .setLngLat(coordinates)
            .setDOMContent(title)
            .addTo(map);
    });

    map.on('mouseenter', 'sites-points', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'sites-points', () => {
        map.getCanvas().style.cursor = '';
    });
}