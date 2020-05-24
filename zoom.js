// ==UserScript==
// @name         Close Zoom tab on success
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Devon Zuegel
// @match        https://*.zoom.us/j/*?status=success
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function () {
        window.close()
    }, 3000); // Wait 3 seconds before closing
})();