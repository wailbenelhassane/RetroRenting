function includeHTML() {
    document.querySelectorAll("[data-include]").forEach(async (element) => {
        const file = element.getAttribute("data-include");

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Error al cargar ${file}`);
            element.innerHTML = await response.text();

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
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);
