import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./partials/header.js";
import { loadCatalogSections } from "./partials/catalogSection.js";
import {loadFooterContent} from "./partials/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCatalogSections();
    await loadFooterContent();
});