/**
 * WVENTURES | initCustomCursor
 * Data-attribute-driven custom cursor with edge-aware positioning, drag support and responsive teardown.
 * @dependencies gsap
 * @build 09.02.26
 * @updated 24.03.26
 */

function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  export function initCustomCursor(options = {}) {
    const OPTIONS = {
      BREAKPOINT: 768,
      TARGETS: document.querySelectorAll("[data-cursor]"),
      SIZE: "90px",
      RADIUS: "50%",
      FONT_SIZE: "18px",
      COLOR: {
        BACKGROUND: "#fff",
        TEXT: "#000",
      },
      MIX_BLEND_MODE: "difference",
      OFFSET: 10,
      EDGE_MARGIN: 100,
      DEBOUNCE_DELAY: 200,
      ...options,
    };
  
    if (!OPTIONS.TARGETS.length) {
      console.log("skipping custom cursor – no targets found");
      return;
    }
  
    const cursorInstance = { current: null };
    cursorInstance.current = createCursor(OPTIONS);
    setupResize(cursorInstance, OPTIONS);
    checkInitialHover(OPTIONS, cursorInstance.current);
  
    function getLabelHTML(text) {
      return `<p style="margin:0;padding:0;font-size:${OPTIONS.FONT_SIZE};font-weight:500;letter-spacing:0.2px;text-align:center;line-height:1;"><b>${text}</b></p>`;
    }
  
    function getCursorOffset(clientX, clientY) {
      const size = parseInt(OPTIONS.SIZE);
      const offset = OPTIONS.OFFSET;
      const margin = OPTIONS.EDGE_MARGIN;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
  
      const spaceRight = vw - clientX;
      const spaceBottom = vh - clientY;
  
      let offsetX = offset;
      let offsetY = offset;
  
      if (spaceRight < size + margin) {
        const t = Math.min(1, Math.max(0, 1 - (spaceRight - size) / margin));
        offsetX = offset * (1 - t) + (-size - offset) * t;
      }
  
      if (spaceBottom < size + margin) {
        const t = Math.min(1, Math.max(0, 1 - (spaceBottom - size) / margin));
        offsetY = offset * (1 - t) + (-size - offset) * t;
      }
  
      return { offsetX, offsetY };
    }
  
    function cleanupCursor(instance) {
      if (!instance) return;
      const { cursor, eventListeners, targets } = instance;
  
      targets.forEach((target, i) => {
        const listeners = eventListeners[i];
        target.removeEventListener("mousemove", listeners.mousemove);
        target.removeEventListener("mouseenter", listeners.mouseenter);
        target.removeEventListener("mouseleave", listeners.mouseleave);
        if (listeners.mousedown) {
          target.removeEventListener("mousedown", listeners.mousedown);
          document.removeEventListener("mouseup", listeners.mouseup);
        }
      });
  
      cursor?.parentNode?.removeChild(cursor);
    }
  
    function createCursor(opts) {
      if (window.innerWidth <= opts.BREAKPOINT) {
        console.log("skipping custom cursor on mobile");
        return null;
      }
  
      const cursor = document.createElement("div");
      Object.assign(cursor.style, {
        width: opts.SIZE,
        height: opts.SIZE,
        borderRadius: opts.RADIUS,
        mixBlendMode: opts.MIX_BLEND_MODE,
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: opts.COLOR.BACKGROUND,
        color: opts.COLOR.TEXT,
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "0",
        left: "-9999px",
        top: "-9999px",
      });
      document.body.appendChild(cursor);
  
      const eventListeners = [];
  
      opts.TARGETS.forEach((target) => {
        const isDrag = target.dataset.cursor.toLowerCase() === "drag";
  
        const listeners = {
          mousemove(ev) {
            const { offsetX, offsetY } = getCursorOffset(ev.clientX, ev.clientY);
            gsap.to(cursor, {
              duration: 0.65,
              left: ev.clientX + offsetX,
              top: ev.clientY + offsetY,
              ease: "power2.out",
            });
          },
          mouseenter() {
            cursor.innerHTML = getLabelHTML(target.dataset.cursor);
            gsap.to(cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
            if (isDrag) target.style.cursor = "grab";
          },
          mouseleave(ev) {
            const related = ev.relatedTarget;
            let nextLabel = null;
  
            opts.TARGETS.forEach((t) => {
              if (t.contains(related)) nextLabel = t.dataset.cursor;
            });
  
            if (nextLabel) {
              cursor.innerHTML = getLabelHTML(nextLabel);
            } else {
              gsap.to(cursor, { opacity: 0, duration: 0.3, ease: "power2.out" });
            }
  
            if (isDrag) target.style.cursor = "";
          },
        };
  
        target.addEventListener("mousemove", listeners.mousemove);
        target.addEventListener("mouseenter", listeners.mouseenter);
        target.addEventListener("mouseleave", listeners.mouseleave);
  
        if (isDrag) {
          listeners.mousedown = () => {
            target.style.cursor = "grabbing";
          };
          listeners.mouseup = () => {
            target.style.cursor = "grab";
          };
          target.addEventListener("mousedown", listeners.mousedown);
          document.addEventListener("mouseup", listeners.mouseup);
        }
  
        eventListeners.push(listeners);
      });
  
      return { cursor, eventListeners, targets: opts.TARGETS };
    }
  
    function setupResize(instance, opts) {
      window.addEventListener(
        "resize",
        debounce(() => {
          if (window.innerWidth <= opts.BREAKPOINT) {
            if (instance.current) {
              cleanupCursor(instance.current);
              instance.current = null;
            }
          } else if (!instance.current) {
            instance.current = createCursor(opts);
          }
        }, opts.DEBOUNCE_DELAY)
      );
    }
  
    function checkInitialHover(opts, instance) {
      if (!instance) return;
  
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
  
      opts.TARGETS.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
          instance.cursor.innerHTML = getLabelHTML(target.dataset.cursor);
          gsap.to(instance.cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
        }
      });
    }
  }