import { ref, readonly } from 'vue';
import { getObservationsData } from '/src/api/hubeau';

const site = ref(null); // Propriétés du site (nom, code, coords, etc.)
const observation = ref(null);
const loading = ref(false);
const error = ref(null);
let requestId = 0; // Identifie le site pour éviter des doublures (un autre site cliqué)

export function useSelectedSite()
{
    async function selectSite(newSite)
    {
        const id = ++requestId;
        site.value = newSite;
        observation.value = null;
        error.value = null;
        loading.value = true;

        try
        {
            const obs = await getObservationsData(newSite.code_site, 'H');
            if (id === requestId) observation.value = obs;
        }
        catch(e)
        {
            if (id === requestId) error.value = e;
        }
        finally
        {
            if (id === requestId) loading.value = false;
        }
    }

    function clearSite()
    {
        ++requestId;
        site.value = null;
        observation.value = null;
        loading.value = false;
        error.value = null;
    }

    return {
        site: readonly(site),
        observation: readonly(observation),
        loading: readonly(loading),
        error: readonly(error),
        selectSite,
        clearSite,
    }
}