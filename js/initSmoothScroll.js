/**
 * WVENTURES | initSmoothScroll
 * Lenis smooth scroll with ScrollTrigger proxy, ResizeObserver and Elfsight feed height handling.
 * @dependencies Lenis, gsap, ScrollTrigger
 * @build 23.03.25
 * @updated 24.03.26
 */

class SmoothScrollManager {
    constructor(options = {}) {
      this.options = {
        SMOOTH: true,
        DURATION: 1.75,
        LERP: 0.1,
        DIRECTION: "vertical",
        GESTURE_DIRECTION: "vertical",
        SMOOTH_TOUCH: false,
        INFINITE: false,
        ELFSIGHT_SELECTOR: ".elfsight-app",
        LOAD_MORE_BUTTON: ".eapps-linkedin-feed-load-more-button",
        LOAD_MORE_WRAP: ".eapps-linkedin-feed-load-more",
        LOAD_MORE_DELAY: 500,
        ...options,
      };
  
      this.lenis = null;
      this.isAnimating = false;
      this.init();
    }
  
    init() {
      this.lenis = new Lenis({
        smooth: this.options.SMOOTH,
        duration: this.options.DURATION,
        lerp: this.options.LERP,
        direction: this.options.DIRECTION,
        gestureDirection: this.options.GESTURE_DIRECTION,
        smoothTouch: this.options.SMOOTH_TOUCH,
        infinite: this.options.INFINITE,
      });
  
      window.pageScrollManager = this;
      window.lenis__pageScroll = this.lenis;
  
      console.log(
        window.lenis__pageScroll
          ? "lenis__pageScroll available"
          : "lenis__pageScroll error"
      );
      console.log("SmoothScrollManager initialized");
  
      this.startAnimation();
      this.observeContentChanges();
      this.setupScrollTrigger();
    }
  
    startAnimation() {
      if (this.isAnimating) return;
      this.isAnimating = true;
  
      const animate = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(animate);
      };
  
      requestAnimationFrame(animate);
    }
  
    setupScrollTrigger() {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop: (value) =>
          arguments.length
            ? this.lenis.scrollTo(value, { immediate: true })
            : window.scrollY,
        getBoundingClientRect: () => ({
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }),
        pinType: document.body.style.transform ? "transform" : "fixed",
      });
  
      this.lenis.on("scroll", ScrollTrigger.update);
    }
  
    observeContentChanges() {
      const observer = new ResizeObserver(() => {
        this.updateScrollHeight();
      });
  
      observer.observe(document.body);
  
      const elfsight = document.querySelector(this.options.ELFSIGHT_SELECTOR);
      if (elfsight) observer.observe(elfsight);
  
      document.addEventListener("click", (e) => {
        if (
          e.target.matches(this.options.LOAD_MORE_BUTTON) ||
          e.target.closest(this.options.LOAD_MORE_WRAP)
        ) {
          setTimeout(() => this.updateScrollHeight(), this.options.LOAD_MORE_DELAY);
        }
      });
    }
  
    updateScrollHeight() {
      if (!this.lenis) return;
      this.lenis.resize();
      ScrollTrigger.refresh();
      console.log("Scroll height updated");
    }
  }
  
  export function initSmoothScroll(options = {}) {
    return new SmoothScrollManager(options);
  }