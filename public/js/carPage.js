import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { changeImage } from "./changeImage.js";
import { loadCarDetails } from "./carDetails.js";
import { barCarDetails } from "./barCarDetailsBooking.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCarDetails();
    await changeImage();
    await barCarDetails();
});