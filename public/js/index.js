import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    loadHeaderContent();
});