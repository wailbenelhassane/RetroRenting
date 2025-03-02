import {fetchJSON, includeHTML} from "./main.js";
import { loadHeaderContent } from "./header.js";
import { getReviews } from './reviews.js';
import { initTeamCarousel } from './teamCarroussel.js';
import { loadTextSections } from "./centerTextSection.js";
import { loadSideTextSections } from "./sideTextSection.js";

document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();
  await fetchJSON();
  await loadHeaderContent();
  await initTeamCarousel();
  await getReviews();
  await loadTextSections();
  await loadSideTextSections();
});