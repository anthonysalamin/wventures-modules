/**
 * WVENTURES | initTypedFields
 * Typed.js rotating text for city/address/zip fields with Japanese locale support and responsive fallback.
 * @dependencies Typed.js
 * @build 10.05.25
 * @updated 24.03.26
 */

function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  export function initTypedFields(options = {}) {
    const isJapanese = window.location.pathname.includes("/ja");
  
    const OPTIONS = {
      BREAKPOINT: 992,
      TOTAL_TYPING_TIME: 150,
      BACK_DELAY: 2500,
      DEBOUNCE_DELAY: 250,
      CONFIG: isJapanese
        ? {
            city: {
              selector: "[data-type='city']",
              static: "ベルリン",
              words: ["ベルリン", "ドルトムント"],
            },
            address: {
              selector: "[data-type='address']",
              static: "ゲーテ通り 81",
              words: ["ゲーテ通り 81", "リスボン並木道 14"],
            },
            zip: {
              selector: "[data-type='zip']",
              static: "10623 ベルリン",
              words: ["10623 ベルリン", "4269 ドルトムント"],
            },
          }
        : {
            city: {
              selector: "[data-type='city']",
              static: "Berlin",
              words: ["Berlin", "Dortmund"],
            },
            address: {
              selector: "[data-type='address']",
              static: "Goethestraße 81",
              words: ["Goethestraße 81", "Lissaboner Allee 14"],
            },
            zip: {
              selector: "[data-type='zip']",
              static: "10623 Berlin",
              words: ["10623 Berlin", "4269 Dortmund"],
            },
          },
      ...options,
    };
  
    const typedInstances = {};
  
    function getTypeSpeed(word) {
      return Math.round(OPTIONS.TOTAL_TYPING_TIME / word.length);
    }
  
    function cleanFields() {
      document.querySelectorAll("[data-type]").forEach((el) => {
        el.innerHTML = "";
      });
    }
  
    function injectCursorStyle() {
      const style = document.createElement("style");
      style.textContent = '[data-type]::after { content: "|"; opacity: 0; }';
      document.head.appendChild(style);
    }
  
    function insertStaticContent() {
      for (const key in OPTIONS.CONFIG) {
        const el = document.querySelector(OPTIONS.CONFIG[key].selector);
        if (el) el.innerText = OPTIONS.CONFIG[key].static;
      }
    }
  
    function createTypedInstance(selector, words) {
      return new Typed(selector, {
        strings: words,
        typeSpeed: getTypeSpeed(words[0]),
        backSpeed: getTypeSpeed(words[0]),
        backDelay: OPTIONS.BACK_DELAY,
        loop: true,
        showCursor: false,
        preStringTyped: (index, self) => {
          const word = words[index];
          self.options.typeSpeed = getTypeSpeed(word);
          self.options.backSpeed = getTypeSpeed(word);
        },
      });
    }
  
    function destroyAll() {
      cleanFields();
      for (const key in typedInstances) {
        if (typedInstances[key]) {
          typedInstances[key].destroy();
          typedInstances[key] = null;
        }
      }
    }
  
    function startTyping() {
      cleanFields();
      injectCursorStyle();
      for (const key in OPTIONS.CONFIG) {
        typedInstances[key] = createTypedInstance(
          OPTIONS.CONFIG[key].selector,
          OPTIONS.CONFIG[key].words
        );
      }
    }
  
    function initialize() {
      if (window.innerWidth >= OPTIONS.BREAKPOINT) {
        insertStaticContent();
      } else {
        startTyping();
      }
    }
  
    function handleResize() {
      destroyAll();
      if (window.innerWidth < OPTIONS.BREAKPOINT) {
        startTyping();
      } else {
        insertStaticContent();
      }
    }
  
    initialize();
  
    window.addEventListener("resize", debounce(handleResize, OPTIONS.DEBOUNCE_DELAY));
  }
  