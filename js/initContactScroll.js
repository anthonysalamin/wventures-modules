/**
 * WVENTURES | initContactScroll
 * Smooth Lenis scroll-to-bottom triggered by contact CTA with quartic easing.
 * @dependencies Lenis
 * @build 17.03.25
 * @updated 24.03.26
 */

export function initContactScroll(options = {}) {
    const OPTIONS = {
      SCROLL_DOWN_BTN: document.querySelector('[data-cta="contact"]'),
      SCROLL_DURATION: 1.75,
      DELAY_CLOSE_MENU: 350,
      INIT_DELAY: 1000,
      EASING: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2),
      ...options,
    };
  
    setTimeout(() => {
      if (!OPTIONS.SCROLL_DOWN_BTN || !window.pageScrollManager?.lenis) {
        console.log("skipping contact scroll – element or Lenis not found");
        return;
      }
  
      OPTIONS.SCROLL_DOWN_BTN.addEventListener("click", (e) => {
        e.preventDefault();
  
        setTimeout(() => {
          window.pageScrollManager.lenis.scrollTo(document.body.scrollHeight, {
            duration: OPTIONS.SCROLL_DURATION,
            easing: OPTIONS.EASING,
          });
        }, OPTIONS.DELAY_CLOSE_MENU);
      });
    }, OPTIONS.INIT_DELAY);
  }