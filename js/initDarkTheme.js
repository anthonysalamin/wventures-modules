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

    const DURATION = 0.6;
    const EASE = "power2.inOut";
    const TRANSITION = "background-color 0.6s ease, color 0.6s ease";

    // --- Resolve CSS variables at runtime ---
    const resolveColor = (cssVar) => {
        const temp = document.createElement("div");
        temp.style.color = cssVar;
        document.body.appendChild(temp);
        const resolved = getComputedStyle(temp).color;
        document.body.removeChild(temp);
        return resolved;
    };

    const toRGBA = (rgb, alpha = 1) => {
        const match = rgb.match(/[\d.]+/g);
        if (!match || match.length < 3) return rgb;
        return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
    };

    const black = resolveColor("var(--black)");
    const white = resolveColor("var(--white)");

    const COLORS = {
        dark: { solid: toRGBA(black, 1), transparent: toRGBA(black, 0) },
        light: { solid: toRGBA(white, 1), transparent: toRGBA(white, 0) },
    };

    // --- Query DOM ---
    const timeline = document.querySelector(SELECTORS.timeline);
    const partnerships = document.querySelector(SELECTORS.partnerships);
    const prior = document.querySelector(SELECTORS.prior);
    const overlaysUp = document.querySelectorAll(SELECTORS.overlaysUp);
    const overlaysDown = document.querySelectorAll(SELECTORS.overlaysDown);

    if (!timeline || !partnerships) return;

    // --- Transitions for sections ---
    partnerships.style.setProperty("transition", TRANSITION);
    if (prior) prior.style.setProperty("transition", TRANSITION);

    // --- Init CSS custom properties on overlays ---
    const initOverlay = (el, direction) => {
        el.style.setProperty("--grad-solid", COLORS.light.solid);
        el.style.setProperty("--grad-transparent", COLORS.light.transparent);
        el.style.backgroundImage =
            direction === "up"
                ? "linear-gradient(to bottom, var(--grad-solid), var(--grad-transparent) 30%)"
                : "linear-gradient(to top, var(--grad-solid), var(--grad-transparent) 30%)";
    };

    overlaysUp.forEach((el) => initOverlay(el, "up"));
    overlaysDown.forEach((el) => initOverlay(el, "down"));

    // --- Theme helpers ---
    const applyOverlays = (theme) => {
        const { solid, transparent } = COLORS[theme];
        const targets = [...overlaysUp, ...overlaysDown];
        gsap.to(targets, {
            "--grad-solid": solid,
            "--grad-transparent": transparent,
            duration: DURATION,
            ease: EASE,
        });
    };

    const applyMarqueeItems = (theme) => {
        const bg = theme === "dark" ? "var(--grey)" : "var(--white)";
        document.querySelectorAll(SELECTORS.marqueeItems).forEach((el) => {
            el.style.setProperty("transition", TRANSITION);
            el.style.setProperty("background-color", bg, "important");
        });
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
        onEnter: () => setTheme("dark"),
        onLeaveBack: () => setTheme("light"),
    });
}