import { fetchJSON, setImage } from './main.js';

export function loadImageFromJSON(jsonPath, elementId) {
    fetchJSON(jsonPath).then(data => {
        setImage(elementId, data.imageLink, data.altText);
    });
}