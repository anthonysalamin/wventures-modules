/**
 * WVENTURES | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initDarkTheme } from 'https://cdn.wventures.de/js/initDarkTheme.js?v=1.0.0';


// on DOM loaded
document.addEventListener("DOMContentLoaded", () => {

    // smooth scroll
    new initDarkTheme();

    // font-dependent
    document.fonts.ready.then(() => {
        // console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});
