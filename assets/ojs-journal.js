(function () {
  function setHeaderOffset() {
    var globalHeader = document.querySelector('.cgv_global_header_shell .cgv-header');
    var h = globalHeader ? Math.ceil(globalHeader.getBoundingClientRect().height) : 104;
    document.documentElement.style.setProperty('--cgv-header-height', h + 'px');
  }

  function stripNavInlineStyles(head) {
    if (!head) return;
    var targets = [
      '.pkp_site_nav_menu',
      '.pkp_navigation_primary_row',
      '.pkp_navigation_primary_wrapper',
      '#navigationPrimary',
      '.pkp_navigation_search_wrapper',
      '.pkp_navigation_user_wrapper',
      '#navigationUser'
    ];

    targets.forEach(function (selector) {
      var el = head.querySelector(selector);
      if (el) el.removeAttribute('style');
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

  function forceDesktopJournalNav(head) {
    if (!head || window.innerWidth < 992) return;

    var menu = head.querySelector('.pkp_site_nav_menu');
    var primaryRow = head.querySelector('.pkp_navigation_primary_row');
    var primaryWrapper = head.querySelector('.pkp_navigation_primary_wrapper');
    var primary = head.querySelector('#navigationPrimary');
    var searchWrapper = head.querySelector('.pkp_navigation_search_wrapper');
    var userWrapper = head.querySelector('.pkp_navigation_user_wrapper');
    var userNav = head.querySelector('#navigationUser');

    if (menu) {
      menu.style.display = 'grid';
      menu.style.gridTemplateColumns = 'minmax(0, 1fr) auto auto';
      menu.style.gridTemplateAreas = '"primary search user"';
      menu.style.alignItems = 'center';
      menu.style.columnGap = '0.95rem';
      menu.style.rowGap = '0';
      menu.style.width = '100%';
    }

    if (primaryRow) {
      primaryRow.style.gridArea = 'primary';
      primaryRow.style.minWidth = '0';
    }

    if (primaryWrapper) {
      primaryWrapper.style.width = '100%';
      primaryWrapper.style.minWidth = '0';
      primaryWrapper.style.margin = '0';
      primaryWrapper.style.padding = '0';
    }

    if (primary) {
      primary.style.display = 'flex';
      primary.style.alignItems = 'center';
      primary.style.justifyContent = 'flex-start';
      primary.style.flexWrap = 'nowrap';
      primary.style.gap = '0.45rem 0.95rem';
      primary.style.width = '100%';
      primary.style.maxWidth = 'none';
      primary.style.margin = '0';
      primary.style.padding = '0';
      primary.style.whiteSpace = 'nowrap';
      primary.style.overflowX = 'auto';
      primary.style.overflowY = 'hidden';

      Array.prototype.forEach.call(primary.children || [], function (li) {
        if (!li || li.tagName !== 'LI') return;
        li.style.display = 'inline-flex';
        li.style.flex = '0 0 auto';
        li.style.width = 'auto';
        li.style.margin = '0';
        li.style.opacity = '1';
        li.style.visibility = 'visible';
        var a = li.querySelector('a');
        if (a) {
          a.style.display = 'inline-flex';
          a.style.alignItems = 'center';
          a.style.whiteSpace = 'nowrap';
          a.style.padding = '0';
          a.style.opacity = '1';
          a.style.visibility = 'visible';
        }
      });
    }

    if (searchWrapper) {
      searchWrapper.style.gridArea = 'search';
      searchWrapper.style.display = 'flex';
      searchWrapper.style.alignItems = 'center';
      searchWrapper.style.justifySelf = 'end';
      searchWrapper.style.marginLeft = '0';
    }

    if (userWrapper) {
      userWrapper.style.gridArea = 'user';
      userWrapper.style.display = 'flex';
      userWrapper.style.alignItems = 'center';
      userWrapper.style.justifySelf = 'end';
      userWrapper.style.marginLeft = '0';
      userWrapper.style.position = 'static';
      userWrapper.style.left = 'auto';
      userWrapper.style.top = 'auto';
      userWrapper.style.transform = 'none';
      userWrapper.style.maxWidth = 'none';
      userWrapper.style.padding = '0';
    }

    if (userNav) {
      userNav.style.display = 'inline-flex';
      userNav.style.alignItems = 'center';
      userNav.style.justifyContent = 'flex-end';
      userNav.style.gap = '0.75rem';
      userNav.style.margin = '0';
      userNav.style.padding = '0';
      userNav.style.width = 'auto';
      userNav.style.maxWidth = 'none';
      userNav.style.position = 'static';
    }
  }

  function normalizeJournalNav() {
    var head = document.querySelector('.pkp_structure_head.cgv_journal_head');
    if (!head) return;
    stripNavInlineStyles(head);
    forceDesktopJournalNav(head);
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
