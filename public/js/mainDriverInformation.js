import { fetchJSON } from "./main.js";
import {validateName, validateEmail, validatePhone, showErrors} from "./utils/validationForm.js";

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

export function validateForm(){
    document.getElementById("main-driver-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name-selector");
        let surname = document.getElementById("surname-selector");
        let email = document.getElementById("email-selector");
        let phone = document.getElementById("phone-selector");

        let errors = [];

        if (!validateName(name.value)) {
            errors.push([name, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two character"]);
        }

        if (!validateName(surname.value)) {
            errors.push([surname, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two character"]);
        }

        if (!validateEmail(email.value)){
            errors.push([email, "Wrong email format, correct format: example@domain.com"]);
        }

        if (!validatePhone(phone.value)) {
            errors.push([phone, "Wrong phone format, correct format: only numbers, must have at least 10 digits"]);
        }

        showErrors(errors, "main-driver-form-container");

        if (errors.length > 0) {
            return;
        }

        if (getUserLogin() === null){
            document.getElementById("booking-bar-form").reset();
            window.location.href = "../../views/login.html";
        }

        alert("Booking done!");

        window.location.href = "../../views/index.html";
    });
}

function getUserLogin(){
    let user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}