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

document.addEventListener("DOMContentLoaded", loadCarDetails);
