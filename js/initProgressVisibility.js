/**
 * WVENTURES | initProgressVisibility
 * ScrollTrigger-based show/hide for the timeline progress bar when its section enters the viewport.
 * @build 08.03.25
 * @updated 24.03.26
 */

export function initProgressVisibility(options = {}) {
    const OPTIONS = {
      PRODUCTION: true,
      TIMELINE_SECTION: document.querySelector('[data-section="timeline"]'),
      PROGRESS_BAR: document.querySelector('[data-timeline="progress"]'),
      ...options,
    };
  
    if (!OPTIONS.TIMELINE_SECTION || !OPTIONS.PROGRESS_BAR) {
      console.log("skipping progress visibility – elements not found");
      return;
    }
  
    OPTIONS.PROGRESS_BAR.style.display = "none";
  
    gsap.to(OPTIONS.PROGRESS_BAR, {
      scrollTrigger: {
        trigger: OPTIONS.TIMELINE_SECTION,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse",
        markers: !OPTIONS.PRODUCTION,
        onEnter: () => (OPTIONS.PROGRESS_BAR.style.display = "block"),
        onLeave: () => (OPTIONS.PROGRESS_BAR.style.display = "none"),
        onEnterBack: () => (OPTIONS.PROGRESS_BAR.style.display = "block"),
        onLeaveBack: () => (OPTIONS.PROGRESS_BAR.style.display = "none"),
      },
    });
  }