import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./partials/header.js";
import { populateCarSelect, initAutocomplete, validateForm } from "./partials/bookingBar.js";
import {initCarCatalog} from "./partials/carCatalog.js";
import {loadFooterContent} from "./partials/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await populateCarSelect();
    await validateForm();
    await initCarCatalog();
    await loadFooterContent()

    document.getElementById("location-selector").addEventListener("input", async () => {
        const query = event.target.value;
        if (query.length < 10) return;

        const suggestions = await initAutocomplete(query)
        console.log(suggestions)
    })
});