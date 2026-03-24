/**
 * WVENTURES | initDarkTheme
 * Scroll-triggered color transition for the partnerships section with dynamic overlay gradients.
 * @build 17.03.25
 * @updated 24.03.26
 */
export function initDarkTheme() {
    const SELECTORS = {
        timeline: '[data-section="timeline"]',
        partnerships: '[data-section="partnerships"]',
        prior: '[data-section="prior"]',
        overlaysUp: '[data-markee="overlay-up"]',
        overlaysDown: '[data-markee="overlay-down"]',
        marqueeItems: '[data-theme="marquee-item"]',
    };

    const GRADIENTS = {
        up: {
            dark: `linear-gradient(to bottom, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
            light: `linear-gradient(to bottom, white, hsla(0, 0%, 100%, 0) 30%)`,
        },
        down: {
            dark: `linear-gradient(to top, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
            light: `linear-gradient(to top, white, hsla(0, 0%, 100%, 0) 30%)`,
        },
    };

    const TRANSITION = "background-color 0.6s ease, color 0.6s ease";
    const TRANSITION_BG = "background-image 0.6s ease";

    const timeline = document.querySelector(SELECTORS.timeline);
    const partnerships = document.querySelector(SELECTORS.partnerships);
    const prior = document.querySelector(SELECTORS.prior);
    const overlaysUp = document.querySelectorAll(SELECTORS.overlaysUp);
    const overlaysDown = document.querySelectorAll(SELECTORS.overlaysDown);
    const marqueeItems = document.querySelectorAll(SELECTORS.marqueeItems);

    if (!timeline || !partnerships) return;

    // --- Transitions ---
    partnerships.style.setProperty("transition", TRANSITION);
    if (prior) prior.style.setProperty("transition", TRANSITION);

    const setTransition = (nodeList, value) =>
        nodeList.forEach((el) => el.style.setProperty("transition", value));

    setTransition(overlaysUp, TRANSITION_BG);
    setTransition(overlaysDown, TRANSITION_BG);
    setTransition(marqueeItems, TRANSITION);

    // --- Theme helpers ---
    const applyOverlays = (theme) => {
        overlaysUp.forEach((el) => (el.style.backgroundImage = GRADIENTS.up[theme]));
        overlaysDown.forEach((el) => (el.style.backgroundImage = GRADIENTS.down[theme]));
    };

    const applyMarqueeItems = (theme) => {
        const bg = theme === "dark" ? "var(--grey)" : "var(--white)";
        marqueeItems.forEach((el) => el.style.setProperty("background-color", bg, "important"));
    };

    const applySection = (el, theme) => {
        if (!el) return;
        if (theme === "dark") {
            el.style.setProperty("background-color", "var(--black)", "important");
            el.style.setProperty("color", "var(--white)", "important");
        } else {
            el.style.removeProperty("background-color");
            el.style.removeProperty("color");
        }
    };

    const setTheme = (theme) => {
        applySection(partnerships, theme);
        applySection(prior, theme);
        applyOverlays(theme);
        applyMarqueeItems(theme);
    };

    // --- ScrollTrigger ---
    ScrollTrigger.create({
        trigger: partnerships,
        start: "top 20%",
        markers: true,
        onEnter: () => setTheme("dark"),
        onLeaveBack: () => setTheme("light"),
    });
}