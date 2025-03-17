import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import {loadFooterContent} from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadFooterContent();
    loadCarData();
});

function loadCarData() {
    document.addEventListener("DOMContentLoaded", function () {
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));

        if (bookingData) {
            document.querySelector(".car-selected").textContent = bookingData.car;
            document.querySelector(".location-selected").textContent = bookingData.location;
            document.querySelector(".date-selected").textContent = bookingData.date;
        } else {
            console.error("No booking data found.");
        }
    });
}