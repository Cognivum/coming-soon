(function () {
  var LEGACY_OJS_HOSTS = {
    'origin-cjs.cognivum.com': true,
    'cjs.cognivum.com': true
  };

  function upsertIconLink(rel, href, sizes) {
    var selector = 'link[rel="' + rel + '"]';
    var link = document.head ? document.head.querySelector(selector) : null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
    if (sizes) link.setAttribute('sizes', sizes);
    if (rel === 'icon') link.setAttribute('type', 'image/png');
  }

  function ensureFavicon() {
    if (!document.head) return;
    var href = '/favicon-cognivum-square.png';
    upsertIconLink('icon', href, '512x512');
    upsertIconLink('shortcut icon', href);
    upsertIconLink('apple-touch-icon', href);
  }

  function setHeaderOffset() {
    var globalHeader = document.querySelector('.cgv_global_header_shell .cgv-header');
    var h = globalHeader ? Math.ceil(globalHeader.getBoundingClientRect().height) : 104;
    document.documentElement.style.setProperty('--cgv-header-height', h + 'px');

    var journalHeader = document.querySelector('.pkp_structure_head.cgv_journal_head');
    var journalH = journalHeader ? Math.ceil(journalHeader.getBoundingClientRect().height) : 147;
    document.documentElement.style.setProperty('--cgv-journal-head-height', journalH + 'px');
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

  function closeJournalMobileMenu(head) {
    if (!head) return;
    head.classList.remove('cgv-menu-open');
    var toggle = head.querySelector('.cgv-journal-menu-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open journal menu');
  }

  function ensureJournalMobileMenu(head) {
    if (!head) return;

    var topbar = head.querySelector('.cgv_journal_topbar');
    var menu = head.querySelector('.pkp_site_nav_menu');
    if (!topbar || !menu) return;

    if (!menu.id) menu.id = 'cgvJournalNav';

    var toggle = topbar.querySelector('.cgv-journal-menu-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'cgv-journal-menu-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', menu.id);
      toggle.setAttribute('aria-label', 'Open journal menu');
      toggle.innerHTML = '<span class="cgv-journal-menu-toggle__bars" aria-hidden="true"></span>';

      var title = topbar.querySelector('.cgv_journal_title');
      if (title) {
        topbar.insertBefore(toggle, title);
      } else {
        topbar.insertBefore(toggle, topbar.firstChild);
      }
    } else {
      toggle.setAttribute('aria-controls', menu.id);
    }

    if (head.dataset.cgvMobileMenuBound === '1') return;
    head.dataset.cgvMobileMenuBound = '1';

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = head.classList.toggle('cgv-menu-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close journal menu' : 'Open journal menu');
    });

    head.addEventListener('click', function (event) {
      if (window.innerWidth > 992) return;
      var anchor = event.target && event.target.closest ? event.target.closest('a') : null;
      if (anchor) closeJournalMobileMenu(head);
    });

    document.addEventListener('click', function (event) {
      if (window.innerWidth > 992) return;
      if (!head.contains(event.target)) closeJournalMobileMenu(head);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeJournalMobileMenu(head);
    });
  }

  function normalizeJournalNav() {
    var head = document.querySelector('.pkp_structure_head.cgv_journal_head');
    if (!head) return;
    ensureJournalMobileMenu(head);
    if (window.innerWidth >= 992) closeJournalMobileMenu(head);
    stripNavInlineStyles(head);
    forceDesktopJournalNav(head);
  }

  function getJournalSlugFromPath(pathname) {
    if (!pathname) return '';
    var clean = pathname.split('?')[0].split('#')[0].toLowerCase().replace(/\/+$/, '');
    var parts = clean.split('/').filter(Boolean);
    if (!parts.length) return '';

    var journalsIdx = parts.indexOf('journals');
    if (journalsIdx !== -1 && parts[journalsIdx + 1]) return parts[journalsIdx + 1];

    var indexPhpIdx = parts.indexOf('index.php');
    if (indexPhpIdx !== -1 && parts[indexPhpIdx + 1]) return parts[indexPhpIdx + 1];

    if (parts[0] !== 'index.php') return parts[0];
    return parts[parts.length - 1] || '';
  }

  function normalizePublicJournalPath(pathname) {
    var path = (pathname || '/').trim();
    if (!path) path = '/';
    if (path.charAt(0) !== '/') path = '/' + path;

    path = path.replace(/^\/index\.php(?=\/|$)/i, '') || '/';

    if (path === '/' || /^\/index\/?$/i.test(path)) {
      return '/journals';
    }

    if (/^\/journals(\/|$)/i.test(path)) {
      return path.replace(/\/{2,}/g, '/');
    }

    return ('/journals' + path).replace(/\/{2,}/g, '/');
  }

  function redirectLegacyOriginHost() {
    var host = (window.location.hostname || '').toLowerCase();
    if (!LEGACY_OJS_HOSTS[host]) return false;

    var target = new URL(window.location.href);
    target.protocol = 'https:';
    target.hostname = 'www.cognivum.com';
    target.port = '';
    target.pathname = normalizePublicJournalPath(target.pathname);

    if (target.href !== window.location.href) {
      window.location.replace(target.href);
      return true;
    }
    return false;
  }

  function rewriteLegacyJournalLinks(root) {
    var scope = root || document;
    var links = scope.querySelectorAll ? scope.querySelectorAll('a[href]') : [];
    if (!links.length) return;

    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

      var parsed;
      try {
        parsed = new URL(href, window.location.origin);
      } catch (e) {
        return;
      }

      var host = (parsed.hostname || '').toLowerCase();
      if (!LEGACY_OJS_HOSTS[host]) return;

      parsed.protocol = 'https:';
      parsed.hostname = 'www.cognivum.com';
      parsed.port = '';
      parsed.pathname = normalizePublicJournalPath(parsed.pathname);

      link.setAttribute('href', parsed.toString());
    });
  }

  function normalizeJournalDirectoryBlock() {
    var block = document.getElementById('customblock-cognivum-academic-press-journals');
    if (!block) return;

    var links = block.querySelectorAll('.content a[href]');
    if (!links.length) return;

    var currentSlug = getJournalSlugFromPath(window.location.pathname);
    if (!currentSlug) return;

    Array.prototype.forEach.call(links, function (link) {
      link.classList.remove('cgv-current-journal-link');
      var container = link.closest('h1, h2, h3, h4, h5, h6, p, li');
      if (container) container.classList.remove('cgv-current-journal-link');

      var linkPath = '';
      try {
        linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
      } catch (e) {
        linkPath = link.pathname || '';
      }
      var linkSlug = getJournalSlugFromPath(linkPath);
      if (linkSlug && linkSlug === currentSlug) {
        link.classList.add('cgv-current-journal-link');
        if (container) container.classList.add('cgv-current-journal-link');
      }
    });
  }

  function setHomepageSummaryHeading() {
    var page = document.querySelector('.page_index_journal');
    if (!page) return;
    var aboutHeading = page.querySelector('.homepage_about h2');
    if (!aboutHeading) return;
    aboutHeading.textContent = 'Summary';
  }

  function init() {
    if (redirectLegacyOriginHost()) return;
    ensureFavicon();
    rewriteLegacyJournalLinks(document);
    setHeaderOffset();
    normalizeJournalNav();
    normalizeJournalDirectoryBlock();
    setHomepageSummaryHeading();
    window.requestAnimationFrame(function () {
      rewriteLegacyJournalLinks(document);
      setHeaderOffset();
      normalizeJournalNav();
      normalizeJournalDirectoryBlock();
      setHomepageSummaryHeading();
    });
    window.setTimeout(function () {
      rewriteLegacyJournalLinks(document);
      setHeaderOffset();
      normalizeJournalNav();
      normalizeJournalDirectoryBlock();
      setHomepageSummaryHeading();
    }, 250);

    window.addEventListener(
      'resize',
      function () {
        rewriteLegacyJournalLinks(document);
        setHeaderOffset();
        normalizeJournalNav();
        normalizeJournalDirectoryBlock();
        setHomepageSummaryHeading();
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
