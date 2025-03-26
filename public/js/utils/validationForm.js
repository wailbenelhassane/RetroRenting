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
    return (datePickUp <= dateReturn) && (datePickUp > today) && (dateReturn > today)
}

export function validatePhone(phone) {
    let phonePattern = /^\+?\d{9,15}$/;
    return phonePattern.test(phone);
}

export function validateLocation(location) {
    let phonePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return phonePattern.test(location);
}

export function showErrors(errorList, classContainer) {
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

    let form = document.getElementById(classContainer);
    form.appendChild(errorContainer);
}