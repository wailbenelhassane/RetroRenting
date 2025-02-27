import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import {changeImage} from "./changeImage.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await changeImage();
});