import { fetchJSON } from "./main.js";
import { showErrors, cleanAllInputs, validateAllFieldsForm } from "./utils/validationForm.js";
import { getUserLogin } from "./services/authService.js";

export async function loadCountry() {
    const data = await fetchJSON("../public/data-json/countrySelector.json");
    const countrySelector = document.getElementById("country");

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
    const countrySelector = document.getElementById("country-phone");

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

export function validateForm(){
    document.getElementById("main-driver-form").addEventListener("submit", function(event) {
        event.preventDefault();

        cleanAllInputs("main-driver-form");

        let errors = validateAllFieldsForm();

        showErrors(errors, "main-driver-form-container");

        if (errors.length > 0) {
            return;
        }

        if (getUserLogin() === null){
            document.getElementById("main-driver-form").reset();
            window.location.href = "../views/login.html";
            return;
        }

        alert("Booking done!");

        window.location.href = "../views/index.html";
    });
}