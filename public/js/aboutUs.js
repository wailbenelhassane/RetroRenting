import {fetchJSON, includeHTML} from "./main.js";
import { loadHeaderContent } from "./partials/header.js";
import { getReviews } from './partials/reviews.js';
import { initTeamCarousel } from './partials/teamCarroussel.js';
import { loadTextSections } from "./partials/centerTextSection.js";
import { loadSideTextSections } from "./partials/sideTextSection.js";
import {loadFooterContent} from "./partials/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();
  await fetchJSON();
  await loadHeaderContent();
  await initTeamCarousel();
  await getReviews();
  await loadTextSections();
  await loadSideTextSections();
  await loadFooterContent();
});