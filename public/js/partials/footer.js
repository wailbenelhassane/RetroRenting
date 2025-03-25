import {fetchJSON} from "../main.js";

export async function loadFooterContent() {
    const footerData = await fetchJSON("../public/data-json/footer.json");

    if (footerData) {
        if (footerData.footerMenu) {
            const footerMenu = document.querySelector('.footer-menu');
            if (footerMenu) {
                footerMenu.innerHTML = '';
                footerData.footerMenu.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.className = 'footer-item';

                    const link = document.createElement('a');
                    link.href = item.url;
                    link.textContent = item.title;
                    li.appendChild(link);

                    footerMenu.appendChild(li);
                });
            }
        }
    } else {
        console.error("No footer data found.");
    }
}