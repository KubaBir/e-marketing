(function () {
    var GTM_CONTAINER_ID = 'GTM-PCL2S98L';
    var GA_MEASUREMENT_ID = 'G-32DHM0DWLW';

    window.dataLayer = window.dataLayer || [];

    var gtmReady = GTM_CONTAINER_ID && GTM_CONTAINER_ID.indexOf('XXXX') === -1;
    if (gtmReady) {
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        var firstScript = document.getElementsByTagName('script')[0];
        var gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_CONTAINER_ID);
        if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(gtmScript, firstScript);
        } else {
            document.head.appendChild(gtmScript);
        }
    }

    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    var gtagLib = document.createElement('script');
    gtagLib.async = true;
    gtagLib.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gtagLib);
})();
