/**
 * WVENTURES | initNavbarScroll
 * Lenis-driven hide/show navbar that slides out on scroll down and back in on scroll up.
 * @dependencies gsap, Lenis
 * @build 14.03.25
 * @updated 24.03.26
 */

export function initNavbarScroll(options = {}) {
    const OPTIONS = {
      NAVBAR: document.querySelector('[data-nav="navbar"]'),
      SCROLL_THRESHOLD: 100,
      HIDE_Y: "-150%",
      SHOW_Y: "0%",
      DURATION: 0.3,
      EASE: "power2.out",
      HIDE_DELAY: 0.25,
      SHOW_DELAY: 0.1,
      POLL_INTERVAL: 100,
      ...options,
    };
  
    if (!OPTIONS.NAVBAR) {
      console.log("skipping navbar scroll – element not found");
      return;
    }
  
    let lastScrollY = 0;
  
    const poll = setInterval(() => {
      if (!window.pageScrollManager?.lenis) return;
  
      clearInterval(poll);
  
      const lenis = window.pageScrollManager.lenis;
      lastScrollY = lenis.scroll;
  
      lenis.on("scroll", ({ scroll }) => {
        if (scroll > lastScrollY && scroll > OPTIONS.SCROLL_THRESHOLD) {
          gsap.to(OPTIONS.NAVBAR, {
            y: OPTIONS.HIDE_Y,
            duration: OPTIONS.DURATION,
            ease: OPTIONS.EASE,
            delay: OPTIONS.HIDE_DELAY,
          });
        } else if (scroll < lastScrollY) {
          gsap.to(OPTIONS.NAVBAR, {
            y: OPTIONS.SHOW_Y,
            duration: OPTIONS.DURATION,
            ease: OPTIONS.EASE,
            delay: OPTIONS.SHOW_DELAY,
          });
        }
  
        lastScrollY = scroll;
      });
    }, OPTIONS.POLL_INTERVAL);
  }