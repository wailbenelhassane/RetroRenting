import { fetchJSON } from "./main.js";

export async function loadCountry() {
    const data = await fetchJSON("../public/data-json/countrySelector.json");
    const countrySelector = document.getElementById("country-selector");

    if (data && data.countries) {
        countrySelector.innerHTML = "";

        data.countries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.name;
            countrySelector.appendChild(option);
        });
    } else {
        console.error("Can't load countries data");
    }
}

export async function loadCountryPrefix(){
    const data = await fetchJSON("../public/data-json/countrySelector.json");
    const countrySelector = document.getElementById("country-phone-selector");

    if (data && data.countries){
        countrySelector.innerHTML = "";

        data.countries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.value + country.prefix;
            countrySelector.appendChild(option);
        });
    } else {
        console.error("Can't load country data");
    }
}