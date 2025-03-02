import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadCatalogSections } from "./catalogSection.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCatalogSections();
});