const ROUTES = {
  "/": "landing",
  "/dashboard": "dashboard",
  "/saved": "saved",
  "/digest": "digest",
  "/settings": "settings",
  "/proof": "proof",
};

const STORAGE_KEY = "jobNotificationTracker:savedJobs";

let currentFilters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const JOBS = createJobDataset();

function createJobDataset() {
  const base = [
    {
      title: "SDE Intern",
      company: "Amazon India",
      location: "Bengaluru",
      mode: "Hybrid",
      experience: "Fresher",
      skills: ["Java", "Data Structures", "Algorithms"],
      source: "LinkedIn",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://amazon.jobs/en/jobs/intern-sde-bangalore",
      description:
        "Work with experienced engineers on real customer-facing services.\n" +
        "Contribute to design, development, and testing of backend components.\n" +
        "Exposure to large-scale distributed systems and AWS technologies.\n" +
        "Strong foundation in OOP and problem-solving is expected.",
    },
    {
      title: "Graduate Engineer Trainee",
      company: "Infosys",
      location: "Mysuru",
      mode: "Onsite",
      experience: "0-1",
      skills: ["Java", "Spring Boot", "SQL"],
      source: "Naukri",
      salaryRange: "3–5 LPA",
      applyUrl: "https://careers.infosys.com/graduate-engineer-trainee",
      description:
        "Participate in a structured training program at the Mysuru campus.\n" +
        "Work on internal tools and client project shadowing.\n" +
        "Collaborate with mentors to understand full SDLC practices.\n" +
        "Rotation across backend, testing, and deployment streams.",
    },
    {
      title: "Frontend Intern",
      company: "Flipkart",
      location: "Bengaluru",
      mode: "Hybrid",
      experience: "Fresher",
      skills: ["JavaScript", "React", "TypeScript"],
      source: "LinkedIn",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://careers.flipkart.com/frontend-intern",
      description:
        "Support the storefront team in building high-quality user interfaces.\n" +
        "Implement reusable React components following design system guidelines.\n" +
        "Work closely with designers and backend engineers for feature delivery.\n" +
        "Learn performance profiling and accessibility best practices.",
    },
    {
      title: "QA Intern",
      company: "Wipro",
      location: "Hyderabad",
      mode: "Onsite",
      experience: "Fresher",
      skills: ["Manual Testing", "Test Cases", "JIRA"],
      source: "Indeed",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://careers.wipro.com/qa-intern",
      description:
        "Assist QA leads in preparing and executing test cases for web applications.\n" +
        "Log defects with clear reproduction steps and impact analysis.\n" +
        "Participate in daily standups and test planning sessions.\n" +
        "Opportunity to get exposure to automation tools over time.",
    },
    {
      title: "Data Analyst Intern",
      company: "Swiggy",
      location: "Bengaluru",
      mode: "Remote",
      experience: "Fresher",
      skills: ["SQL", "Excel", "Python", "Tableau"],
      source: "LinkedIn",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://careers.swiggy.com/data-analyst-intern",
      description:
        "Work with the central analytics team on marketplace health metrics.\n" +
        "Build dashboards to track key operational KPIs.\n" +
        "Write efficient SQL queries over large datasets.\n" +
        "Present insights in a structured and concise manner.",
    },
    {
      title: "Junior Backend Developer",
      company: "Razorpay",
      location: "Bengaluru",
      mode: "Hybrid",
      experience: "1-3",
      skills: ["Node.js", "REST APIs", "PostgreSQL"],
      source: "Naukri",
      salaryRange: "6–10 LPA",
      applyUrl: "https://razorpay.com/careers/junior-backend-developer",
      description:
        "Implement payment APIs and background workers with high reliability.\n" +
        "Collaborate with SDE2/SDE3 engineers on design and code reviews.\n" +
        "Own small services from development to deployment and monitoring.\n" +
        "Work in an environment with strong engineering practices.",
    },
    {
      title: "React Developer",
      company: "Freshworks",
      location: "Chennai",
      mode: "Hybrid",
      experience: "1-3",
      skills: ["React", "Redux", "TypeScript"],
      source: "LinkedIn",
      salaryRange: "6–10 LPA",
      applyUrl: "https://careers.freshworks.com/react-developer",
      description:
        "Build and maintain core modules of the Freshworks product suite.\n" +
        "Write clean, testable React code aligned with design patterns.\n" +
        "Optimize components for performance and accessibility.\n" +
        "Collaborate with product managers to refine user flows.",
    },
    {
      title: "Python Developer",
      company: "Zoho",
      location: "Chennai",
      mode: "Onsite",
      experience: "Fresher",
      skills: ["Python", "Django", "REST APIs"],
      source: "Naukri",
      salaryRange: "3–5 LPA",
      applyUrl: "https://careers.zoho.com/python-developer-fresher",
      description:
        "Contribute to backend services for Zoho's SaaS products.\n" +
        "Implement REST APIs and internal tools using Python and Django.\n" +
        "Participate in code reviews and unit test development.\n" +
        "Exposure to scalable multi-tenant architectures.",
    },
    {
      title: "Java Developer",
      company: "TCS",
      location: "Pune",
      mode: "Onsite",
      experience: "0-1",
      skills: ["Java", "Spring", "SQL"],
      source: "Naukri",
      salaryRange: "3–5 LPA",
      applyUrl: "https://careers.tcs.com/java-developer-fresher",
      description:
        "Join a client project team as a junior Java developer.\n" +
        "Assist in building and maintaining enterprise web applications.\n" +
        "Follow coding standards and documentation as per TCS guidelines.\n" +
        "Learn deployment practices on on-prem and cloud environments.",
    },
    {
      title: "SDE Intern",
      company: "CRED",
      location: "Bengaluru",
      mode: "Remote",
      experience: "Fresher",
      skills: ["Go", "Microservices", "Databases"],
      source: "LinkedIn",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://careers.cred.club/sde-intern",
      description:
        "Work with a small squad on user-facing features and experiments.\n" +
        "Write services with a strong focus on reliability and observability.\n" +
        "Pair-program with senior engineers and learn modern backend patterns.\n" +
        "Contribute to internal tooling and developer productivity.",
    },
    {
      title: "Data Analyst Intern",
      company: "PhonePe",
      location: "Bengaluru",
      mode: "Hybrid",
      experience: "Fresher",
      skills: ["SQL", "Power BI", "Python"],
      source: "Indeed",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://careers.phonepe.com/data-analyst-intern",
      description:
        "Support the analytics team in building dashboards for payments data.\n" +
        "Clean and transform datasets for reporting and experimentation.\n" +
        "Work closely with business stakeholders on ad-hoc analysis.\n" +
        "Develop a strong understanding of key product metrics.",
    },
    {
      title: "Graduate Engineer Trainee",
      company: "Capgemini",
      location: "Mumbai",
      mode: "Onsite",
      experience: "0-1",
      skills: ["Java", "SQL", "Problem Solving"],
      source: "Naukri",
      salaryRange: "3–5 LPA",
      applyUrl: "https://careers.capgemini.com/graduate-engineer-trainee",
      description:
        "Be part of a structured fresher program focused on enterprise projects.\n" +
        "Work under guidance to deliver small modules and enhancements.\n" +
        "Gain exposure to client communication and agile ceremonies.\n" +
        "Upskill through internal learning platforms and certifications.",
    },
    {
      title: "Junior Backend Developer",
      company: "Juspay",
      location: "Bengaluru",
      mode: "Remote",
      experience: "1-3",
      skills: ["Scala", "Functional Programming", "Distributed Systems"],
      source: "LinkedIn",
      salaryRange: "10–18 LPA",
      applyUrl: "https://juspay.in/careers/junior-backend",
      description:
        "Build high-availability payment systems used across major apps in India.\n" +
        "Work with functional programming paradigms in a performance-critical stack.\n" +
        "Participate in architectural discussions and incident reviews.\n" +
        "Emphasis on correctness, reliability, and observability.",
    },
    {
      title: "React Developer",
      company: "UrbanStack Labs",
      location: "Remote",
      mode: "Remote",
      experience: "1-3",
      skills: ["React", "Next.js", "CSS-in-JS"],
      source: "LinkedIn",
      salaryRange: "6–10 LPA",
      applyUrl: "https://jobs.urbanstacklabs.com/react-dev",
      description:
        "Join a product-focused startup building internal tools for enterprises.\n" +
        "Own end-to-end implementation of features from design to deployment.\n" +
        "Collaborate directly with founders and design partners.\n" +
        "Work in a fully remote, async-friendly environment.",
    },
    {
      title: "Data Analyst Intern",
      company: "InsightGrid Analytics",
      location: "Hyderabad",
      mode: "Remote",
      experience: "Fresher",
      skills: ["SQL", "Excel", "Visualization"],
      source: "Indeed",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://insightgrid.in/careers/data-analyst-intern",
      description:
        "Assist senior analysts on client reporting and dashboard creation.\n" +
        "Prepare datasets, validate data quality, and document assumptions.\n" +
        "Learn to translate business questions into analytical outputs.\n" +
        "Exposure to multiple industries and reporting tools.",
    },
    {
      title: "Java Developer",
      company: "Cognizant",
      location: "Chennai",
      mode: "Hybrid",
      experience: "1-3",
      skills: ["Java", "Spring Boot", "REST"],
      source: "Naukri",
      salaryRange: "6–10 LPA",
      applyUrl: "https://careers.cognizant.com/java-developer",
      description:
        "Build and maintain Java microservices for enterprise clients.\n" +
        "Participate in sprint planning, estimation, and demo sessions.\n" +
        "Ensure code quality through unit tests and code reviews.\n" +
        "Collaborate with DevOps teams on deployment pipelines.",
    },
    {
      title: "Python Developer",
      company: "CloudTailor Tech",
      location: "Pune",
      mode: "Hybrid",
      experience: "0-1",
      skills: ["Python", "Flask", "APIs"],
      source: "LinkedIn",
      salaryRange: "3–5 LPA",
      applyUrl: "https://cloudtailor.tech/careers/python-developer",
      description:
        "Work on internal automation tools and lightweight APIs.\n" +
        "Collaborate with senior developers to define technical tasks.\n" +
        "Write integration tests and basic monitoring scripts.\n" +
        "Opportunity to grow into a full-stack role over time.",
    },
    {
      title: "QA Intern",
      company: "Paytm",
      location: "Noida",
      mode: "Onsite",
      experience: "Fresher",
      skills: ["Testing", "Regression Suites", "JIRA"],
      source: "Indeed",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://paytm.com/careers/qa-intern",
      description:
        "Support the QA team in validating releases for consumer apps.\n" +
        "Execute regression suites and sanity checks before deployments.\n" +
        "Document issues clearly with screenshots and logs.\n" +
        "Learn mobile testing practices across Android and iOS.",
    },
    {
      title: "SDE Intern",
      company: "RupeeNest",
      location: "Bengaluru",
      mode: "Remote",
      experience: "Fresher",
      skills: ["JavaScript", "Node.js", "MongoDB"],
      source: "LinkedIn",
      salaryRange: "₹15k–₹40k/month Internship",
      applyUrl: "https://jobs.rupeenest.com/sde-intern",
      description:
        "Work with a small engineering team in a fintech startup.\n" +
        "Implement APIs and background jobs with guidance.\n" +
        "Contribute to internal dashboards used by operations.\n" +
        "Exposure to rapid iteration and production deployments.",
    },
    {
      title: "Graduate Engineer Trainee",
      company: "Dell Technologies",
      location: "Hyderabad",
      mode: "Hybrid",
      experience: "0-1",
      skills: ["C#", ".NET", "Databases"],
      source: "Naukri",
      salaryRange: "3–5 LPA",
      applyUrl: "https://jobs.dell.com/graduate-engineer-trainee",
      description:
        "Participate in a graduate program focused on enterprise software.\n" +
        "Shadow senior engineers and pick up tasks from the backlog.\n" +
        "Follow secure coding and documentation practices.\n" +
        "Opportunities to rotate across multiple product teams.",
    },
  ];

  const locations = ["Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai", "Remote"];
  const modes = ["Remote", "Hybrid", "Onsite"];
  const experiences = ["Fresher", "0-1", "1-3", "3-5"];
  const sources = ["LinkedIn", "Naukri", "Indeed"];

  const jobs = [];
  let idCounter = 1;

  for (let i = 0; i < 60; i++) {
    const template = base[i % base.length];
    const job = {
      id: idCounter++,
      title: template.title,
      company: template.company,
      location: locations[i % locations.length],
      mode: modes[i % modes.length],
      experience: experiences[i % experiences.length],
      skills: template.skills,
      source: sources[i % sources.length],
      postedDaysAgo: i % 11, // 0–10
      salaryRange: template.salaryRange,
      applyUrl: template.applyUrl,
      description: template.description,
    };
    jobs.push(job);
  }

  return jobs;
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const segments = pathname.split("/").filter(Boolean);
  const last = "/" + (segments[segments.length - 1] || "");
  if (ROUTES[last]) return last;
  return "/";
}

function getSavedJobIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setSavedJobIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage failures
  }
}

function isJobSaved(id) {
  const ids = getSavedJobIds();
  return ids.includes(id);
}

function toggleSaveJob(id) {
  const ids = getSavedJobIds();
  const index = ids.indexOf(id);
  if (index >= 0) {
    ids.splice(index, 1);
  } else {
    ids.push(id);
  }
  setSavedJobIds(ids);
  return ids;
}

function findJobById(id) {
  return JOBS.find((job) => job.id === id);
}

function formatDaysAgo(days) {
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function applyFilters(jobs, filters) {
  return jobs
    .filter((job) => {
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const text = `${job.title} ${job.company}`.toLowerCase();
        if (!text.includes(kw)) return false;
      }
      if (filters.location !== "all" && job.location !== filters.location) return false;
      if (filters.mode !== "all" && job.mode !== filters.mode) return false;
      if (filters.experience !== "all" && job.experience !== filters.experience) return false;
      if (filters.source !== "all" && job.source !== filters.source) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "oldest") {
        return a.postedDaysAgo - b.postedDaysAgo;
      }
      // latest by default
      return b.postedDaysAgo - a.postedDaysAgo;
    });
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
              placeholder="e.g. Bengaluru, Hyderabad, Remote"
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
              <option>Fresher</option>
              <option>0-1</option>
              <option>1-3</option>
              <option>3-5</option>
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

