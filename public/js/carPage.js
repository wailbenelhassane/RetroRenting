import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./partials/header.js";
import { loadCarViewer} from "./partials/carViewer.js";
import { loadCarDetails, loadDetailsBar } from "./partials/carDetails.js";
import { barCarDetails } from "./partials/barCarDetailsBooking.js";
import { validateForm } from "./partials/bookingBar.js";
import {loadFooterContent} from "./partials/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCarDetails();
    await loadCarViewer();
    await barCarDetails();
    await loadDetailsBar();
    await validateForm();
    await loadFooterContent();
});