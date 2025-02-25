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