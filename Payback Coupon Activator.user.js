// ==UserScript==
// @name           Payback Coupon Activator
// @name:de        Payback-Coupon-Aktivierer

// @description    Activates all Payback coupons on a shop's site before continuing to site.
// @description:de Aktiviert alle Payback-Coupons auf der Seite eines Shops und leitet dann auf die Seite weiter.

// @version        1.1.0
// @copyright      2024+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://www.payback.de/resource/blob/4506/b8323ff55b34054722769ae5652c22ae/main-favicon.ico

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/Payback-Coupon-Activator
// @supportURL     https://github.com/Rsge/Payback-Coupon-Activator/issues

// @match          https://www.payback.de/shop/*

// @run-at         document-idle
// @grant          none
// @downloadURL https://update.greasyfork.org/scripts/504550/Payback%20Coupon%20Activator.user.js
// @updateURL https://update.greasyfork.org/scripts/504550/Payback%20Coupon%20Activator.meta.js
// ==/UserScript==

(async function () {
  'use strict';

  // Constants
  const T = 1 * 1000;
  // Resources
  const WAITING_MSG = "Waiting for coupons to be loaded.";

  // Basic functions
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Wait for loading of and get coupon nutshell.
  let couponBox;
  do {
    await sleep(T);
    try {
      couponBox = document.getElementsByClassName("MuiStack-root mui-1kfiduk")[0];
      if (couponBox.attributes["data-testid"]) {
        break;
      }
    } catch {}
    console.log(WAITING_MSG);
  } while (true);
  // Activate all inactive coupons.
  let i;
  for (i = 0; i < couponBox.children.length; i++) {
    let coupon = couponBox.children[i].firstElementChild.firstElementChild;
    let couponButton = coupon.children[1].children[1].firstElementChild.firstElementChild;
    if (couponButton.attributes["data-testid"].value.endsWith("not_activated")) {
      couponButton.click();
    }
  }
  // Continue to shop.
  await sleep(3*T);
  let continueButton = document.getElementById("submit-button");
  continueButton.click();
})();
