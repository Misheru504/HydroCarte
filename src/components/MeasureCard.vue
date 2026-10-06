<script setup>
import { computed } from 'vue';
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { observation } = useSelectedSite();

// resultat_obs est en mm, affiché en m arrondi au centième
const hauteur = computed(() => Math.round(observation.value.resultat_obs / 10) / 100);
</script>

<template>
    <section class="border rounded-4 bg-body-tertiary p-3 d-flex flex-column gap-3">
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-moisture icon-badge" aria-hidden="true"></i>
            <h3 class="fs-6 fw-semibold mb-0">Hauteur d'eau</h3>
        </div>
        <div class="d-flex align-items-baseline gap-2">
            <span class="fs-2 fw-semibold lh-1 tabular-nums">{{ hauteur }}</span>
            <span class="fw-medium text-body-secondary">m</span>
        </div>
    </section>
</template>
