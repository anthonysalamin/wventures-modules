/**
 * WVENTURES | initRevealSmall
 * ScrollTrigger scrub animation that fades split chars from muted to full color on scroll.
 * @dependencies gsap, ScrollTrigger, SplitType, Lenis
 * @build 05.03.25
 * @updated 24.03.26
 */

function setAlphaToPointThree(color, opacity) {
    const rgba = color.match(/rgba?\((\d+), (\d+), (\d+),? ?([\d.]*)?\)/);
    if (rgba) {
      return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${opacity})`;
    }
    return color;
  }
  
  export function initRevealSmall(options = {}) {
    const OPTIONS = {
      PRODUCTION: true,
      TARGET: '[data-reveal="small"]',
      TYPE: "words, chars",
      DURATION: 0.3,
      STAGGER: 0.02,
      START: "top 80%",
      END: "top 20%",
      ...options,
    };
  
    const splitTypes = document.querySelectorAll(OPTIONS.TARGET);
  
    splitTypes.forEach((char) => {
      const fg = window.getComputedStyle(char).color;
      const bg = setAlphaToPointThree(fg, 0.1);
      const text = new SplitType(char, { types: OPTIONS.TYPE });
  
      gsap.fromTo(
        text.chars,
        { color: bg },
        {
          color: fg,
          duration: OPTIONS.DURATION,
          stagger: OPTIONS.STAGGER,
          scrollTrigger: {
            trigger: char,
            start: OPTIONS.START,
            end: OPTIONS.END,
            scrub: true,
            markers: !OPTIONS.PRODUCTION,
            toggleActions: "play play reverse reverse",
          },
        }
      );
    });
  }