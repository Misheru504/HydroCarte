<script setup>
import { computed } from 'vue';
import MeasureCard from '/src/components/MeasureCard.vue';
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, observation, loading, error, clearSite } = useSelectedSite()

const siteUrl = computed(() => `https://www.hydro.eaufrance.fr/sitehydro/${site.value?.code_site}/fiche`);
</script>
<style scoped>
.sidebarRoot
{
  position: absolute;
  top:10px;
  left:10px;
  bottom:10px;
  z-index: 1000;
  max-width: 100%;
}

.sidebar
{
  width: 400px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #FFFFFF;
  border-right: 1px solid #DCE6F2;
  box-shadow: 24px rgba(13, 39, 71, 0.12);
  overflow-y: auto;
  color: #0C2340;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  margin-left: 0px;
  margin-right: auto;
  border-radius: 10px;
}

.sidebarHead
{
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 4px;
}

.titleRow
{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.titleBadge
{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #E3EEFB;
  color: #174C99;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.titleBadge i 
{
  font-size: 14px;
}

.closeButton
{
  width: 44px;
  height: 44px;
  margin-right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #4F6480;
  cursor: pointer;
}

.closeButton i
{
  font-size: 32px;
}

.nomSite
{
  margin: 0;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.descSite
{
  margin:0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #4F6480;
}

.codeSiteLink
{
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1D5FBF;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>

<template>
  <div v-if="site" class="sidebarRoot">
    <aside class="sidebar">
      <header class="sidebarHead">
        <div class="titleRow">
          <div class="titleBadge">
            <i class="bi bi-droplet" aria-hidden="true"></i>
            Site hydrométrique
          </div>
          <button class="closeButton" @click="clearSite">
            <i class="bi bi-x" aria-hidden="true"></i>
          </button>
        </div>
        <h2 class="nomSite">{{ site.libelle_site }}</h2>
        <p class="descSite">Site <a :href="siteUrl" target="_blank" class="codeSiteLink">{{ site.code_site }} <i class="bi bi-box-arrow-up-right"></i></a></p> <!-- TODO: LIEN CODE SITE -->
      </header>
      <p v-if="loading" class="meta">Chargement des mesures…</p>
      <p v-else-if="error" class="meta" role="alert">Impossible de charger les mesures.</p>
      <div v-if="observation">
        <MeasureCard/>
      </div>
    </aside>
  </div>
</template>