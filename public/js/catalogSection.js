import { fetchJSON } from "./main.js";

export async function loadCatalogSections() {
    const catalogContainer = document.querySelector("#catalog-container");
    if (!catalogContainer) {
        console.error("No se encontró el contenedor de las secciones.");
        return;
    }

    const data = await fetchJSON("/RetroRenting/public/data-json/catalogSection.json");
    if (!data || !data.decades) {
        console.error("No se pudo cargar el JSON de las secciones.");
        return;
    }

    catalogContainer.innerHTML = "";

    const decadeIds = [70, 80, 90];

    data.decades.forEach((decade, index) => {
        const sectionElement = document.createElement("section");
        sectionElement.id = decadeIds[index] || `decade-${index}`;

        const titleElement = document.createElement("div");
        titleElement.classList.add("catalog-title");
        titleElement.textContent = decade.title;

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("catalog-card-container");

        decade.catalogCards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("catalog-card");
            cardElement.innerHTML = `
                <div class="catalog-card-image">
                    <img src="${card.image.src}" alt="${card.image.altText}">
                    <p>${card.title}</p>
                </div>
                <div class="catalog-card-info">
                    ${card.info.map(infoText => `<p>${infoText}</p>`).join("")}
                    <div>
                        <button data-car-id="${card.id}" class="catalog-card-button">See more</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });

        sectionElement.appendChild(titleElement);
        sectionElement.appendChild(cardContainer);
        catalogContainer.appendChild(sectionElement);
    });

    document.querySelectorAll('.catalog-card-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const carId = event.target.getAttribute('data-car-id');
            window.location.href = `/RetroRenting/views/car-page.html?carId=${carId}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadCatalogSections();

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    }
});

