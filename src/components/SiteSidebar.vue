<script setup>
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, observation, loading, error, clearSite } = useSelectedSite()
</script>

<template>
  <aside class="map-sidebar position-absolute start-0 m-3 bg-white text-black rounded shadow" :class="{ show: site }">
    <button class="btn-close" @click="clearSite" />
    <h5>{{ site?.libelle_site }}</h5>
    <p v-if="loading">Chargement…</p>
    <p v-else-if="error">Erreur de récupération des données</p>
    <p v-else-if="observation">Dernière donnée : {{ observation.date_obs }}</p>
  </aside>
</template>