/**
 * WVENTURES | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initDarkTheme } from 'https://cdn.wventures.de/js/initDarkTheme.js?v=1.0.0';
import { initHeaderReveal } from 'https://cdn.wventures.de/js/initHeaderReveal.js?v=1.0.0';
import { initVerticalMarquees } from 'https://cdn.wventures.de/js/initVerticalMarquees.js?v=1.0.0';
import { initProgressVisibility } from 'https://cdn.wventures.de/js/initProgressVisibility.js?v=1.0.0';
import { initRevealBig } from 'https://cdn.wventures.de/js/initRevealBig.js?v=1.0.0';
import { initRevealSmall } from 'https://cdn.wventures.de/js/initRevealSmall.js?v=1.0.0';
import { initTimelineReveal } from 'https://cdn.wventures.de/js/initTimelineReveal.js?v=1.0.0';
import { initHeroParallax } from 'https://cdn.wventures.de/js/initHeroParallax.js?v=1.0.0';
import { initSmoothScroll } from 'https://cdn.wventures.de/js/initSmoothScroll.js?v=1.0.0';
import { initNavbarScroll } from 'https://cdn.wventures.de/js/initNavbarScroll.js?v=1.0.0';
import { initMobileNav } from 'https://cdn.wventures.de/js/initMobileNav.js?v=1.0.0';
import { initContactScroll } from 'https://cdn.wventures.de/js/initContactScroll.js?v=1.0.0';
import { initTypedFields } from 'https://cdn.wventures.de/js/initTypedFields.js?v=1.0.0';
import { initScrollProgress } from 'https://cdn.wventures.de/js/initScrollProgress.js?v=1.0.0';
import { initCurrentYear } from 'https://cdn.wventures.de/js/initCurrentYear.js?v=1.0.0';
import { initLanguageRedirect } from 'https://cdn.wventures.de/js/initLanguageRedirect.js?v=1.0.0';

// on DOM loaded
document.addEventListener("DOMContentLoaded", () => {

    initDarkTheme();
    initHeaderReveal();
    initVerticalMarquees();
    initProgressVisibility();
    initRevealBig();
    initRevealSmall();
    initTimelineReveal();
    initHeroParallax();
    initNavbarScroll();
    initMobileNav();
    initContactScroll();
    initTypedFields();
    initScrollProgress();
    initCurrentYear();
    initLanguageRedirect();
    
    // font-dependent
    document.fonts.ready.then(() => {
        // console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});

window.addEventListener("load", () => {
    setTimeout(() => {
      initSmoothScroll();
    }, 250);
    console.log(`✅ Initialized all load-dependent modules`);
  });
