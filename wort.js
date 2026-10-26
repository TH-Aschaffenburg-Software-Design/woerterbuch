import { ladeWoerter, erstbuchstabe } from "./woerterbuch.js";

const name = new URLSearchParams(location.search).get("wort");
const e = (await ladeWoerter()).find(e => e.wort === name);

document.querySelector("#zurueck").href = `liste.html?buchstabe=${erstbuchstabe(e)}`;
document.querySelector("#eintrag").innerHTML = `
  <h1>${e.wort}</h1>
  <p class="fs-4 mt-5"><strong>Erklärung:</strong> ${e.beschreibung}</p>
  ${e.bild ? `<img class="img-fluid detail-image mb-3" src="${e.bild}" alt="${e.wort}">` : ""}
  `;
