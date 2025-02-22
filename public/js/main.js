export async function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");

    for (const element of elements) {
        const file = element.getAttribute("data-include");

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Error al cargar ${file}`);

            element.innerHTML = await response.text();

            // Cargar el CSS correspondiente
            const cssFile = file.replace(".html", ".css").replace("partials/", "../../public/scss/");
            if (!document.querySelector(`link[href="${cssFile}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = cssFile;
                document.head.appendChild(link);
            }

        } catch (error) {
            console.error(error);
            element.innerHTML = "<p>No se pudo cargar el componente.</p>";
        }
    }
}

export async function fetchJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Error al obtener JSON desde: ${path}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
        return null;
    }
}

export function setImage(elementSelector, data) {
    console.log("Configurando imagen con los datos:", data);

    const imgElement = document.querySelector(elementSelector);
    if (imgElement && data.src) {
        imgElement.src = data.src;
        imgElement.alt = data.altText || "Image not found";
        console.log(`Imagen establecida correctamente en ${elementSelector}`);
    } else {
        console.error(`No se encontró el elemento con el selector: ${elementSelector} o la ruta de la imagen es inválida.`);
    }
}

document.addEventListener("DOMContentLoaded", includeHTML);
