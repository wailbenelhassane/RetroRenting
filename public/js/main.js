export async function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");

    for (const element of elements) {
        const file = element.getAttribute("data-include");

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Error al cargar ${file}`);

            element.innerHTML = await response.text();

            await processNestedComponents(element);

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

async function processNestedComponents(parentElement) {
    const nestedElements = parentElement.querySelectorAll("[data-include]");

    if (nestedElements.length > 0) {
        console.log("Cargando componentes anidados dentro de:", parentElement);

        for (const nestedElement of nestedElements) {
            const nestedFile = nestedElement.getAttribute("data-include");

            try {
                const response = await fetch(nestedFile);
                if (!response.ok) throw new Error(`Error al cargar ${nestedFile}`);

                nestedElement.innerHTML = await response.text();

                // Llamada recursiva para cargar componentes aún más anidados
                await processNestedComponents(nestedElement);

                // Cargar CSS si es necesario
                const nestedCssFile = nestedFile.replace(".html", ".css").replace("partials/", "../../public/scss/");
                if (!document.querySelector(`link[href="${nestedCssFile}"]`)) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = nestedCssFile;
                    document.head.appendChild(link);
                }

            } catch (error) {
                console.error(error);
                nestedElement.innerHTML = "<p>No se pudo cargar el componente anidado.</p>";
            }
        }
    }
}

export async function fetchJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Error al obtener JSON desde: ${path}`);
        return await response.json();
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
        return null;
    }
}

export function setMultipleImages(images) {
    Object.entries(images).forEach(([key, imageData]) => {
        let selector = "";

        selector = "." + imageData.selector;

        const imgElements = document.querySelectorAll(selector);
        if (imgElements.length > 0) {
            imgElements.forEach((imgElement) => {
                if (imageData.src) {
                    imgElement.src = imageData.src;
                    imgElement.alt = imageData.altText || "Imagen no encontrada";
                }
            });
        } else {
            console.error("The element not found.");
        }
    });
}

export function setImage(elementSelector, data) {

    const imgElement = document.querySelector(elementSelector);
    if (imgElement && data.src) {
        imgElement.src = data.src;
        imgElement.alt = data.altText || "Image not found";
    } else {
        console.error("The element not found.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
});
