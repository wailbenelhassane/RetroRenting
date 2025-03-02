import { fetchJSON } from "./main.js";

export async function loadSideTextSections() {
    const data = await fetchJSON("../public/data-json/sideText.json");
    const sections = document.querySelectorAll(".side-text-section-container");

    if (data && data.sections) {
        let count = 0;
        sections.forEach(sectionElement => {
            let sectionKey = sectionElement.getAttribute("data-section");

            if (count === 0) {
                sectionElement.setAttribute('data-section', 'whoAreWe');
                sectionKey = 'whoAreWe';
            } else {
                sectionElement.setAttribute('data-section', 'ourService');
                sectionKey = 'ourService';
            }

            const sectionData = data.sections[sectionKey];

            if (sectionData) {
                const textContainer = sectionElement.querySelector(".side-text-section-text");
                const imageContainer = sectionElement.querySelector(".side-text-section-image img");

                if (textContainer) {
                    textContainer.innerHTML = `
                        <h2>${sectionData.title}</h2>
                        <p>${sectionData.content}</p>
                    `;
                }

                if (imageContainer) {
                    imageContainer.src = sectionData.src;
                    imageContainer.alt = sectionData.alt;
                }
            }
            count++;
        });
    } else {
        console.error("Error loading side text section data");
    }
}

document.addEventListener("DOMContentLoaded", loadSideTextSections);
