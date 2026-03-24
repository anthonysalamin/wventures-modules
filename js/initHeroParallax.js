/**
 * WVENTURES | initHeroParallax
 * Scroll-driven parallax for hero visuals, staggered image reveals and mission section scale-in.
 * @dependencies gsap, ScrollTrigger
 * @build 24.10.23
 * @updated 24.03.26
 */

export function initHeroParallax(options = {}) {
    const OPTIONS = {
      BREAKPOINT: 992,
      STICKY_WRAP: ".hero__sticky-wrap",
      VISUALS_WRAPPER: ".hero__visuals-wrapper",
      CONTENT_WRAPPER: ".hero__content-wrapper",
      HIDDEN_IMAGES: ".hero__img.is-hidden",
      MISSION_WRAP: ".hero__mission-wrap",
      VISUALS_Y: "10%",
      CONTENT_Y: "-90%",
      MISSION_SCALE: 0.95,
      MISSION_DURATION: 0.4,
      ...options,
    };
  
    gsap.matchMedia().add(`(min-width: ${OPTIONS.BREAKPOINT}px)`, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: OPTIONS.STICKY_WRAP,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
  
      tl.to(OPTIONS.VISUALS_WRAPPER, { y: OPTIONS.VISUALS_Y, ease: "none" });
      tl.to(OPTIONS.CONTENT_WRAPPER, { y: OPTIONS.CONTENT_Y, ease: "none" }, 0);
  
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: OPTIONS.STICKY_WRAP,
          start: "top top",
          endTrigger: OPTIONS.MISSION_WRAP,
          end: "top bottom",
          scrub: true,
        },
      });
  
      tl2.set(OPTIONS.HIDDEN_IMAGES, { delay: 1, opacity: 1, stagger: 1 });
  
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: OPTIONS.MISSION_WRAP,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
  
      tl3.from(OPTIONS.MISSION_WRAP, {
        scale: OPTIONS.MISSION_SCALE,
        duration: OPTIONS.MISSION_DURATION,
      });
    });
  }