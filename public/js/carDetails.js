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

export async function loadDetailsBar() {
    const carId = new URLSearchParams(window.location.search).get("carId");
    if (!carId) {
        console.error("❌ No se encontró carId en la URL");
        return;
    }

    try {
        const data = await fetchJSON("/RetroRenting/public/data-json/catalogSection.json");

        if (!data || !data.decades) {
            console.error("❌ No se pudo cargar el JSON de autos.");
            return;
        }

        const carData = findCarById(data.decades, carId);
        if (!carData || !carData.info) {
            console.error(`❌ No se encontraron detalles para el carId: ${carId}`);
            return;
        }

        const detailsBar = document.querySelector(".details-bar");
        if (!detailsBar) {
            console.error("❌ No se encontró la sección .details-bar en el DOM");
            return;
        }

        detailsBar.innerHTML = "";

        carData.info.forEach(detail => {
            const detailSection = document.createElement("div");
            detailSection.classList.add("detail-section");

            const detailLabel = document.createElement("p");
            detailLabel.classList.add("detail-label");
            detailLabel.textContent = detail;

            detailSection.appendChild(detailLabel);
            detailsBar.appendChild(detailSection);
        });
    } catch (error) {
        console.error("❌ Error al cargar los detalles del auto:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCarDetails();
    loadDetailsBar();
});
