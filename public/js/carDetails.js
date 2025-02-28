import { fetchJSON } from "./main.js";

export async function loadCarDetails() {
    const carId = new URLSearchParams(window.location.search).get("carId");
    const data = await fetchJSON("/RetroRenting/public/data-json/catalogSection.json");

    if (!data || !data.decades) {
        console.error("No se pudo cargar el JSON de las secciones.");
        return;
    }

    const carData = findCarById(data.decades, carId);
    if (carData) {
        updateCarViewer(carData);
        loadCarInfo();
    }
}

function findCarById(decades, carId) {
    for (const decade of decades) {
        for (const car of decade.catalogCards) {
            if (car.id === carId) {
                return car;
            }
        }
    }
    return null;
}

function updateCarViewer(carData) {
    const mainImage = document.querySelector("#main-image");
    const secondaryImages = document.querySelectorAll(".secondary-img");

    mainImage.src = carData.image.src.replace("full-frontal", "full-frontal");
    mainImage.alt = carData.title;

    secondaryImages[0].src = carData.image.src.replace("full-frontal", "full-back");
    secondaryImages[1].src = carData.image.src.replace("full-frontal", "rotated-frontal");
    secondaryImages[2].src = carData.image.src.replace("full-frontal", "side-profile");
}

function loadCarInfo() {
    const carDetailsBtn = document.getElementById("car-details-btn");
    const bookNowBtn = document.getElementById("book-now-btn");
    const carDetailsContent = document.getElementById("car-details-content");
    const bookNowContent = document.getElementById("book-now-content");

    carDetailsBtn.addEventListener("click", function () {
        switchTab(carDetailsBtn, bookNowBtn, carDetailsContent, bookNowContent);
    });

    bookNowBtn.addEventListener("click", function () {
        switchTab(bookNowBtn, carDetailsBtn, bookNowContent, carDetailsContent);
    });
}

function switchTab(activeBtn, inactiveBtn, activeContent, inactiveContent) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");
    activeContent.classList.add("active");
    inactiveContent.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", loadCarDetails);
