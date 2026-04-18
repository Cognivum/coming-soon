(function () {
  function setHeaderOffset() {
    var globalHeader = document.querySelector('.cgv_global_header_shell .cgv-header');
    var h = globalHeader ? Math.ceil(globalHeader.getBoundingClientRect().height) : 104;
    document.documentElement.style.setProperty('--cgv-header-height', h + 'px');
  }

  function init() {
    setHeaderOffset();
    if (window.ResizeObserver) {
      var headerEl = document.querySelector('.cgv_global_header_shell');
      if (headerEl) {
        var ro = new ResizeObserver(function () { setHeaderOffset(); });
        ro.observe(headerEl);
      }
    }
    window.addEventListener('resize', setHeaderOffset, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
