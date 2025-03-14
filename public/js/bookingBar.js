import { fetchJSON } from "./main.js";

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

export function validateForm(){
    document.getElementById("booking-bar-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pickUpDate = document.getElementById("pickup-date-selector");
        let returnDate = document.getElementById("return-date-selector");

        let errors = [];

        if (!validateDate(pickUpDate.value, returnDate.value)) {
            errors.push([returnDate, "Return date can not be before pick up date."]);
        }

        showErrors(errors);

        if (errors.length > 0) {
            return;
        }

        getBookingData();

        document.getElementById("booking-bar-form").reset();
    });
}

function validateDate(pickUpDate, returnDate) {
    return new Date(pickUpDate) < new Date(returnDate)
}

function showErrors(errorList) {
    let existingErrorContainer = document.getElementById("error-container");
    if (existingErrorContainer) {
        existingErrorContainer.remove();
    }

    if (errorList.length === 0) return;

    let errorContainer = document.createElement("div");
    errorContainer.id = "error-container";

    let errorListElement = document.createElement("ul");

    errorList.forEach(error => {
        let listItem = document.createElement("li");
        listItem.textContent = error[1];
        error[0].value = "";
        error[0].style.border = "2px solid red";
        errorListElement.appendChild(listItem);
    });

    errorContainer.appendChild(errorListElement);

    let container = document.getElementsByClassName("booking-bar-container");
    container[0].appendChild(errorContainer);
}