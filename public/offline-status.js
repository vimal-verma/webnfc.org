(function () {
    function initOfflineBanner() {
        const banner = document.createElement('div');
        banner.textContent = 'You are currently offline';
        banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #d32f2f;
      color: white;
      text-align: center;
      padding: 12px;
      z-index: 10000;
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-weight: 500;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
        document.body.prepend(banner);

        function updateStatus() {
            banner.style.display = navigator.onLine ? 'none' : 'block';
        }

        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        updateStatus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOfflineBanner);
    } else {
        initOfflineBanner();
    }
})();