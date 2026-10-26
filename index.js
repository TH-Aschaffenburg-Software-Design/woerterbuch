import { ladeWoerter, erstbuchstabe, eintragHtml } from "./woerterbuch.js";

const woerter = await ladeWoerter();
const vorhanden = new Set(woerter.map(erstbuchstabe));
const suche = document.querySelector("#suche");
const buchstaben = document.querySelector("#buchstaben");
const ergebnisse = document.querySelector("#ergebnisse");

buchstaben.innerHTML = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ"].map(b => `
  <div class="col">${vorhanden.has(b)
    ? `<a class="btn btn-primary btn-lg w-100" href="liste.html?buchstabe=${b}">${b}</a>`
    : `<button class="btn btn-primary btn-lg w-100" disabled>${b}</button>`}</div>`).join("");

suche.addEventListener("input", () => {
  const begriff = suche.value.toLowerCase();
  const beginntMit = e => e.wort.toLowerCase().startsWith(begriff);
  const treffer = woerter
    .filter(e => e.wort.toLowerCase().includes(begriff))
    .sort((a, b) => beginntMit(b) - beginntMit(a)); // stabil, bleibt sonst alphabetisch

  buchstaben.hidden = begriff !== "";
  ergebnisse.hidden = begriff === "";
  ergebnisse.innerHTML = treffer.map(e => eintragHtml(e, false)).join("");
});
