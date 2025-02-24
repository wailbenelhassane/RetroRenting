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

document.addEventListener("DOMContentLoaded", populateCarSelect);