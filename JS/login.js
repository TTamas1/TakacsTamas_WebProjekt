const adatok=[
  {
    "id": 1,
    "email": "teszt1@gmail.com",
    "jelszo": "1231"
  },
  {
    "id": 2,
    "email": "teszt2@gmail.com",
    "jelszo": "qwerty"
  },
  {
    "id": 3,
    "email": "teszt3@gmail.com",
    "jelszo": "asdc"
  }
]

document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    const email=document.getElementById("email").value 
    const jelszo=document.getElementById("jelszo").value


    const felhasznalo = adatok.find(u => u.email === email && u.jelszo === jelszo);

    if(felhasznalo){
        alert('Sikeres bejelentkezés!');
        window.location.href = "index.html"; // átirányítás
    } else {
        alert('Hibás email vagy jelszó!');
    }
})