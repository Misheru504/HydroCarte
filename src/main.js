import * as carte from "/src/map/map.js"

const feature_close_button = document.getElementById("close-panel");

feature_close_button.addEventListener("click", (event) => { document.getElementById("site-panel").classList.remove("show"); })
