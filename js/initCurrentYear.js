/**
 * WVENTURES | initCurrentYear
 * Injects the current year into a data-attributed element for copyright footers.
 * @build 25.10.24
 * @updated 24.03.26
 */

export function initCurrentYear(options = {}) {
    const OPTIONS = {
      SELECTOR: '[data-id="year"]',
      ...options,
    };
  
    const el = document.querySelector(OPTIONS.SELECTOR);
    if (!el) return;
  
    el.textContent = new Date().getFullYear();
  }