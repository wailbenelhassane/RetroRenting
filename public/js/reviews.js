export async function getReviews() {
  const reviewsContainer = document.querySelector(".reviews");

  function getStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }


  fetch("../../RetroRenting/public/data-json/reviews.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      return response.json();
    })
    .then(reviewsData => {
      // Generar tarjetas dinámicamente
      reviewsData.forEach(review => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${review.image}" alt="Profile Picture" class="profile-pic">
          <h3>${review.name}</h3>
          <p>"${review.review}"</p>
          <div class="stars">${getStars(review.rating)}</div>
        `;

        reviewsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al obtener las reseñas:", error);
      reviewsContainer.innerHTML = "<p style='color: white;'>No se pudieron cargar las reseñas.</p>";
    });
}
