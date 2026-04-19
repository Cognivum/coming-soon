(function () {
  function setHeaderOffset() {
    var globalHeader = document.querySelector('.cgv_global_header_shell .cgv-header');
    var h = globalHeader ? Math.ceil(globalHeader.getBoundingClientRect().height) : 104;
    document.documentElement.style.setProperty('--cgv-header-height', h + 'px');
  }

  function restorePrimaryOnMobile(head) {
    var row = head.querySelector('.pkp_navigation_primary_row');
    var primary = head.querySelector('#navigationPrimary.pkp_navigation_primary');
    if (!row || !primary) return;
    row.style.removeProperty('display');
    row.style.removeProperty('order');
    row.style.removeProperty('flex');
    row.style.removeProperty('min-width');

    var inlineMenu = head.querySelector('#cgvInlinePrimaryMenu');
    if (inlineMenu) {
      inlineMenu.remove();
    }
    primary.style.removeProperty('display');
  }

  function collectPrimaryLinks(primary) {
    var links = [];
    if (!primary) return links;

    var children = primary.children || [];
    for (var i = 0; i < children.length; i++) {
      var li = children[i];
      if (!li || li.tagName !== 'LI') continue;
      var a = li.querySelector('a');
      if (!a) continue;
      var label = (a.textContent || '').trim();
      if (!label) continue;
      links.push({
        href: a.href,
        label: label
      });
    }
    return links;
  }

  function mountInlinePrimaryMenu(head, menu, primaryRow, links) {
    var inlineMenu = head.querySelector('#cgvInlinePrimaryMenu');
    if (!inlineMenu) {
      inlineMenu = document.createElement('div');
      inlineMenu.id = 'cgvInlinePrimaryMenu';
      var search = head.querySelector('.pkp_navigation_search_wrapper');
      if (search && search.parentNode === menu) {
        menu.insertBefore(inlineMenu, search);
      } else {
        menu.appendChild(inlineMenu);
      }
    }

    inlineMenu.innerHTML = '';
    inlineMenu.style.setProperty('display', 'flex', 'important');
    inlineMenu.style.setProperty('align-items', 'center', 'important');
    inlineMenu.style.setProperty('justify-content', 'flex-start', 'important');
    inlineMenu.style.setProperty('gap', '0.45rem 0.95rem', 'important');
    inlineMenu.style.setProperty('flex', '1 1 auto', 'important');
    inlineMenu.style.setProperty('min-width', '0', 'important');
    inlineMenu.style.setProperty('white-space', 'nowrap', 'important');
    inlineMenu.style.setProperty('overflow-x', 'auto', 'important');
    inlineMenu.style.setProperty('overflow-y', 'hidden', 'important');
    inlineMenu.style.setProperty('padding', '0', 'important');
    inlineMenu.style.setProperty('margin', '0', 'important');

    var currentPath = (window.location.pathname || '').replace(/\/+$/, '');
    links.forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.style.setProperty('display', 'inline-flex', 'important');
      a.style.setProperty('align-items', 'center', 'important');
      a.style.setProperty('white-space', 'nowrap', 'important');
      a.style.setProperty('font-size', '0.94rem', 'important');
      a.style.setProperty('font-family', '"Manrope", sans-serif', 'important');
      a.style.setProperty('font-weight', '500', 'important');
      a.style.setProperty('line-height', '1.2', 'important');
      a.style.setProperty('text-decoration', 'none', 'important');
      a.style.setProperty('color', '#0d0d0d', 'important');
      a.style.setProperty('padding', '0', 'important');
      a.style.setProperty('margin', '0', 'important');

      try {
        var hrefPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '');
        if (hrefPath === currentPath) {
          a.style.setProperty('text-decoration', 'underline', 'important');
          a.style.setProperty('text-underline-offset', '3px', 'important');
          a.style.setProperty('font-weight', '700', 'important');
        }
      } catch (e) {}

      inlineMenu.appendChild(a);
    });

    if (primaryRow) {
      primaryRow.style.setProperty('display', 'none', 'important');
    }
  }

  function forceInlineDesktopNav() {
    var isDesktop = window.matchMedia('(min-width: 992px)').matches;
    var head = document.querySelector('.pkp_structure_head.cgv_journal_head');
    if (!head) return;

    var menu = head.querySelector('.pkp_site_nav_menu');
    var primaryRow = head.querySelector('.pkp_navigation_primary_row');
    var primaryWrap = head.querySelector('.pkp_navigation_primary_wrapper');
    var primary = head.querySelector('#navigationPrimary.pkp_navigation_primary');
    var search = head.querySelector('.pkp_navigation_search_wrapper');
    var user = head.querySelector('.pkp_navigation_user_wrapper');

    if (!menu || !primary) return;

    if (!isDesktop) {
      restorePrimaryOnMobile(head);
      return;
    }

    var primaryLinks = collectPrimaryLinks(primary);

    menu.style.setProperty('display', 'flex', 'important');
    menu.style.setProperty('align-items', 'center', 'important');
    menu.style.setProperty('justify-content', 'flex-start', 'important');
    menu.style.setProperty('gap', '0.85rem', 'important');
    menu.style.setProperty('flex-wrap', 'nowrap', 'important');

    if (primaryRow) {
      primaryRow.style.setProperty('order', '1', 'important');
      primaryRow.style.setProperty('flex', '1 1 auto', 'important');
      primaryRow.style.setProperty('min-width', '0', 'important');
    }

    if (primaryWrap) {
      primaryWrap.style.setProperty('display', 'block', 'important');
      primaryWrap.style.setProperty('width', '100%', 'important');
      primaryWrap.style.setProperty('min-width', '0', 'important');
    }

    primary.style.setProperty('display', 'flex', 'important');
    primary.style.setProperty('flex-direction', 'row', 'important');
    primary.style.setProperty('align-items', 'center', 'important');
    primary.style.setProperty('justify-content', 'flex-start', 'important');
    primary.style.setProperty('flex-wrap', 'nowrap', 'important');
    primary.style.setProperty('gap', '0.45rem 0.95rem', 'important');
    primary.style.setProperty('width', '100%', 'important');
    primary.style.setProperty('max-width', '100%', 'important');
    primary.style.setProperty('margin', '0', 'important');
    primary.style.setProperty('padding', '0', 'important');
    primary.style.setProperty('list-style', 'none', 'important');
    primary.style.setProperty('white-space', 'nowrap', 'important');
    primary.style.setProperty('overflow-x', 'auto', 'important');
    primary.style.setProperty('overflow-y', 'hidden', 'important');

    var items = primary.querySelectorAll(':scope > li');
    items.forEach(function (li) {
      li.style.setProperty('display', 'inline-flex', 'important');
      li.style.setProperty('flex', '0 0 auto', 'important');
      li.style.setProperty('width', 'auto', 'important');
      li.style.setProperty('min-width', '0', 'important');
      li.style.setProperty('float', 'none', 'important');
      li.style.setProperty('clear', 'none', 'important');
      li.style.setProperty('position', 'static', 'important');
      li.style.setProperty('margin', '0', 'important');
      li.style.setProperty('visibility', 'visible', 'important');
      li.style.setProperty('opacity', '1', 'important');

      var a = li.querySelector(':scope > a');
      if (a) {
        a.style.setProperty('display', 'inline-flex', 'important');
        a.style.setProperty('align-items', 'center', 'important');
        a.style.setProperty('white-space', 'nowrap', 'important');
        a.style.setProperty('width', 'auto', 'important');
        a.style.setProperty('padding', '0', 'important');
        a.style.setProperty('visibility', 'visible', 'important');
        a.style.setProperty('opacity', '1', 'important');
      }
    });

    if (search) {
      search.style.setProperty('order', '2', 'important');
      search.style.setProperty('margin-left', '0', 'important');
      search.style.setProperty('flex', '0 0 auto', 'important');
      search.style.setProperty('display', 'flex', 'important');
      search.style.setProperty('align-items', 'center', 'important');
    }

    if (user) {
      user.style.setProperty('order', '3', 'important');
      user.style.setProperty('margin-left', '0.75rem', 'important');
      user.style.setProperty('flex', '0 0 auto', 'important');
      user.style.setProperty('display', 'flex', 'important');
      user.style.setProperty('align-items', 'center', 'important');
    }

    if (primaryLinks.length) {
      mountInlinePrimaryMenu(head, menu, primaryRow, primaryLinks);
    } else {
      var inlineMenu = head.querySelector('#cgvInlinePrimaryMenu');
      if (inlineMenu) inlineMenu.remove();
      if (primaryRow) {
        primaryRow.style.removeProperty('display');
      }
    }
  }

  function init() {
    setHeaderOffset();
    forceInlineDesktopNav();
    window.requestAnimationFrame(forceInlineDesktopNav);
    window.setTimeout(forceInlineDesktopNav, 120);
    window.setTimeout(forceInlineDesktopNav, 420);
    if (window.ResizeObserver) {
      var headerEl = document.querySelector('.cgv_global_header_shell');
      if (headerEl) {
        var ro = new ResizeObserver(function () {
          setHeaderOffset();
          forceInlineDesktopNav();
        });
        ro.observe(headerEl);
      }
    }
    window.addEventListener('resize', function () {
      setHeaderOffset();
      forceInlineDesktopNav();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
