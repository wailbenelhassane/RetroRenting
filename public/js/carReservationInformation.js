import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadCountry, loadCountryPrefix } from "./mainDriverInformation.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCountry();
    await loadCountryPrefix();
});