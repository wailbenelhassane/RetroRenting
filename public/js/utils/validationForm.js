export const fieldsConfig = [
    {
        id: "name",
        validator: validateName,
        errorMessage: "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two characters.",
        getValue: () => document.getElementById("name")?.value,
    },
    {
        id: "surname",
        validator: validateName,
        errorMessage: "Wrong surname format, correct format: no numbers, has to start with a capital letter and minimum two characters.",
        getValue: () => document.getElementById("surname")?.value,
    },
    {
        id: "username",
        validator: validateUsername,
        errorMessage: "Wrong username format, correct format: minimum five characters.",
        getValue: () => document.getElementById("username")?.value,
    },
    {
        id: "email",
        validator: validateEmail,
        errorMessage: "Wrong email format, correct format: example@domain.com.",
        getValue: () => document.getElementById("email")?.value,
    },
    {
        id: "phone",
        validator: validatePhone,
        errorMessage: "Wrong phone format, correct format: only numbers, must have at least 10 digits and maximum 15 digits.",
        getValue: () => document.getElementById("phone")?.value,
    },
    {
        id: "password",
        validator: validatePassword,
        errorMessage: "Wrong password format, correct format: minimum 8 characters and minimum one capital letter.",
        getValue: () => document.getElementById("password")?.value,
    },
    {
        id: ["pasword", "confirm-password"],
        validator: validatePasswordConfirm,
        errorMessage: "Passwords mismatch.",
        getValue: () => [
            document.getElementById("password")?.value,
            document.getElementById("confirm-password")?.value,
        ]
    },
    {
        id: "location",
        validator: validateLocation,
        errorMessage: "Wrong location format, correct format: no numbers or special symbols.",
        getValue: () => document.getElementById("location")?.value,
    },
    {
        id: ["pickup-date", "return-date"],
        validator: validateDate,
        errorMessage: "The pick-up date must be before return date and both must be in the future.",
        getValue: () => [
            document.getElementById("pickup-date")?.value,
            document.getElementById("return-date")?.value
        ]
    }
];

export function validateAllFieldsForm(){
   return fieldsConfig
        .map(field => {
            const valueGetter = field.getValue;
            let value;

            try {
                value = valueGetter();
            } catch (e) {
                return null;
            }

            if (value === undefined || value === null) {
                return null;
            }

            if (Array.isArray(value) && value.includes(undefined)) {
                return null;
            }

            const isValid = Array.isArray(value)
                ? field.validator(...value)
                : field.validator(value);

            const inputIds = Array.isArray(field.id) ? field.id : [field.id];
            const inputs = inputIds
                .map(id => document.getElementById(id))
                .filter(el => el !== null && el !== undefined);

            if (!isValid && inputs.length > 0) {
                return [inputs, field.errorMessage];
            }

            return null;
        })
        .filter(error => error !== null);
}

export function validateName(name) {
    let namePattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    return namePattern.test(name);
}

export function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export function validatePassword(password){
    let passwordPattern = /^(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
}

export function validatePasswordConfirm(password, passwordConfirm){
    return passwordConfirm === password;
}

export function validateUsername(username) {
    return username.length >= 5;
}

export function validateDate(pickUpDate, returnDate) {
    let datePickUp = new Date(pickUpDate);
    let dateReturn = new Date(returnDate)

    const today = new Date();
    return (datePickUp < dateReturn) && (datePickUp >= today) && (dateReturn >= today)
}

export function validatePhone(phone) {
    let phonePattern = /^\+?\d{9,15}$/;
    return phonePattern.test(phone);
}

export function validateLocation(location) {
    let phonePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return phonePattern.test(location);
}

export function cleanAllInputs(form){
    const allInputs = document.getElementById(form).querySelectorAll("input, select, textarea");
    allInputs.forEach(input => {
        input.style.border = "";
    });
}

export function showErrors(errorList, classContainer) {
    let existingErrorContainer = document.getElementById("error-container");
    if (existingErrorContainer) {
        existingErrorContainer.remove();
    }

    if (errorList.length === 0) return;

    let errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.classList.add("error-container");

    let errorListElement = document.createElement("ul");
    let validErrorsFound = false;

    errorList.forEach(error => {
        if (error && error[1]) {
            const inputs = error[0];
            let validInputs = false;

            if (Array.isArray(inputs)) {
                const validInputElements = inputs.filter(input => input !== null && input !== undefined);
                if (validInputElements.length > 0) {
                    validInputs = true;
                    validInputElements.forEach(input => {
                        input.style.border = "2px solid red";
                        input.value = "";
                    });
                }
            }

            if (validInputs) {
                let listItem = document.createElement("li");
                listItem.textContent = error[1];
                errorListElement.appendChild(listItem);
                validErrorsFound = true;
            }
        }
    });

    if (validErrorsFound) {
        errorContainer.appendChild(errorListElement);
        let form = document.getElementById(classContainer);
        if (form) {
            form.appendChild(errorContainer);
        } else {
            console.error(`Contenedor de formulario con ID '${classContainer}' no encontrado`);
        }
    }
}