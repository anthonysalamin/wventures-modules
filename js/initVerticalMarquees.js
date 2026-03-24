/**
 * WVENTURES | initVerticalMarquees
 * Infinite vertical marquee with cloned containers, bidirectional scroll and debounced resize.
 * @build 17.03.25
 * @updated 24.03.26
 */

function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  export function initVerticalMarquees(options = {}) {
    const OPTIONS = {
      MARKEES_CONTAINER: '[data-markees="container"]',
      COLUMN_FORWARD: '[data-markees="column-forward"]',
      COLUMN_BACKWARD: '[data-markees="column-backward"]',
      DURATION: 8,
      ...options,
    };
  
    function animate() {
      document
        .querySelectorAll(`${OPTIONS.COLUMN_FORWARD}, ${OPTIONS.COLUMN_BACKWARD}`)
        .forEach((column) => {
          const container = column.querySelector(OPTIONS.MARKEES_CONTAINER);
          if (!container) return;
  
          const clone = container.cloneNode(true);
          column.innerHTML = "";
  
          const isBackward = column.matches(OPTIONS.COLUMN_BACKWARD);
  
          if (isBackward) {
            column.prepend(clone);
            column.prepend(container);
          } else {
            column.appendChild(container);
            column.appendChild(clone);
          }
  
          const height = container.offsetHeight;
          const duration = OPTIONS.DURATION * (0.8 + 2 * Math.random());
  
          gsap.set(column, { y: isBackward ? -height : 0 });
          gsap.to(column, {
            y: isBackward ? 0 : -height,
            duration,
            repeat: -1,
            ease: "none",
          });
        });
    }
  
    animate();
  
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("resized");
        gsap.killTweensOf("[data-markees]");
        animate();
      }, 200)
    );
  }