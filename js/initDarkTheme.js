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
      overlaysUp: document.querySelectorAll('[data-markee="overlay-up"]'),
      overlaysDown: document.querySelectorAll('[data-markee="overlay-down"]'),
      gradients: {
        up: {
          dark: `linear-gradient(to bottom, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
          light: `linear-gradient(to bottom, white, hsla(0, 0%, 100%, 0) 30%)`
        },
        down: {
          dark: `linear-gradient(to top, var(--black), hsla(0, 0%, 0%, 0) 30%)`,
          light: `linear-gradient(to top, white, hsla(0, 0%, 100%, 0) 30%)`
        }
      }
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

    ScrollTrigger.create({
      trigger: OPTIONS.partnerships,
      start: "top top",
      onEnter: () => {
        OPTIONS.partnerships.classList.add("is-dark");
        updateOverlays("dark");
      },
      onLeaveBack: () => {
        OPTIONS.partnerships.classList.remove("is-dark");
        updateOverlays("light");
      }
    });
  }