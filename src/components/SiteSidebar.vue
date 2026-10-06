<script setup>
import { ref } from 'vue';
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, observation, loading, error, clearSite } = useSelectedSite()

const t = ref('light');
</script>
<style scoped>

</style>

<template>
  <aside :class="{ show: site }">
  </aside>
</template>