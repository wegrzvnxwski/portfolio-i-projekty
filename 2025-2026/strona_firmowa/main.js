// SKRYPT OD NAVBARA, żeby się tak fajnie lepił do góry ekranu
//PRZENIESIONE DO layout.js I layout-produkty.js
/*const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});*/

// REFERENCJE - zmiana referencji
const referencje = document.querySelectorAll(".referencja");
let aktualnyIndex = 0;

if (referencje.length > 1) {
  let aktualnyIndex = 0;
}

setInterval(() => {
  referencje[aktualnyIndex].classList.remove("aktywna");

  setTimeout(() => {
    aktualnyIndex = (aktualnyIndex + 1) % referencje.length;
    referencje[aktualnyIndex].classList.add("aktywna");
  }, 300); // fade-through
}, 6000); // zmiana co 6 sekund


// Aktywne podświetlenie linku w sidebarze na podstawie URL
// PRZENIESIONE DO layout-produkty.js
/*const aktualnaStrona = window.location.pathname;
const linkiSidebar = document.querySelectorAll(".produkty-sidebar a");


linkiSidebar.forEach(link => {
  if (link.getAttribute("href") && aktualnaStrona.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});*/