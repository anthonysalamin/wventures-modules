/**
 * WVENTURES | 🥭 main
 * Handles orchestration of UI, interactions, and global behaviors on DOM ready.
 *
 * @build 20.04.26
 * @updated 20.04.26 PHT
 * @author TONYTONY Sàrl
 */

/*
const ENV = {
    isStaging: location.hostname.endsWith(".webflow.io"),
    isProduction: location.hostname === "wventures.de"
};
*/

console.log(
    "%c🥭 Deploying main modules",
    "color: white; background: #2d6a4f; padding: 2px 6px; border-radius: 3px;",
);

// ── CDN Imports ──────────────────────────────────────────────────────────────

import { initLanguageRedirect } from 'https://cdn.wventures.de/js/initLanguageRedirect.js?v=1.0.0';
initLanguageRedirect();

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
import { initCustomCursor } from 'https://cdn.wventures.de/js/initCustomCursor.js?v=1.0.0';
import { initSVGInjection } from 'https://cdn.wventures.de/js/initSVGInjection.js?v=1.0.0';

// ── Runner ───────────────────────────────────────────────────────────────────

function run(label, fn) {
    try {
        fn();
    } catch (error) {
        console.error(`Ooopsi 👹 ${label} failed:`, error);
    }
}

// ── Bootstrap ────────────────────────────────────────────────────────────────

async function initApp() {

    // =========================
    // 1. CRITICAL / UI LAYER
    // =========================

    run("DarkTheme", initDarkTheme);
    run("NavbarScroll", initNavbarScroll);
    run("MobileNav", initMobileNav);
    run("CustomCursor", initCustomCursor);

    // =========================
    // 2. DOM MODULES
    // =========================

    // reveals & animations
    run("HeaderReveal", initHeaderReveal);
    run("RevealBig", initRevealBig);
    run("RevealSmall", initRevealSmall);
    run("TimelineReveal", initTimelineReveal);
    run("HeroParallax", initHeroParallax);

    // marquees
    run("VerticalMarquees", initVerticalMarquees);

    // scroll & progress
    run("SmoothScroll", initSmoothScroll);
    run("ScrollProgress", initScrollProgress);
    run("ProgressVisibility", initProgressVisibility);
    run("ContactScroll", initContactScroll);

    // utilities
    run("TypedFields", initTypedFields);
    run("CurrentYear", initCurrentYear);
    run("SVGInjection", initSVGInjection);

    console.log("✅ DOM modules initialized");

    // =========================
    // 3. FONT-DEPENDENT LAYER
    // =========================

    await document.fonts.ready;

    console.log("✅ Font-dependent modules initialized");

    // =========================
    // 4. DONE
    // =========================

    console.log("🚀 App fully initialized");
}

document.addEventListener("DOMContentLoaded", initApp);
