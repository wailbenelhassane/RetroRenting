import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./partials/header.js";
import { loadCountry, loadCountryPrefix } from "./partials/mainDriverInformation.js";
import { validateForm } from "./partials/mainDriverInformation.js";
import {loadFooterContent} from "./partials/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCountry();
    await loadCountryPrefix();
    await validateForm();
    await loadFooterContent();
});