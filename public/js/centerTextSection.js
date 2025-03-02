import { fetchJSON } from "./main.js";

export async function loadTextSections() {
    const data = await fetchJSON("../public/data-json/centerText.json");
    const sections = document.querySelectorAll(".center-text-section-container");

    if (data && data.sections) {
        let count = 0;
        sections.forEach(sectionElement => {
            let sectionKey = sectionElement.getAttribute("data-section");

            if (count === 0) {
                sectionElement.setAttribute('data-section', 'philosophy');
                sectionKey = 'philosophy';
            } else {
                sectionElement.setAttribute('data-section', 'contact');
                sectionKey = 'contact';
            }

            const sectionData = data.sections[sectionKey];

            if (sectionData) {
                sectionElement.innerHTML = `
                    <div class="center-text-section">
                        <h2>${sectionData.title}</h2>
                        <p>${sectionData.content}</p>
                    </div>
                `;
            }

            count++;
        });
    } else {
        console.error("Error loading text section data");
    }
}
