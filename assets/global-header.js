(function () {
  const MENU = [
    { key: "home", label: "Home", href: "https://www.cognivum.com/" },
    { key: "about", label: "About", href: "https://www.cognivum.com/#about" },
    { key: "journals", label: "Journals", href: "https://www.cognivum.com/journals" },
    { key: "authors", label: "For Authors", href: "https://www.cognivum.com/#for-authors" },
    { key: "contact", label: "Contact", href: "https://www.cognivum.com/#contact" },
  ];

  const JOURNALS = [
    {
      label: "Journal of Marketing Theory, Research and Applications",
      href: "https://www.cognivum.com/journals/journal-of-marketing-theory-research-and-applications",
    },
    {
      label: "Cognivum Journal of Business",
      href: "https://www.cognivum.com/journals/cognivum-journal-of-business",
    },
    {
      label: "Annals of Decision Analytics",
      href: "https://www.cognivum.com/journals/annals-of-decision-analytics",
    },
  ];

  function makeLink(item, active) {
    const cls = active === item.key ? "cgv-nav__link is-active" : "cgv-nav__link";
    return '<a class="' + cls + '" href="' + item.href + '">' + item.label + "</a>";
  }

  class CognivumGlobalHeader extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute("active") || "").toLowerCase();
      const logoSrc = this.getAttribute("logo-src") || "https://www.cognivum.com/assets/cognivum-logo-small.png";
      const logoAlt = this.getAttribute("logo-alt") || "Cognivum Academic Press";

      const home = makeLink(MENU[0], active);
      const about = makeLink(MENU[1], active);
      const journalsCls = active === "journals" ? "cgv-nav__link is-active" : "cgv-nav__link";
      const authors = makeLink(MENU[3], active);
      const contact = makeLink(MENU[4], active);

      const dropdownItems = JOURNALS.map(
        (item) => '<a class="cgv-dropdown__item" href="' + item.href + '">' + item.label + "</a>"
      ).join("");

      this.innerHTML =
        '<header class="cgv-header">' +
        '  <div class="cgv-header__inner">' +
        '    <a class="cgv-brand" href="https://www.cognivum.com/" aria-label="Cognivum home">' +
        '      <img src="' +
        logoSrc +
        '" alt="' +
        logoAlt +
        '" />' +
        "    </a>" +
        '    <button class="cgv-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="cgvPrimaryNav">' +
        '      <span class="cgv-menu-toggle__bars" aria-hidden="true"></span>' +
        "    </button>" +
        '    <nav class="cgv-nav" id="cgvPrimaryNav" aria-label="Primary">' +
        home +
        about +
        '      <div class="cgv-dropdown">' +
        '        <a class="' +
        journalsCls +
        '" href="https://www.cognivum.com/journals">Journals</a>' +
        '        <div class="cgv-dropdown__menu" role="menu" aria-label="Journals">' +
        dropdownItems +
        "        </div>" +
        "      </div>" +
        authors +
        contact +
        "    </nav>" +
        '    <a class="cgv-cta" href="https://www.cognivum.com/journals">Visit Journals</a>' +
        "  </div>" +
        "</header>";

      this.bindInteractions();
    }

    bindInteractions() {
      const header = this.querySelector(".cgv-header");
      const toggle = this.querySelector(".cgv-menu-toggle");
      if (!header || !toggle) return;

      const closeMenu = () => {
        header.classList.remove("is-menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      };

      const openMenu = () => {
        header.classList.add("is-menu-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      };

      const toggleMenu = () => {
        if (header.classList.contains("is-menu-open")) {
          closeMenu();
          return;
        }
        openMenu();
      };

      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        toggleMenu();
      });

      this.addEventListener("click", function (event) {
        if (window.innerWidth > 1040) return;
        const anchor = event.target && event.target.closest ? event.target.closest("a") : null;
        if (anchor) closeMenu();
      });

      document.addEventListener("click", function (event) {
        if (window.innerWidth > 1040) return;
        if (!header.contains(event.target)) closeMenu();
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
      });

      window.addEventListener(
        "resize",
        function () {
          if (window.innerWidth > 1040) closeMenu();
        },
        { passive: true }
      );
    }
  }

  if (!customElements.get("cognivum-global-header")) {
    customElements.define("cognivum-global-header", CognivumGlobalHeader);
  }
})();
