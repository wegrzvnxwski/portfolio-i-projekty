(function () {
  const CONSENT_KEY = "cookieConsent";
  const GA_ID = "G-XXXXXXXXXX"; // TODO: podmień na prawdziwe

  function ensureGtagBase() {
    // Upewnij się, że gtag istnieje zanim go użyjesz
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
  }

  function setDefaultConsentDenied() {
    ensureGtagBase();
    // Domyślnie: brak zgody (zanim cokolwiek GA zostanie załadowane)
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  function loadGtagScriptOnce() {
    if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return; // nie ładuj, jeśli nie ustawiono
    if (document.querySelector('script[data-ga4="gtag"]')) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    s.setAttribute("data-ga4", "gtag");
    document.head.appendChild(s);

    ensureGtagBase();
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  function grantAnalytics() {
    ensureGtagBase();
    window.gtag("consent", "update", { analytics_storage: "granted" });
    loadGtagScriptOnce();
  }

  function denyAnalytics() {
    ensureGtagBase();
    window.gtag("consent", "update", { analytics_storage: "denied" });
    // Nie ładujemy GA
  }

  function createCookieBanner() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="cookie-banner" id="cookie-banner">
        <div class="cookie-banner--content">
          <p>Strona używa plików Cookies w celach badania ruchu na stronie za pomocą Google Analytics.</p>
          <div class="cookie-banner--buttons">
            <button id="cookie-accept-all" type="button">Akceptuję</button>
            <button id="cookie-reject" type="button">Odrzucam</button>
            <a href="cookies.html" target="_blank" rel="noopener" id="cookie-learn-more">Czytaj więcej</a>
          </div>
        </div>
      </div>
    `;
    const banner = wrapper.firstElementChild;
    document.body.appendChild(banner);
    return banner;
  }

  function resolvePolicyHref() {
    const depth = location.pathname.split("/").filter(Boolean).length;
    return depth >= 2 ? "../cookies.html" : "cookies.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    setDefaultConsentDenied();

    const stored = localStorage.getItem(CONSENT_KEY);

    if (stored === "all") {
      grantAnalytics();
      return;
    }

    if (stored === "denied") {
      denyAnalytics();
      return;
    }

    const banner = createCookieBanner();

    const readMore = banner.querySelector("#cookie-learn-more");
    readMore.setAttribute("href", resolvePolicyHref());

    const btnAll = banner.querySelector("#cookie-accept-all");
    const btnReject = banner.querySelector("#cookie-reject");

    btnAll.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "all");
      grantAnalytics();
      banner.remove();
    });

    btnReject.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "denied");
      denyAnalytics();
      banner.remove();
    });
  });
})();

console.log("cookies-popup.js loaded");