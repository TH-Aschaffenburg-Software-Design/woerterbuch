export async function ladeWoerter() {
  const text = await (await fetch("woerterbuch.txt", { cache: "no-store" })).text();
  const feld = (eintrag, name) => eintrag.match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1];
  return text.split(/^---$/m)
    .map(e => ({ wort: feld(e, "Wort"), bild: feld(e, "Bild"), beschreibung: feld(e, "Beschreibung") }))
    .filter(e => e.wort)
    .sort((a, b) => a.wort.localeCompare(b.wort, "de"));
}

export const erstbuchstabe = e => e.wort[0].toUpperCase();

export const eintragHtml = (e, mitBild) => `
  <a class="list-group-item list-group-item-action d-flex align-items-center gap-2 fs-4"
     href="wort.html?wort=${encodeURIComponent(e.wort)}">
    ${mitBild && e.bild ? `<img src="${e.bild}" alt="" width="24" height="24">` : ""}${e.wort}
  </a>`;
