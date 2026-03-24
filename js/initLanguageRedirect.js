/**
 * WVENTURES | initLanguageRedirect
 * Locale switcher that rewrites the URL path prefix based on data-locale attribute clicks.
 * @build 21.03.25
 * @updated 24.03.26
 */

export function initLanguageRedirect(options = {}) {
    const OPTIONS = {
      SELECTOR: "[data-locale]",
      DEFAULT_LOCALE: "en",
      ...options,
    };
  
    const elements = document.querySelectorAll(OPTIONS.SELECTOR);
    if (!elements.length) return;
  
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        const locale = element.dataset.locale;
        if (!locale) return;
  
        const pathSegments = window.location.pathname.split("/").filter(Boolean);
  
        if (pathSegments.length > 0 && pathSegments[0].length === 2) {
          pathSegments.shift();
        }
  
        const newPath =
          locale === OPTIONS.DEFAULT_LOCALE
            ? `/${pathSegments.join("/")}`
            : `/${locale}/${pathSegments.join("/")}`;
  
        window.location.href = `${window.location.origin}${newPath}`;
      });
    });
  }