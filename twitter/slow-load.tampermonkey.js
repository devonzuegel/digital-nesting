// ==UserScript==
// @name         Slow Twitter page load
// @namespace    http://tampermonkey.net
// @version      0.1
// @description  Make Twitter load slowly
// @author       You
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        GM_log
// ==/UserScript==

function hideTemporarily(numSeconds) {
  setTimeout(function() {
      document.head.appendChild(document.createElement("style")).innerHTML = "body {opacity: .02 !important;} html {background: #eee};";
  }, 0 * 1000);

  setTimeout(function() {
      document.head.appendChild(document.createElement("style")).innerHTML = "body {opacity: 1 !important;} html {background: transparent};";
  }, numSeconds * 1000);
}

(function() { 'use strict';
  hideTemporarily(10);

  let currentPage = location.href;
  setInterval(function() { // listen for changes
      if (currentPage != location.href) {
          currentPage = location.href;
          hideTemporarily(5);
      }
  }, 5);

})();