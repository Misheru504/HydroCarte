<script setup>
import { Map } from 'maplibre-gl';
import { loadSites } from '/src/api/sites'
import { initialMapPos, initialMapZoom, mapStyle } from '/src/config';
import { changeLanguage } from '/src/map/language';
import { addSitesLayer } from '/src/map/layers/sites';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, selectSite } = useSelectedSite();
const emit = defineEmits(['site-click'])
let map = null;
const selectedSite = ref(null);

onMounted(async () => {
    map = new Map({
        container: "main-map",
        style: mapStyle,
        center: initialMapPos,
        zoom: initialMapZoom,
        fadeDuration: 0
    });

    map.on('load', async () => {
        changeLanguage(map, 'fr');

        try
        {
            addSitesLayer(map, await loadSites(), selectSite);
        }
        catch (e)
        {
            alert(e);
        }
    })
})

watch(site, (nouveauSite) => {
    if(nouveauSite)
    {
        map.flyTo({
            center: nouveauSite.coords,
            zoom: 10
        });
    }
});

onUnmounted(() => map?.remove())
</script>
<template>
    <div class="map" id="main-map"></div>
</template>