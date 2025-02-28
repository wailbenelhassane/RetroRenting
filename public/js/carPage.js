import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import {changeImage} from "./changeImage.js";
import {loadCarDetails} from "./carDetails.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadCarDetails();
    await changeImage();
});