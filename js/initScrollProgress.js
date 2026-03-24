/**
 * WVENTURES | initScrollProgress
 * Circular SVG scroll progress indicator with scroll-to-top and auto-hide near footer.
 * @dependencies gsap, ScrollTrigger
 * @build 20.01.25
 * @updated 24.03.26
 */

export function initScrollProgress(options = {}) {
    const OPTIONS = {
      POSITION: "right",
      BREAKPOINT: 768,
      HIDE_AT_PERCENTAGE: 0.9,
      SCROLL_TO_DURATION: 0.55,
      SCROLL_TO_EASE: "power2.out",
      FADE_DURATION: 0.5,
      FADE_EASE: "power2.out",
      PROGRESS_COLOR: "rgba(255, 255, 255, 1)",
      SLIDE_COLOR: "rgba(255, 255, 255, .1)",
      HOVER_COLOR: "white",
      FONT_URL:
        "https://uploads-ssl.webflow.com/61a0f086f2b1f289503a4957/6329d8e0a1790e3283ae2504_unicons.woff",
      ICON_CONTENT: '"\\e84b"',
      ...options,
    };
  
    if (window.innerWidth < OPTIONS.BREAKPOINT) return;
  
    injectCSS(OPTIONS);
    injectHTML(OPTIONS);
  
    function injectCSS(opts) {
      const css = `
        .progress-wrap {
          --indicator-progress-color: ${opts.PROGRESS_COLOR};
          --indicator-slide-color: ${opts.SLIDE_COLOR};
          --indicator-font: "Unicons";
          --indicator-content: ${opts.ICON_CONTENT};
          --indicator-hover: ${opts.HOVER_COLOR};
        }
        @font-face {
          font-family: "Unicons";
          src: url("${opts.FONT_URL}") format("woff");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        .progress-wrap {
          position: fixed;
          mix-blend-mode: difference;
          ${opts.POSITION}: 1.5rem;
          bottom: 1.5rem;
          height: 46px;
          width: 46px;
          cursor: pointer;
          display: none;
          border-radius: 50px;
          box-shadow: inset 0 0 0 2px var(--indicator-slide-color);
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(15px);
          transition: all 200ms linear;
        }
        .progress-wrap.active-progress {
          display: block;
          transition: 1s;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .progress-wrap::after,
        .progress-wrap::before {
          position: absolute;
          font-family: var(--indicator-font);
          content: var(--indicator-content);
          text-align: center;
          line-height: 46px;
          font-size: 24px;
          left: 0;
          top: 0;
          height: 46px;
          width: 46px;
          cursor: pointer;
          display: block;
          transition: all 200ms linear;
        }
        .progress-wrap::after {
          color: var(--indicator-progress-color);
          z-index: 1;
        }
        .progress-wrap:hover::before {
          color: var(--indicator-hover);
          transform: scale(1.0);
          transform-origin: center;
        }
        .progress-wrap:hover::after {
          transform: scale(1.15);
          transform-origin: center;
        }
        .progress-wrap svg path {
          fill: none;
        }
        .progress-wrap svg.progress-circle path {
          stroke: var(--indicator-progress-color);
          stroke-width: 4;
          box-sizing: border-box;
          transition: all 200ms linear;
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  
    function injectHTML(opts) {
      document.body.insertAdjacentHTML(
        "afterbegin",
        `<div class="progress-wrap">
          <svg class="progress-circle" height="100%" viewBox="-1 -1 102 102" width="100%">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
          </svg>
        </div>`
      );
  
      initProgressAnimation(opts);
      initFooterHide(opts);
    }
  
    function initProgressAnimation(opts) {
      const wrap = document.querySelector(".progress-wrap");
      if (!wrap) return;
  
      const path = wrap.querySelector("path");
      const totalLength = path.getTotalLength();
  
      gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
  
      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
  
      gsap.to(wrap, {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top+=50px top",
          toggleClass: { targets: wrap, className: "active-progress" },
          once: false,
        },
      });
  
      wrap.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: 0,
          duration: opts.SCROLL_TO_DURATION,
          ease: opts.SCROLL_TO_EASE,
        });
      });
    }
  
    function initFooterHide(opts) {
      const wrap = document.querySelector(".progress-wrap");
      if (!wrap) return;
  
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const progress = scrollY / (docHeight - winHeight);
  
        gsap.to(wrap, {
          opacity: progress >= opts.HIDE_AT_PERCENTAGE ? 0 : 1,
          duration: opts.FADE_DURATION,
          ease: opts.FADE_EASE,
        });
      });
    }
  }
  