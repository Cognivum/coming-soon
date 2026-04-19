(function () {
  class CognivumGlobalFooter extends HTMLElement {
    connectedCallback() {
      const year = new Date().getFullYear();
      this.innerHTML =
        '<footer class="cgv-footer">' +
        '  <div class="cgv-footer__inner">' +
        '    <p><span class="cgv-footer__copyright">&copy; ' +
        year +
        ' Cognivum Academic Press.</span> <span class="cgv-footer__rights">All rights reserved.</span></p>' +
        '    <a class="cgv-back-to-top" href="#top" aria-label="Back to top" title="Back to top">&#8593;</a>' +
        "  </div>" +
        "</footer>";
    }
  }

  if (!customElements.get("cognivum-global-footer")) {
    customElements.define("cognivum-global-footer", CognivumGlobalFooter);
  }
})();
