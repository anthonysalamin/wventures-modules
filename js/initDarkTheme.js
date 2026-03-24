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
    const grey = resolveColor("var(--grey)");

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

    // --- Theme setter (all GSAP, single timeline) ---
    const setTheme = (theme) => {
        const isDark = theme === "dark";
        const tl = gsap.timeline({ defaults: { duration: DURATION, ease: EASE } });

        // Sections
        const sections = [partnerships, prior].filter(Boolean);
        tl.to(sections, {
            backgroundColor: isDark ? black : white,
            color: isDark ? white : black,
        }, 0);

        // Overlays
        const overlayTargets = [...overlaysUp, ...overlaysDown];
        tl.to(overlayTargets, {
            "--grad-solid": COLORS[theme].solid,
            "--grad-transparent": COLORS[theme].transparent,
        }, 0);

        // Marquee items
        const marqueeItems = document.querySelectorAll(SELECTORS.marqueeItems);
        if (marqueeItems.length) {
            tl.to(marqueeItems, {
                backgroundColor: isDark ? grey : white,
            }, 0);
        }

        // SVG logos
        const logoGroups = document.querySelectorAll('.logo-svg .logo-group');
        if (logoGroups.length) {
            tl.to(logoGroups, {
                attr: { fill: isDark ? white : black },
            }, 0);
        }
    };

    // --- ScrollTrigger ---
    ScrollTrigger.create({
        trigger: partnerships,
        start: "top 20%",
        onEnter: () => setTheme("dark"),
        onLeaveBack: () => setTheme("light"),
    });
}