function renderFilters() {
  return `
    <form class="filters-form" aria-label="Job filters">
      <div class="filters-row">
        <div class="filters-field">
          <label class="field-label" for="filter-keyword">Search</label>
          <input
            id="filter-keyword"
            name="keyword"
            class="field-input"
            type="text"
            placeholder="Search by title or company"
          />
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-location">Location</label>
          <select id="filter-location" name="location" class="field-input">
            <option value="all">All</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-mode">Mode</label>
          <select id="filter-mode" name="mode" class="field-input">
            <option value="all">All</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-experience">Experience</label>
          <select id="filter-experience" name="experience" class="field-input">
            <option value="all">All</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
          </select>
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-source">Source</label>
          <select id="filter-source" name="source" class="field-input">
            <option value="all">All</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Naukri">Naukri</option>
            <option value="Indeed">Indeed</option>
          </select>
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-sort">Sort</label>
          <select id="filter-sort" name="sort" class="field-input">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </form>
  `;
}

function renderJobCard(job, saved) {
  const savedLabel = saved || isJobSaved(job.id) ? "Saved" : "Save";
  const savedClass = saved || isJobSaved(job.id) ? "btn--secondary job-card__save btn--saved" : "btn--secondary job-card__save";

  return `
    <article class="job-card" data-job-id="${job.id}">
      <header class="job-card__header">
        <div>
          <h2 class="job-card__title">${job.title}</h2>
          <p class="job-card__company">${job.company}</p>
        </div>
        <span class="badge job-card__source">${job.source}</span>
      </header>
      <div class="job-card__meta">
        <span>${job.location} · ${job.mode}</span>
        <span>${job.experience}</span>
        <span>${job.salaryRange}</span>
        <span>${formatDaysAgo(job.postedDaysAgo)}</span>
      </div>
      <footer class="job-card__footer">
        <button type="button" class="btn btn--secondary job-card__view" data-action="view">View</button>
        <button type="button" class="btn ${savedClass}" data-action="save">${savedLabel}</button>
        <button type="button" class="btn btn--primary job-card__apply" data-action="apply">Apply</button>
      </footer>
    </article>
  `;
}

