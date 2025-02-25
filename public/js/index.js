import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { populateCarSelect, initAutocomplete } from "./bookingBar.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await populateCarSelect();

    document.getElementById("location-selector").addEventListener("input", async () => {
        const query = event.target.value;
        if (query.length < 10) return;

        const suggestions = await initAutocomplete(query)
        console.log(suggestions)
    })
});