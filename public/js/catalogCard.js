import { fetchJSON } from "./main.js";

export async function loadCatalogCards() {
    const catalogContainer = document.querySelector(".catalog-card-container");
    if (!catalogContainer) {
        console.error("No se encontró el contenedor de tarjetas.");
        return;
    }

    const data = await fetchJSON("/RetroRenting/public/data-json/catalogCard.json");
    if (!data || !data.catalogCards) {
        console.error("No se pudo cargar el JSON de las tarjetas.");
        return;
    }

    catalogContainer.innerHTML = "";

    data.catalogCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("catalog-card");

        cardElement.innerHTML = `
            <div class="catalog-card-image">
                <img src="${card.image.src}" alt="${card.image.altText}">
                <p>${card.title}</p>
            </div>
            <div class="catalog-card-info">
                ${card.info.map(infoText => `<p>${infoText}</p>`).join("")}
                <div class="catalog-card-button">
                    <a href="${card.button.link}">${card.button.text}</a>
                </div>
            </div>
        `;

        catalogContainer.appendChild(cardElement);
    });
}

document.addEventListener("DOMContentLoaded", loadCatalogCards);
