import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { populateCarSelect } from "./bookingBar.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    loadHeaderContent();
    await populateCarSelect();
});