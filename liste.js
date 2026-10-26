import { ladeWoerter, erstbuchstabe, eintragHtml } from "./woerterbuch.js";

const buchstabe = new URLSearchParams(location.search).get("buchstabe");
document.querySelector("#titel").textContent = buchstabe;
document.querySelector("#liste").innerHTML = (await ladeWoerter())
  .filter(e => erstbuchstabe(e) === buchstabe)
  .map(e => eintragHtml(e, true)).join("");
