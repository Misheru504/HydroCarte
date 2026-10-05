import '/src/style.css';
import '/node_modules/maplibre-gl/dist/maplibre-gl.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap-icons/font/bootstrap-icons.min.css';

const feature_close_button = document.getElementById("close-panel");

feature_close_button.addEventListener("click", (event) => { document.getElementById("site-panel").classList.remove("show"); })
