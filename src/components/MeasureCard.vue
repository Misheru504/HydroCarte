<script setup>
import { useSelectedSite } from '/src/composables/useSelectedSite';

const { site, observation, loading, error, clearSite } = useSelectedSite();
</script>
<style scoped>
.measureCard
{
    width: 360px;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 14px;
    background: #F4F8FC;
    border: 1px solid #1F3550;
    color: #0C2340;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.headerCard
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.titreMeasure
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.labelCard
{
    display: flex;
    align-items: center;
    gap: 10px;
}

.iconCard
{
    width: 32px;
    height: 32px;
    font-size: 20px;
    flex: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E3EEFB;
    color: #1D5FBF;
}

.titreCard
{
    margin: 0;
    font-size: 15px;
    font-weight: 600;
}

.valueLine
{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
}

.valueData
{
    display: flex;
    align-items: baseline;
    gap: 6px;
}

.value
{
    font-size: 34px;
    line-height: 1;
    font-weight: 600;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
}

.unit
{
    font-size: 15px;
    font-weight: 500;
    color: #4F6480;
}
</style>
<template>
    <section class="measureCard">
        <div class="titreMeasure">
            <div class="labelCard">
                <i class="bi bi-moisture iconCard"></i>
                <h3 class="titreCard">Hauteur d'eau</h3>
            </div>
        </div>
        <div class="valueLine">
            <div class="valueData">
                <span class="value">{{ Math.round(observation.resultat_obs / 10) / 100 /* Arrondi au centième */}}</span>
                <span class="unit">m</span>
            </div>
        </div>
    </section>
</template>