import { fetchJSON } from "./main.js";

export async function populateCarSelect() {
    const data = await fetchJSON("../public/data-json/bookingBar.json");
    const carSelector = document.getElementById("car-selector");

    console.log(data);

    if (data && data.cars) {
        carSelector.innerHTML = "";

        data.cars.forEach((car) => {
            const option = document.createElement("option");
            option.value = car.value;
            option.textContent = car.name;
            carSelector.appendChild(option);
        });
    } else {
        console.error("Can't load cars data");
    }
}

export async function initAutocomplete(query){
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ`);
    const data = await response.json();
    return data.features[0].text;
}

export function getBookingData() {
    console.log("Hola Pepe")
    const form = document.querySelector(".booking-bar-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const carSelected = document.getElementById("car-selector").value;
        const locationInput = document.getElementById("location-selector").value;
        const pickupDate = document.getElementById("pickup-date-selector").value;
        const returnDate = document.getElementById("return-date-selector").value;

        if (!carSelected || !locationInput || !pickupDate || !returnDate) {
            alert("Please fill in all the fields.");
            return;
        }

        const formattedDate = `${pickupDate} - ${returnDate}`;

        localStorage.setItem("bookingBar", JSON.stringify({
            "car": carSelected,
            "location": locationInput,
            "date": formattedDate
        }));

        window.location.href = "../views/car-reservation-confirm.html";
    });
}
