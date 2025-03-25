import { fetchJSON } from "./main.js";
import { validateDate, showErrors } from "./utils/validationForm.js"

export async function populateCarSelect() {
    const data = await fetchJSON("../public/data-json/bookingBar.json");
    const carSelector = document.getElementById("car-selector");

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

function getBookingData() {
    const form = document.querySelector(".booking-bar-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let carElementSelected = document.getElementById("car-selector");
        const carSelected = carElementSelected.options[carElementSelected.selectedIndex].text;
        const location = document.getElementById("location-selector").value;
        const pickupDate = document.getElementById("pickup-date-selector").value;
        const returnDate = document.getElementById("return-date-selector").value;

        const formattedDate = `${pickupDate} - ${returnDate}`;

        processBooking({
            "car": carSelected,
            "location": location,
            "formattedDate": formattedDate
        })
    });
}

function processBooking(data) {
    localStorage.setItem("bookingData", JSON.stringify(data));
    window.location.href = "../views/car-reservation-confirm.html";
}

export function validateForm(){
    document.getElementById("booking-bar-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pickUpDate = document.getElementById("pickup-date-selector");
        let returnDate = document.getElementById("return-date-selector");

        let errors = [];

        if (!validateDate(pickUpDate.value, returnDate.value)) {
            errors.push([returnDate, "Return date cannot be before the pick-up date, and the booking date must be today or later."]);
        }

        showErrors(errors, "booking-bar-container");

        if (errors.length > 0) {
            return;
        }

        if (getUserLogin() === null){
            document.getElementById("booking-bar-form").reset();
            window.location.href = "../views/login.html";
        }

        getBookingData();
    });
}

function getUserLogin(){
    let user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}
