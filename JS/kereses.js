window.kategoriak = [
    { id: 1, nev: "Ház" },
    { id: 2, nev: "Lakás" },
    { id: 4, nev: "Garázs" },
    { id: 5, nev: "Mezőgazdaság" },
    { id: 6, nev: "Üzemcsarnok" }
];

// Eredeti ingatlanok tömb
const ingatlanok = [
   {
    "id": 1,
    "kategoria_id": 1,
    "felhasznalo_id": 1,
    "nev": "Ház",
    "leiras": "Kertvárosi részén, egyszintes házat kínálunk nyugodt környezetben, nagy telken.",
    "hirdetesDatuma": "2022-03-09",
    "tehermentes": 1,
    "ar": 26990000,
    "kepUrl": "https://thumbs.dreamstime.com/b/modern-house-interior-exterior-design-46517595.jpg"
  },
  {
    "id": 2,
    "kategoria_id": 1,
    "felhasznalo_id": 2,
    "nev": "Lakás",
    "leiras": "Belvárosi környezetben, árnyékos helyen kis méretú családi ház eladó. Tömegközlekedéssel könnyen megközelíthető.",
    "hirdetesDatuma": "2022-03-16",
    "tehermentes": 1,
    "ar": 28990000,
    "kepUrl": "https://www.westsideseattle.com/sites/default/files/styles/news_teaser/public/images/archive/ballardnewstribune.com/content/articles/2008/11/21/features/columnists/column07.jpg?itok=wMrlOwFU"
  },
  {
    "id": 3,
    "kategoria_id": 2,
    "felhasznalo_id": 3,
    "leiras": "Kétszintes berendezett lakás a belvárosban kiadó.",
    "hirdetesDatuma": "2022-03-12",
    "tehermentes": 1,
    "ar": 32000000,
    "kepUrl": "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  },
  {
    "id": 4,
    "kategoria_id": 4,
    "felhasznalo_id": 1,
    "nev": "Garázs",
    "leiras": "Nagy garázs kertvárosi környezetben kiadó.",
    "hirdetesDatuma": "2022-03-14",
    "tehermentes": 1,
    "ar": 5990000,
    "kepUrl": "https://t4.ftcdn.net/jpg/05/47/58/37/360_F_547583778_jrw4cuQ4HNeOTXXvZxTBej54CJRiT3oQ.jpg"
  },
  {
    "id": 5,
    "kategoria_id": 5,
    "felhasznalo_id": 2,
     "nev": "Mezőgazdaság",
    "leiras": "10 hektáros mezőgazdasági terület eladó.",
    "hirdetesDatuma": "2022-03-18",
    "tehermentes": 1,
    "ar": 79000000,
    "kepUrl": "https://i2-prod.manchestereveningnews.co.uk/incoming/article18411144.ece/ALTERNATES/s810/0_gettyimages-1151774950-170667a.jpg"
  },
  {
    "id": 6,
    "kategoria_id": 6,
    "felhasznalo_id": 3,
    "nev": "Üzemcsarnok",
    "leiras": "Felújításra szoruló üzemcsarnok zöld környezetben áron alul eladó.",
    "hirdetesDatuma": "2022-03-11",
    "tehermentes": 0,
    "ar": 25000000,
    "kepUrl": "https://cdn.pixabay.com/photo/2019/01/31/09/24/urban-3966306_960_720.jpg"
  }
]


// Betöltéskor adjuk a kategóriákat a select-be
function kategoriak_adatai(){
    const select = document.getElementById("kategoriak")
    const alapOpcio = document.createElement("option")
    alapOpcio.value = ""
    alapOpcio.textContent = "-- Összes --"
    select.appendChild(alapOpcio)

    kategoriak.forEach(kat=>{
        const opcio = document.createElement("option")
        opcio.value = kat.id
        opcio.textContent = kat.nev
        select.appendChild(opcio)
    })
}

kategoriak_adatai()

// Keresés form submit
document.getElementById('keresForm').addEventListener('submit', function(event){
    event.preventDefault()

    const min = parseInt(document.getElementById("artol").value) || 0
    const max = parseInt(document.getElementById("arig").value) || Infinity
    const kat = document.getElementById("kategoriak").value

    // Alap lista + localStorage-ből új ingatlanok
    let lista = [...ingatlanok]
    const tarolt = JSON.parse(localStorage.getItem("ingatlanok") || "[]")
    if(tarolt.length) lista.push(...tarolt)

    // Szűrés
    const talalatok = lista.filter(i =>
        i.ar >= min &&
        i.ar <= max &&
        (kat === "" || i.kategoria_id == kat)
    )

    

    const hely = document.getElementById("ingatlanok");
    hely.className = "ingatlan-container"; // Fontos a CSS grid miatt
    hely.innerHTML = "";

    if(talalatok.length === 0){
        hely.innerHTML = "<p>Nincs találat a megadott feltételekkel.</p>";
        return;
    }

    talalatok.forEach(i => {
        const formazottAr = new Intl.NumberFormat('hu-HU').format(i.ar) + " Ft";
        const katNev = window.kategoriak.find(k => k.id == i.kategoria_id)?.nev || "Egyéb";
        
        const kartya = `
        <div class="card">
            <img src="${i.kepUrl}" alt="${i.nev}" onerror="this.src='https://via.placeholder.com/300x200?text=Nincs+Kép'">
            <div class="card-body">
                <div class="card-title">
                    <span>${katNev}</span>
                </div>
                <div class="card-price">${formazottAr}</div>
                <p class="card-info">
                   Dátum: ${i.hirdetesDatuma} <br>
                   ${i.tehermentes ? '<span class="tag tehermentes">Tehermentes</span>' : 'Nem tehermentes'}
                </p>
                <p>${i.leiras}</p>
            </div>
        </div>
        `;
        hely.innerHTML += kartya;
    })
})