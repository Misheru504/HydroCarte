<script setup>
import { computed } from 'vue';
import MeasureCard from '/src/components/MeasureCard.vue';
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, observation, loading, error, clearSite } = useSelectedSite();

const siteUrl = computed(() => `https://www.hydro.eaufrance.fr/sitehydro/${site.value?.code_site}/fiche`);
</script>
<style scoped>
/* Panneau flottant au-dessus de la carte */
.sidebarRoot
{
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  z-index: 1000;
  max-width: 100%;
}

.sidebar
{
  width: 400px;
}

.closeButton
{
  width: 44px;
  height: 44px;
  margin-right: -8px;
}
</style>

<template>
  <div v-if="site" class="sidebarRoot">
    <aside class="sidebar h-100 p-4 d-flex flex-column gap-3 bg-body border rounded-3 shadow overflow-y-auto">
      <header class="d-flex flex-column gap-2">
        <div class="d-flex align-items-center justify-content-between gap-3">
          <span class="badge rounded-pill bg-primary-subtle text-primary-emphasis d-inline-flex align-items-center gap-1">
            <i class="bi bi-droplet" aria-hidden="true"></i>
            Site hydrométrique
          </span>
          <button class="closeButton btn border-0 p-0 fs-2 text-body-secondary d-flex align-items-center justify-content-center" aria-label="Fermer" @click="clearSite">
            <i class="bi bi-x" aria-hidden="true"></i>
          </button>
        </div>
        <h2 class="fs-4 fw-bold lh-sm mb-0">{{ site.libelle_site }}</h2>
        <p class="small text-body-secondary mb-0 d-flex align-items-center gap-1">
          Site
          <a :href="siteUrl" target="_blank" rel="noopener" class="font-monospace fw-medium link-offset-1 d-inline-flex align-items-center gap-1">
            {{ site.code_site }} <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
          </a>
        </p>
      </header>
      <p v-if="loading" class="text-body-secondary mb-0">Chargement des mesures…</p>
      <p v-else-if="error" class="text-body-secondary mb-0" role="alert">Impossible de charger les mesures.</p>
      <MeasureCard v-if="observation" />
    </aside>
  </div>
</template>
