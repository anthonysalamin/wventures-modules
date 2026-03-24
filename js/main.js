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


// on DOM loaded
document.addEventListener("DOMContentLoaded", () => {

    initDarkTheme();
    initHeaderReveal();
    initVerticalMarquees();
    initProgressVisibility();
    initRevealBig();
    initRevealSmall();
    initTimelineReveal();
    
    // font-dependent
    document.fonts.ready.then(() => {
        // console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});
