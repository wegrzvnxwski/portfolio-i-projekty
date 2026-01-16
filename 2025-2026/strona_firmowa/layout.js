(function () {
  function injectNavbar() {
    const html = `
            <a href="index.html" class="logo">
                <img src="https://placehold.co/191x70/transparent/000" alt="Logo Firmy" title="Strona główna">
            </a>

            <button class="nav-toggle" id="nav-toggle" aria-label="Przełącz menu" aria-expanded="false" aria-controls="main-menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="menu">
                <li><a href="o-firmie.html" class="nav-link">O firmie</a></li>
                <li><a href="produkty/index.html" class="nav-link">Katalog</a></li>
                <li><a href="galeria.html" class="nav-link">Galeria</a></li>
                <li><a href="referencje.html" class="nav-link">Referencje</a></li>
                <li><a href="kontakt.html" class="nav-link">Kontakt</a></li>
            </ul>
    `;
    const ph = document.getElementById("navbar");
    if (ph) ph.innerHTML = html;
  }

  function initStickyNav() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 10) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      },
      { passive: true }
    );
  }

  function initMobileNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const toggle = nav.querySelector("#nav-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

  function injectFooter() {
    const html = `
                 <div class="stopka-wrapper">
                    <div class="sekcja-stopki">
                        <h3>FIRMA</h3>
                        <p><i class="fa-solid fa-location-dot"></i><a href="https://maps.app.goo.gl/EpeBZxvYBCAM2tp36" target="_blank" rel="noopener noreferrer">Adres</a></p>
                        <p><i class="fa-solid fa-phone"></i><a href="tel:+48000000000">00 000 00 00</a></p>
                        <p><i class="fa-solid fa-envelope"></i><a href="mailto:biuro@firma.pl">biuro@firma.pl</a></p>
                    </div>

                    <div class="sekcja-stopki">
                        <h3>GODZINY OTWARCIA</h3>
                        <p>Pon-Pt: 00:00 - 00:00</p>
                    </div>

                    <div class="sekcja-stopki">
                        <h3>SOCIAL MEDIA</h3>
                        <p><i class="fa-brands fa-facebook"></i><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                        <p><i class="fa-brands fa-instagram"></i><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                    </div>

                </div>
                <div class="the-very-bottom">
                    <small>&copy; <span id="rok"></span> Firma. Wszelkie prawa zastrzeżone.</small>
              </div>
    `;
    const ph = document.getElementById("stopka");
    if (ph) ph.innerHTML = html;
    document.getElementById("rok").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectNavbar();
    initStickyNav();
    initMobileNav();
    injectFooter();
  });
})();