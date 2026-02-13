const ROUTES = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/saved": "Saved",
  "/digest": "Digest",
  "/settings": "Settings",
  "/proof": "Proof",
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  // Ignore any base path when running from file or subdirectory
  const segments = pathname.split("/").filter(Boolean);
  const last = "/" + (segments[segments.length - 1] || "");
  if (ROUTES[last]) return last;
  return "/";
}

function setActiveRoute(pathname) {
  const normalized = normalizePath(pathname);
  const titleEl = document.getElementById("route-title");
  if (titleEl) {
    titleEl.textContent = ROUTES[normalized] || "Dashboard";
  }

  const links = document.querySelectorAll(".main-nav__link");
  links.forEach((link) => {
    const route = link.getAttribute("data-route");
    if (route === normalized) {
      link.classList.add("main-nav__link--active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("main-nav__link--active");
      link.removeAttribute("aria-current");
    }
  });
}

function handleNavClick(event) {
  const link = event.target.closest(".main-nav__link");
  if (!link) return;

  event.preventDefault();
  const route = link.getAttribute("data-route") || "/";
  const currentPath = normalizePath(window.location.pathname);
  if (route !== currentPath) {
    // In file:// contexts, pushState may throw; routing should still work visually.
    if (window.location.protocol !== "file:" && window.history && window.history.pushState) {
      try {
        window.history.pushState({ route }, "", route);
      } catch {
        // Ignore navigation errors in restricted contexts.
      }
    }
  }
  // Always update the visible route state.
  setActiveRoute(route);

  // Close mobile nav after selection
  const nav = document.querySelector(".main-nav");
  if (nav && nav.classList.contains("main-nav--open")) {
    toggleNav(false);
  }
}

function toggleNav(forceOpen) {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".main-nav__toggle");
  if (!nav || !toggle) return;

  const isOpen = typeof forceOpen === "boolean" ? forceOpen : !nav.classList.contains("main-nav--open");
  nav.classList.toggle("main-nav--open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
}

function initNavigation() {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".main-nav__toggle");
  if (!nav) return;

  nav.addEventListener("click", handleNavClick);

  if (toggle) {
    toggle.addEventListener("click", () => toggleNav());
  }

  window.addEventListener("popstate", () => {
    setActiveRoute(window.location.pathname);
  });

  setActiveRoute(window.location.pathname);
}

document.addEventListener("DOMContentLoaded", initNavigation);