function renderDashboard() {
  const jobs = applyFilters(JOBS, currentFilters);
  const cards = jobs.map((job) => renderJobCard(job, false)).join("");

  return `
    <header class="route-header">
      <h1 class="route-title">Dashboard</h1>
      <p class="route-subtitle">
        Browse current openings. Matching, scoring, and digests will be added in the next step.
      </p>
    </header>
    <section class="filters">
      ${renderFilters()}
    </section>
    <section class="jobs">
      ${
        cards ||
        `<div class="empty-state">
          <h2 class="route-title">No jobs yet.</h2>
          <p class="route-subtitle">In the next step, you will load a realistic dataset.</p>
        </div>`
      }
    </section>
  `;
}

function renderSaved() {
  const savedIds = getSavedJobIds();
  const savedJobs = JOBS.filter((job) => savedIds.includes(job.id));
  const cards = savedJobs.map((job) => renderJobCard(job, true)).join("");

  if (!savedJobs.length) {
    return `
      <section class="empty-state">
        <h1 class="route-title">Saved</h1>
        <p class="route-subtitle">
          You haven't saved any roles yet. When you mark roles as Saved, they will appear here for calm review.
        </p>
      </section>
    `;
  }

  return `
    <header class="route-header">
      <h1 class="route-title">Saved</h1>
      <p class="route-subtitle">
        A focused space for roles you want to revisit. Matching and reminders will be added later.
      </p>
    </header>
    <section class="jobs">
      ${cards}
    </section>
  `;
}

