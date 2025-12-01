document.getElementById('torolForm').addEventListener('submit', function(event){
    event.preventDefault()

    const id = parseInt(document.getElementById('id').value)

    // LocalStorage betöltése
    let ujIngatlanok = JSON.parse(localStorage.getItem('ingatlanok')) || [];

    // törlés
    ujIngatlanok = ujIngatlanok.filter(i => i.id !== id)

    // visszementés
    localStorage.setItem('ingatlanok', JSON.stringify(ujIngatlanok))

    alert(`Az ingatlan (${id}) törölve lett!`)

    // Lista frissítése másik fájlban is
    window.dispatchEvent(new Event("ingatlanValtozas"))

    // vissza indexre
    window.location.href = "index.html"
})