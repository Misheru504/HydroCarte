import 'maplibre-gl/dist/maplibre-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@fontsource-variable/ibm-plex-sans';
import '/src/theme.css';
import '/src/style.css';
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { createApp } from 'vue'
import App from '/src/App.vue'

setWorkerUrl(workerUrl);
createApp(App).mount('#app')