export async function barCarDetails() {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", function() {
            document.querySelectorAll(".content-bar").forEach(content => {
                content.classList.remove("active");
            });

            const decade = this.getAttribute("data-target");
            const targetContent = document.getElementById(decade);

            if (targetContent) {
                targetContent.classList.add("active");
            } else {
                console.error("Target not found:", decade);
            }

            document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
}