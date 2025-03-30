import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadCarViewer} from "./carViewer.js";
import { loadCarDetails, loadDetailsBar } from "./carDetails.js";
import { barCarDetails } from "./barCarDetailsBooking.js";
import { validateForm } from "./bookingBar.js";
import { loadFooterContent } from "./footer.js";

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