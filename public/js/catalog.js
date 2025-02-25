import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadCatalogCards } from "./catalogCard.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCatalogCards();
});