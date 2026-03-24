/**
 * WVENTURES | initNavbarScroll
 * ScrollTrigger-driven hide/show navbar that slides out after threshold on scroll down, reverses on scroll up.
 * @dependencies gsap, ScrollTrigger, Lenis
 * @build 14.03.25
 * @updated 24.03.26
 */

export function initNavbarScroll(options = {}) {
  const OPTIONS = {
    NAVBAR: document.querySelector('[data-nav="navbar"]'),
    THRESHOLD_VH: 0.65,
    HIDE_Y_PERCENT: -105,
    DURATION: 0.4,
    EASE: "power2.inOut",
    POLL_INTERVAL: 100,
    ...options,
  };

  if (!OPTIONS.NAVBAR) {
    console.log("skipping navbar scroll – element not found");
    return;
  }

  const poll = setInterval(() => {
    if (!window.pageScrollManager?.lenis) return;

    clearInterval(poll);

    let isHidden = false;
    const threshold = window.innerHeight * OPTIONS.THRESHOLD_VH;

    const tl = gsap.timeline({ paused: true });
    tl.to(OPTIONS.NAVBAR, {
      yPercent: OPTIONS.HIDE_Y_PERCENT,
      duration: OPTIONS.DURATION,
      ease: OPTIONS.EASE,
    });

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const direction = self.direction;

        if (direction === 1 && currentScrollY > threshold && !isHidden) {
          tl.play();
          isHidden = true;
        } else if (direction === -1 && isHidden) {
          tl.reverse();
          isHidden = false;
        }
      },
    });
  }, OPTIONS.POLL_INTERVAL);
}