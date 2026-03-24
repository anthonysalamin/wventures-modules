/**
 * WVENTURES | initTimelineReveal
 * ScrollTrigger-based opacity reveal for timeline items as they enter the viewport center.
 * @dependencies gsap, ScrollTrigger
 * @build 17.03.25
 * @updated 24.03.26
 */

export function initTimelineReveal(options = {}) {
    const OPTIONS = {
      PRODUCTION: true,
      ITEM: ".timeline__item",
      LEFT: ".timeline__left",
      RIGHT: ".timeline__right",
      LEFT_OPACITY_MUTED: 0.25,
      RIGHT_OPACITY_MUTED: 0.15,
      DURATION: 0.5,
      DELAY: 0.35,
      START: "top+=80px center",
      END: "center center",
      ...options,
    };
  
    const items = document.querySelectorAll(OPTIONS.ITEM);
  
    if (!items.length) return;
  
    items.forEach((item) => {
      const left = item.querySelector(OPTIONS.LEFT);
      const right = item.querySelector(OPTIONS.RIGHT);
  
      gsap.to(left, { opacity: OPTIONS.LEFT_OPACITY_MUTED, duration: 0 });
      gsap.to(right, { opacity: OPTIONS.RIGHT_OPACITY_MUTED, duration: 0 });
  
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: OPTIONS.START,
          end: OPTIONS.END,
          markers: !OPTIONS.PRODUCTION,
          onEnter() {
            gsap.to(left, { opacity: 1, duration: OPTIONS.DURATION, delay: OPTIONS.DELAY });
            gsap.to(right, { opacity: 1, duration: OPTIONS.DURATION, delay: OPTIONS.DELAY });
          },
          onLeaveBack() {
            gsap.to(left, { opacity: OPTIONS.LEFT_OPACITY_MUTED, duration: OPTIONS.DURATION, delay: OPTIONS.DELAY });
            gsap.to(right, { opacity: OPTIONS.RIGHT_OPACITY_MUTED, duration: OPTIONS.DURATION, delay: OPTIONS.DELAY });
          },
        },
      });
    });
  }