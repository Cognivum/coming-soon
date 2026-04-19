(function () {
  function setHeaderOffset() {
    var globalHeader = document.querySelector('.cgv_global_header_shell .cgv-header');
    var h = globalHeader ? Math.ceil(globalHeader.getBoundingClientRect().height) : 104;
    document.documentElement.style.setProperty('--cgv-header-height', h + 'px');
  }

  function normalizeJournalNav() {
    var head = document.querySelector('.pkp_structure_head.cgv_journal_head');
    if (!head) return;

    var targets = [
      '.pkp_site_nav_menu',
      '.pkp_navigation_primary_row',
      '.pkp_navigation_primary_wrapper',
      '#navigationPrimary',
      '.pkp_navigation_search_wrapper',
      '.pkp_navigation_user_wrapper'
    ];

    targets.forEach(function (selector) {
      var el = head.querySelector(selector);
      if (el) {
        el.removeAttribute('style');
      }
    });

    var primary = head.querySelector('#navigationPrimary');
    if (primary) {
      Array.prototype.forEach.call(primary.children || [], function (li) {
        if (!li || li.tagName !== 'LI') return;
        li.removeAttribute('style');
        var a = li.querySelector('a');
        if (a) a.removeAttribute('style');
      });
    }
  }

  function init() {
    setHeaderOffset();
    normalizeJournalNav();
    window.requestAnimationFrame(function () {
      setHeaderOffset();
      normalizeJournalNav();
    });
    window.setTimeout(function () {
      setHeaderOffset();
      normalizeJournalNav();
    }, 250);

    window.addEventListener(
      'resize',
      function () {
        setHeaderOffset();
        normalizeJournalNav();
      },
      { passive: true }
    );

    if (window.ResizeObserver) {
      var headerEl = document.querySelector('.cgv_global_header_shell');
      if (headerEl) {
        var ro = new ResizeObserver(function () {
          setHeaderOffset();
        });
        ro.observe(headerEl);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
