import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { changeImage } from "./changeImage.js";
import { loadCarDetails, loadDetailsBar } from "./carDetails.js";
import { barCarDetails } from "./barCarDetailsBooking.js";
import { validateForm } from "./bookingBar.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCarDetails();
    await changeImage();
    await barCarDetails();
    await loadDetailsBar();
    await validateForm();
});