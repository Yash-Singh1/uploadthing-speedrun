// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-10
// @description  try to take over the world!
// @author       You
// @match        https://docs.uploadthing.com/getting-started/appdir
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uploadthing.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const sections = ['creating-your-first-fileroute', 'create-a-nextjs-api-route-using-the-filerouter', 'create-the-uploadthing-components-recommended', 'mount-a-button-and-upload']
  let sectionIdx = 0;
  function runIt() {
      if (sectionIdx === sections.length) {
          fetch('http://localhost:6969/finish')
          return
      }
      const section = sections[sectionIdx];
      document.querySelector(`#${section}`).scrollIntoView({ behavior: 'smooth' })
      let codeBlock = document.querySelector(`h3:has(> #${section})`)
      while (!codeBlock.classList.contains('nextra-code-block')) {
          codeBlock = codeBlock.nextElementSibling;
      }
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      const data = {}
      const filenameel = codeBlock.querySelector('div > div > div > div > div')
      const inputEl = document.createElement('input')
      inputEl.type = 'text'
      inputEl.value = filenameel.innerText
      inputEl.style.minWidth = '0'
      inputEl.style.background = 'none'
      inputEl.style.width = '300px'
      inputEl.spellcheck = false;
      inputEl.select()
      document.execCommand('copy')
      data.filename = inputEl.value;
      data.code = codeBlock.querySelector('code').innerText;
      codeBlock.querySelector('button').click();

      fetch('http://localhost:6969', { method: "POST", headers, body: JSON.stringify(data) })
         .then(response => {
          ++sectionIdx;
          runIt();
         })
  }
  runIt();
})();