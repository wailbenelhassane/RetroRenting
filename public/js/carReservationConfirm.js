import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { loadFooterContent } from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadHeaderContent();
    await loadFooterContent();
    await loadCarData();
});

async function loadCarData() {
    const bookingData = getBookingDataLocalStorage();

    if (bookingData) {
        document.getElementById("car-selected").textContent = bookingData.car;
        document.getElementById("location-selected").textContent = bookingData.location;
        document.getElementById("date-selected").textContent = bookingData.formattedDate;
    } else {
        console.error("No booking data found.");
    }
}

function getBookingDataLocalStorage() {
    let booking = localStorage.getItem("bookingData");
    return booking ? JSON.parse(booking) : null;
}