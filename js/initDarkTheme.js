/**
 * WVENTURES | initDarkTheme 🔥
 * Scroll-triggered color transition for the partnerships section with dynamic overlay gradients.
 * @build 17.03.25
 * @updated 15:21
 */
export function initDarkTheme() {
    const OPTIONS = {
      timeline: document.querySelector('[data-section="timeline"]'),
      partnerships: document.querySelector('[data-section="partnerships"]'),
      overlays: document.querySelectorAll('[data-markee="overlay"]'),
      gradients: {
        dark: `
          linear-gradient(to bottom, hsla(0, 0%, 0%, 0) 70%, var(--black)),
          linear-gradient(to bottom, var(--black), hsla(0, 0%, 0%, 0) 30%)
        `,
        light: `
          linear-gradient(to bottom, hsla(0, 0%, 100%, 0) 70%, white),
          linear-gradient(to bottom, white, hsla(0, 0%, 100%, 0) 30%)
        `
      }
    };
    if (!OPTIONS.timeline || !OPTIONS.partnerships) return;
    const updateOverlay = (gradient) => {
      OPTIONS.overlays.forEach((el) => {
        el.style.backgroundImage = gradient;
      });
    };
    ScrollTrigger.create({
      trigger: OPTIONS.partnerships,
      start: "top top",
      onEnter: () => {
        OPTIONS.partnerships.classList.add("is-dark");
        updateOverlay(OPTIONS.gradients.dark);
      },
      onLeaveBack: () => {
        OPTIONS.partnerships.classList.remove("is-dark");
        updateOverlay(OPTIONS.gradients.light);
      }
    });
  }