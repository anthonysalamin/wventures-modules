/**
 * WVENTURES | initDarkTheme 🔥
 * Scroll-triggered color transition for the partnerships section with dynamic overlay gradients.
 * @build 17.03.25
 * @updated 23.03.26
 */
export function initDarkTheme() {
    const OPTIONS = {
        timeline: document.querySelector('[data-section="timeline"]'),
        partnerships: document.querySelector('[data-section="partnerships"]'),
        prior: document.querySelector('[data-section="prior"]'),
        overlaysUp: document.querySelectorAll('[data-markee="overlay-up"]'),
        overlaysDown: document.querySelectorAll('[data-markee="overlay-down"]'),
        gradients: {
            up: {
                dark: `linear-gradient(to bottom, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
                light: `linear-gradient(to bottom, white, hsla(0, 0%, 100%, 0) 30%)`,
            },
            down: {
                dark: `linear-gradient(to top, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
                light: `linear-gradient(to top, white, hsla(0, 0%, 100%, 0) 30%)`,
            },
        },
    };
    if (!OPTIONS.timeline || !OPTIONS.partnerships) return;

    const updateOverlays = (theme) => {
        OPTIONS.overlaysUp.forEach((el) => {
            el.style.backgroundImage = OPTIONS.gradients.up[theme];
        });
        OPTIONS.overlaysDown.forEach((el) => {
            el.style.backgroundImage = OPTIONS.gradients.down[theme];
        });
    };

    const updateSection = (el, theme) => {
        if (!el) return;
        if (theme === "dark") {
            el.style.backgroundColor = "var(--black)";
            el.style.color = "var(--white)";
        } else {
            el.style.backgroundColor = "";
            el.style.color = "";
        }
    };

    const logStyles = (label) => {
        console.log(`=== ${label} ===`);

        if (OPTIONS.prior) {
            const priorComputed = getComputedStyle(OPTIONS.prior);
            console.log("prior inline bg:", OPTIONS.prior.style.backgroundColor);
            console.log("prior inline color:", OPTIONS.prior.style.color);
            console.log("prior computed bg:", priorComputed.backgroundColor);
            console.log("prior computed color:", priorComputed.color);
        } else {
            console.warn("prior element is null");
        }

        const partnerComputed = getComputedStyle(OPTIONS.partnerships);
        console.log("partnerships inline bg:", OPTIONS.partnerships.style.backgroundColor);
        console.log("partnerships inline color:", OPTIONS.partnerships.style.color);
        console.log("partnerships computed bg:", partnerComputed.backgroundColor);
        console.log("partnerships computed color:", partnerComputed.color);
    };

    ScrollTrigger.create({
        trigger: OPTIONS.partnerships,
        start: "top center",
        markers: true,
        onEnter: () => {
            updateSection(OPTIONS.partnerships, "dark");
            updateSection(OPTIONS.prior, "dark");
            updateOverlays("dark");
            logStyles("onEnter");
        },
        onLeaveBack: () => {
            updateSection(OPTIONS.partnerships, "light");
            updateSection(OPTIONS.prior, "light");
            updateOverlays("light");
            logStyles("onLeaveBack");
        },
    });
}