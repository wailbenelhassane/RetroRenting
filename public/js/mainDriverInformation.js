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

        showErrors(errors);

        if (errors.length > 0) {
            return;
        }

        if (getUserLogin() === null){
            document.getElementById("booking-bar-form").reset();
            window.location.href = "../views/login.html";
        }

        alert("Booking done!");

        window.location.href = "../views/index.html";
    });
}

function getUserLogin(){
    let user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

function validateName(name) {
    let namePattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    return namePattern.test(name);
}

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    let phonePattern = /^\+?\d{9,15}$/;
    return phonePattern.test(phone);
}

function showErrors(errorList) {
    let existingErrorContainer = document.getElementById("error-container");
    if (existingErrorContainer) {
        existingErrorContainer.remove();
    }

    if (errorList.length === 0) return;

    let errorContainerWrapper = document.createElement("div");
    errorContainerWrapper.id = "error-container-wrapper";

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
    errorContainerWrapper.appendChild(errorContainer);

    let container = document.getElementsByClassName("main-driver-form");
    container[0].appendChild(errorContainerWrapper);
}