function renderDigest() {
  return `
    <section class="empty-state">
      <h1 class="route-title">Digest</h1>
      <p class="route-subtitle">
        Your daily digest will live here. In the next step, this page will summarise new and saved jobs delivered at 9AM.
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
  const routeKey = ROUTES[normalized];
  switch (routeKey) {
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

function openJobModal(job) {
  const modal = document.getElementById("job-modal");
  if (!modal || !job) return;

  modal.querySelector(".job-modal__title").textContent = job.title;
  modal.querySelector(".job-modal__company").textContent = `${job.company} · ${job.location} · ${job.mode}`;
  modal.querySelector(".job-modal__description").textContent = job.description;

  const skillsList = modal.querySelector(".job-modal__skills");
  skillsList.innerHTML = "";
  job.skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("job-modal--open");
}

function closeJobModal() {
  const modal = document.getElementById("job-modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("job-modal--open");
}

function handleJobListClick(event) {
  const card = event.target.closest(".job-card");
  if (!card) return;

  const id = Number(card.getAttribute("data-job-id"));
  const action = event.target.getAttribute("data-action");
  if (!action) return;

  if (action === "view") {
    const job = findJobById(id);
    openJobModal(job);
  } else if (action === "save") {
    const ids = toggleSaveJob(id);
    const saved = ids.includes(id);
    const btn = event.target;
    btn.textContent = saved ? "Saved" : "Save";
    btn.classList.toggle("btn--saved", saved);
  } else if (action === "apply") {
    const job = findJobById(id);
    if (job && job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener");
    }
  }
}

function readFiltersFromForm(form) {
  if (!form) return;
  const formData = new FormData(form);
  currentFilters.keyword = (formData.get("keyword") || "").toString().trim();
  currentFilters.location = (formData.get("location") || "all").toString();
  currentFilters.mode = (formData.get("mode") || "all").toString();
  currentFilters.experience = (formData.get("experience") || "all").toString();
  currentFilters.source = (formData.get("source") || "all").toString();
  currentFilters.sort = (formData.get("sort") || "latest").toString();
}

function handleFiltersChange(event) {
  const form = event.currentTarget;
  readFiltersFromForm(form);
  const container = document.querySelector(".jobs");
  if (!container) return;

  const jobs = applyFilters(JOBS, currentFilters);
  const cards = jobs.map((job) => renderJobCard(job, false)).join("");

  container.innerHTML =
    cards ||
    `<div class="empty-state">
      <h2 class="route-title">No jobs yet.</h2>
      <p class="route-subtitle">Try adjusting your filters or clearing the search.</p>
    </div>`;
}

function handleNavClick(event) {
  const link = event.target.closest(".main-nav__link, .js-route-link");
  if (!link) return;

  event.preventDefault();
  const route = link.getAttribute("data-route") || "/";
  const currentPath = normalizePath(window.location.pathname);
  if (route !== currentPath) {
    if (window.location.protocol !== "file:" && window.history && window.history.pushState) {
      try {
        window.history.pushState({ route }, "", route);
      } catch {
        // ignore
      }
    }
  }
  setActiveRoute(route);

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

  document.addEventListener("click", handleGlobalRouteClick);

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-action]")) {
      handleJobListClick(event);
    }
    if (event.target.classList.contains("job-modal__close") || event.target.classList.contains("job-modal__backdrop")) {
      closeJobModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeJobModal();
    }
  });

  document.addEventListener("change", (event) => {
    const form = event.target.closest(".filters-form");
    if (form) {
      handleFiltersChange({ currentTarget: form });
    }
  });

  document.addEventListener("input", (event) => {
    const form = event.target.closest(".filters-form");
    if (form && event.target.name === "keyword") {
      handleFiltersChange({ currentTarget: form });
    }
  });

  window.addEventListener("popstate", () => {
    setActiveRoute(window.location.pathname);
  });

  setActiveRoute(window.location.pathname);
}

document.addEventListener("DOMContentLoaded", initNavigation);

