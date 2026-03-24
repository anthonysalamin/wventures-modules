/**
 * WVENTURES | initHeaderReveal
 * GSAP-powered staggered reveal for navbar, punchline and hero images on page load.
 * @build 17.03.25
 * @updated 24.03.26
 */

export function initHeaderReveal(options = {}) {
    const OPTIONS = {
      DURATION: 0.95,
      EASE: "power4.out",
      DELAY: 0.5,
      ORIGINAL_POSITION: "0%",
      BREAKPOINT: 992,
      ...options,
    };
  
    if (window.innerWidth < OPTIONS.BREAKPOINT) {
      console.log("skipping header reveal");
      return;
    }
  
    gsap.to("[data-load='navbar']", {
      opacity: 1,
      y: OPTIONS.ORIGINAL_POSITION,
      duration: OPTIONS.DURATION,
      ease: OPTIONS.EASE,
      delay: OPTIONS.DELAY + 0.35,
    });
  
    gsap.to("[data-load='punchline']", {
      opacity: 1,
      x: OPTIONS.ORIGINAL_POSITION,
      duration: OPTIONS.DURATION,
      ease: OPTIONS.EASE,
      delay: OPTIONS.DELAY + 0.15,
    });
  
    gsap.to("[data-load='images']", {
      opacity: 1,
      y: OPTIONS.ORIGINAL_POSITION,
      duration: OPTIONS.DURATION,
      ease: OPTIONS.EASE,
      delay: OPTIONS.DELAY,
    });
  }