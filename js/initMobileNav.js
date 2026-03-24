/**
 * WVENTURES | initMobileNav
 * GSAP-powered off-canvas mobile menu with Lenis scroll lock and debounced resize reinit.
 * @dependencies gsap, Lenis
 * @build 14.03.25
 * @updated 24.03.26
 */

function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  export function initMobileNav(options = {}) {
    const OPTIONS = {
      BURGER_BUTTON: document.querySelector(".embed-burger"),
      MENU_CONTAINER: document.querySelector(".navbar__menu"),
      NAV_LINKS: document.querySelectorAll('[data-id="navbar-link"]'),
      HAMBURGER_ICON: document.getElementById("cool-hamburger"),
      BREAKPOINT: 991,
      OPEN_DURATION: 0.55,
      CLOSE_DURATION: 0.35,
      OPEN_X: "0%",
      CLOSE_X: "100%",
      DEBOUNCE_DELAY: 250,
      ...options,
    };
  
    if (window.innerWidth >= OPTIONS.BREAKPOINT) {
      console.log("skipping mobile navigation setup");
      return;
    }
  
    console.log("initializing mobile navigation");
  
    let isOpen = false;
  
    function closeMenu() {
      gsap.to(OPTIONS.MENU_CONTAINER, {
        x: OPTIONS.CLOSE_X,
        duration: OPTIONS.CLOSE_DURATION,
      });
    }
  
    function resumeScroll() {
      setTimeout(() => {
        window.pageScrollManager?.lenis?.start();
      }, OPTIONS.CLOSE_DURATION * 1000);
    }
  
    OPTIONS.BURGER_BUTTON?.addEventListener("click", () => {
      if (isOpen) {
        closeMenu();
        resumeScroll();
      } else {
        gsap.to(OPTIONS.MENU_CONTAINER, {
          x: OPTIONS.OPEN_X,
          duration: OPTIONS.OPEN_DURATION,
        });
        window.pageScrollManager?.lenis?.stop();
      }
      isOpen = !isOpen;
    });
  
    OPTIONS.NAV_LINKS.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
        OPTIONS.HAMBURGER_ICON?.dispatchEvent(
          new Event("click", { bubbles: true, cancelable: true })
        );
        resumeScroll();
      });
    });
  
    window.addEventListener(
      "resize",
      debounce(() => {
        initMobileNav(options);
      }, OPTIONS.DEBOUNCE_DELAY)
    );
  }