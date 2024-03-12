// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-10
// @description  try to take over the world!
// @author       You
// @match        https://uploadthing.com/dashboard/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let timeout = setInterval(() => {
      if (window.location.pathname.endsWith('/api-keys')) {
          const btn = document.querySelector('body > div.flex.h-full.w-full.flex-col > div.flex > div > div.flex > div > div.mt-6 > div.mt-6 > div > div > button:nth-child(2)');
          if (btn) {
              clearInterval(timeout);
              btn.click()
          }
      }
  }, 100)
})();
