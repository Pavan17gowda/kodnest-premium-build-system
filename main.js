const ROUTES = {
  "/": "landing",
  "/dashboard": "dashboard",
  "/saved": "saved",
  "/digest": "digest",
  "/settings": "settings",
  "/proof": "proof",
};

function normalizePath(pathname) {
  // For this static shell, default to landing and treat unknown paths as landing.
  if (!pathname || pathname === "/") return "/";
  const segments = pathname.split("/").filter(Boolean);
  const last = "/" + (segments[segments.length - 1] || "");
  if (ROUTES[last]) return last;
  return "/";
}

function renderLanding() {
  return `
    <header class="route-header route-header--landing">
      <h1 class="route-title">Stop Missing The Right Jobs.</h1>
      <p class="route-subtitle">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <div class="route-actions">
        <button type="button" class="btn btn--primary route-cta js-route-link" data-route="/settings">
          Start Tracking
        </button>
      </div>
    </header>
  `;
}

function renderSettings() {
  return `
    <header class="route-header">
      <h1 class="route-title">Settings</h1>
      <p class="route-subtitle">
        Define how Job Notification Tracker should understand your preferences. Logic will be added in the next step.
      </p>
    </header>
    <section class="settings">
      <form class="settings-form" aria-label="Job notification preferences">
        <div class="settings-grid">
          <div class="field-group">
            <label for="role-keywords" class="field-label">Role keywords</label>
            <input
              id="role-keywords"
              class="field-input"
              type="text"
              placeholder="e.g. Frontend Engineer, Data Analyst"
            />
          </div>
          <div class="field-group">
            <label for="preferred-locations" class="field-label">Preferred locations</label>
            <input
              id="preferred-locations"
              class="field-input"
              type="text"
              placeholder="e.g. Berlin, Remote Europe"
            />
          </div>
          <div class="field-group">
            <label for="work-mode" class="field-label">Mode</label>
            <select id="work-mode" class="field-input">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </select>
          </div>
          <div class="field-group">
            <label for="experience-level" class="field-label">Experience level</label>
            <select id="experience-level" class="field-input">
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
        </div>
        <p class="field-helper">
          These fields are placeholders. Matching and datasets will be added later.
        </p>
      </form>
    </section>
  `;
}

function renderDashboard() {
  return `
    <header class="route-header">
      <h1 class="route-title">Dashboard</h1>
      <p class="route-subtitle">
        No jobs yet. In the next step, you will load a realistic dataset.
      </p>
    </header>
  `;
}

function renderSaved() {
  return `
    <section class="empty-state">
      <h1 class="route-title">Saved</h1>
      <p class="route-subtitle">
        You haven't saved any roles yet. In the next step, saved jobs will appear here for calm review.
      </p>
    </section>
  `;
}

function renderDigest() {
  return `
    <section class="empty-state">
      <h1 class="route-title">Digest</h1>
      <p class="route-subtitle">
        Your daily digest is not configured yet. In the next step, a 9AM summary will be generated here.
      </p>
    </section>
  `;
}

function renderProof() {
  return `
    <section class="empty-state">
      <h1 class="route-title">Proof</h1>
      <p class="route-subtitle">
        This space will collect artifacts that demonstrate your job search activity and outcomes.
      </p>
    </section>
  `;
}

function renderRoute(pathname) {
  const normalized = normalizePath(pathname);
  const container = document.getElementById("route-content");
  if (!container) return;

  let html = "";
  switch (ROUTES[normalized]) {
    case "settings":
      html = renderSettings();
      break;
    case "dashboard":
      html = renderDashboard();
      break;
    case "saved":
      html = renderSaved();
      break;
    case "digest":
      html = renderDigest();
      break;
    case "proof":
      html = renderProof();
      break;
    case "landing":
    default:
      html = renderLanding();
      break;
  }

  container.innerHTML = html;
}

function setActiveRoute(pathname) {
  const normalized = normalizePath(pathname);

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

  renderRoute(normalized);
}

function handleNavClick(event) {
  const link = event.target.closest(".main-nav__link, .js-route-link");
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

function handleGlobalRouteClick(event) {
  const link = event.target.closest(".js-route-link");
  if (!link) return;
  handleNavClick(event);
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

  // Capture CTA route links rendered inside route content
  document.addEventListener("click", handleGlobalRouteClick);

  window.addEventListener("popstate", () => {
    setActiveRoute(window.location.pathname);
  });

  setActiveRoute(window.location.pathname);
}

document.addEventListener("DOMContentLoaded", initNavigation);

