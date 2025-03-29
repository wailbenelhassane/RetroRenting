import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadCountry, loadCountryPrefix } from "./mainDriverInformation.js";
import { validateForm } from "./mainDriverInformation.js";
import {loadFooterContent} from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCountry();
    console.log("Holiiws")
    await loadCountryPrefix();
    console.log("Holiiws")
    await validateForm();
    await loadFooterContent();
});