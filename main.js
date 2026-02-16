const ROUTES = {
  "/": "landing",
  "/dashboard": "dashboard",
  "/saved": "saved",
  "/digest": "digest",
  "/settings": "settings",
  "/proof": "proof",
  "/jt/07-test": "test",
  "/jt/08-ship": "ship",
};

const STORAGE_KEY = "jobNotificationTracker:savedJobs";
const PREFERENCES_KEY = "jobTrackerPreferences";
const DIGEST_KEY_PREFIX = "jobTrackerDigest_";
const STATUS_KEY = "jobTrackerStatus";
const STATUS_HISTORY_KEY = "jobTrackerStatusHistory";
const TEST_CHECKLIST_KEY = "jobTrackerTestChecklist";

let currentFilters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
  onlyMatches: false,
  status: "all",
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

function getJobStatus(jobId) {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (!raw) return "Not Applied";
    const statuses = JSON.parse(raw);
    return statuses[jobId] || "Not Applied";
  } catch {
    return "Not Applied";
  }
}

function getAllJobStatuses() {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setJobStatus(jobId, status) {
  try {
    const statuses = getAllJobStatuses();
    statuses[jobId] = status;
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
    
    addStatusHistory(jobId, status);
  } catch {
    // ignore
  }
}

function getStatusHistory() {
  try {
    const raw = localStorage.getItem(STATUS_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function addStatusHistory(jobId, status) {
  try {
    const history = getStatusHistory();
    const job = findJobById(jobId);
    if (!job) return;
    
    const entry = {
      jobId,
      jobTitle: job.title,
      company: job.company,
      status,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    
    history.unshift(entry);
    
    const maxHistory = 50;
    if (history.length > maxHistory) {
      history.splice(maxHistory);
    }
    
    localStorage.setItem(STATUS_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

function getRecentStatusUpdates(limit = 10) {
  const history = getStatusHistory();
  return history.slice(0, limit);
}

const TEST_ITEMS = [
  {
    id: "preferences-persist",
    label: "Preferences persist after refresh",
    howToTest: "Set preferences in Settings, refresh page, verify they're still there",
  },
  {
    id: "match-score",
    label: "Match score calculates correctly",
    howToTest: "Set preferences, check Dashboard jobs have correct match percentages",
  },
  {
    id: "show-matches-toggle",
    label: '"Show only matches" toggle works',
    howToTest: "Enable toggle on Dashboard, verify only jobs above threshold show",
  },
  {
    id: "save-job-persist",
    label: "Save job persists after refresh",
    howToTest: "Save a job, refresh page, verify it's still saved",
  },
  {
    id: "apply-new-tab",
    label: "Apply opens in new tab",
    howToTest: "Click Apply button, verify job URL opens in new tab",
  },
  {
    id: "status-persist",
    label: "Status update persists after refresh",
    howToTest: "Change job status, refresh page, verify status is maintained",
  },
  {
    id: "status-filter",
    label: "Status filter works correctly",
    howToTest: "Set status filter to 'Applied', verify only Applied jobs show",
  },
  {
    id: "digest-top-10",
    label: "Digest generates top 10 by score",
    howToTest: "Generate digest, verify 10 jobs sorted by match score descending",
  },
  {
    id: "digest-persist",
    label: "Digest persists for the day",
    howToTest: "Generate digest, refresh page, verify same digest loads",
  },
  {
    id: "no-console-errors",
    label: "No console errors on main pages",
    howToTest: "Open DevTools Console, navigate all pages, verify no errors",
  },
];

function getTestChecklist() {
  try {
    const raw = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveTestChecklist(checklist) {
  try {
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist));
  } catch {
    // ignore
  }
}

function toggleTestItem(itemId) {
  const checklist = getTestChecklist();
  checklist[itemId] = !checklist[itemId];
  saveTestChecklist(checklist);
  return checklist;
}

function resetTestChecklist() {
  try {
    localStorage.removeItem(TEST_CHECKLIST_KEY);
  } catch {
    // ignore
  }
}

function getTestProgress() {
  const checklist = getTestChecklist();
  const total = TEST_ITEMS.length;
  const passed = TEST_ITEMS.filter((item) => checklist[item.id]).length;
  return { passed, total, allPassed: passed === total };
}

function isShipUnlocked() {
  const progress = getTestProgress();
  return progress.allPassed;
}

function formatDaysAgo(days) {
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTodayDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return now.toLocaleDateString("en-US", options);
}

function getDigestKey() {
  return DIGEST_KEY_PREFIX + getTodayDateKey();
}

function getDigest() {
  try {
    const key = getDigestKey();
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveDigest(digest) {
  try {
    const key = getDigestKey();
    localStorage.setItem(key, JSON.stringify(digest));
  } catch {
    // ignore
  }
}

function generateDigest() {
  const prefs = getPreferences();
  const filters = {
    keyword: "",
    location: "all",
    mode: "all",
    experience: "all",
    source: "all",
    sort: "match",
    onlyMatches: false,
  };

  const scoredJobs = applyFilters(JOBS, filters, prefs);

  const topJobs = scoredJobs
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.postedDaysAgo - b.postedDaysAgo;
    })
    .slice(0, 10);

  const digest = {
    date: getTodayDateKey(),
    dateFormatted: formatTodayDate(),
    jobs: topJobs,
    generatedAt: new Date().toISOString(),
  };

  saveDigest(digest);
  return digest;
}

function parseCommaList(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPreferences() {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) {
      return {
        roleKeywords: [],
        preferredLocations: [],
        preferredModes: [],
        experienceLevel: "",
        skills: [],
        minMatchScore: 40,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      roleKeywords: Array.isArray(parsed.roleKeywords) ? parsed.roleKeywords : [],
      preferredLocations: Array.isArray(parsed.preferredLocations) ? parsed.preferredLocations : [],
      preferredModes: Array.isArray(parsed.preferredModes) ? parsed.preferredModes : [],
      experienceLevel: typeof parsed.experienceLevel === "string" ? parsed.experienceLevel : "",
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      minMatchScore:
        typeof parsed.minMatchScore === "number" && !Number.isNaN(parsed.minMatchScore)
          ? parsed.minMatchScore
          : 40,
    };
  } catch {
    return {
      roleKeywords: [],
      preferredLocations: [],
      preferredModes: [],
      experienceLevel: "",
      skills: [],
      minMatchScore: 40,
    };
  }
}

function savePreferences(prefs) {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

function hasActivePreferences(prefs) {
  if (!prefs) return false;
  return (
    (prefs.roleKeywords && prefs.roleKeywords.length > 0) ||
    (prefs.preferredLocations && prefs.preferredLocations.length > 0) ||
    (prefs.preferredModes && prefs.preferredModes.length > 0) ||
    (prefs.skills && prefs.skills.length > 0) ||
    (prefs.experienceLevel && prefs.experienceLevel !== "")
  );
}

function computeMatchScore(job, prefs) {
  if (!prefs) return 0;

  let score = 0;
  const title = job.title.toLowerCase();
  const description = job.description.toLowerCase();
  const keywords = (prefs.roleKeywords || []).map((k) => k.toLowerCase());

  if (keywords.length) {
    const titleMatch = keywords.some((kw) => title.includes(kw));
    if (titleMatch) {
      score += 25;
    }

    const descMatch = keywords.some((kw) => description.includes(kw));
    if (descMatch) {
      score += 15;
    }
  }

  if (prefs.preferredLocations && prefs.preferredLocations.length) {
    if (prefs.preferredLocations.includes(job.location)) {
      score += 15;
    }
  }

  if (prefs.preferredModes && prefs.preferredModes.length) {
    if (prefs.preferredModes.includes(job.mode)) {
      score += 10;
    }
  }

  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  if (prefs.skills && prefs.skills.length) {
    const jobSkillsLower = (job.skills || []).map((s) => s.toLowerCase());
    const userSkillsLower = prefs.skills.map((s) => s.toLowerCase());
    const overlap = userSkillsLower.some((skill) => jobSkillsLower.includes(skill));
    if (overlap) {
      score += 15;
    }
  }

  if (typeof job.postedDaysAgo === "number" && job.postedDaysAgo <= 2) {
    score += 5;
  }

  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}

function parseSalaryMin(value) {
  if (!value) return 0;
  const cleaned = value.replace(/[,₹\s]/g, "");
  const match = cleaned.match(/(\d+)(k)?/i);
  if (!match) return 0;
  let num = Number(match[1]);
  if (match[2]) {
    num *= 1000;
  }
  return num;
}

function applyFilters(jobs, filters, prefs) {
  const scoredJobs = jobs.map((job) => {
    const matchScore = computeMatchScore(job, prefs);
    const status = getJobStatus(job.id);
    return { ...job, matchScore, status };
  });

  const threshold = prefs && typeof prefs.minMatchScore === "number" ? prefs.minMatchScore : 40;

  return scoredJobs
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
      if (filters.status !== "all" && job.status !== filters.status) return false;
      if (filters.onlyMatches && job.matchScore < threshold) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "oldest") {
        return b.postedDaysAgo - a.postedDaysAgo;
      }
      if (filters.sort === "match") {
        return (b.matchScore || 0) - (a.matchScore || 0);
      }
      if (filters.sort === "salary") {
        return parseSalaryMin(b.salaryRange) - parseSalaryMin(a.salaryRange);
      }
      // latest by default (most recent first)
      return a.postedDaysAgo - b.postedDaysAgo;
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
        Define how Job Notification Tracker should understand your preferences. Matching is deterministic and transparent.
      </p>
    </header>
    <section class="settings">
      <form class="settings-form" aria-label="Job notification preferences" id="preferences-form">
        <div class="settings-grid">
          <div class="field-group">
            <label for="role-keywords" class="field-label">Role keywords</label>
            <input
              id="role-keywords"
              name="roleKeywords"
              class="field-input"
              type="text"
              placeholder="e.g. SDE Intern, React Developer"
            />
          </div>
          <div class="field-group">
            <label for="preferred-locations" class="field-label">Preferred locations</label>
            <select
              id="preferred-locations"
              name="preferredLocations"
              class="field-input"
              multiple
              size="4"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div class="field-group">
            <span class="field-label">Preferred mode</span>
            <div class="settings-modes">
              <label class="checkbox-inline">
                <input type="checkbox" name="preferredMode" value="Remote" />
                <span>Remote</span>
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" name="preferredMode" value="Hybrid" />
                <span>Hybrid</span>
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" name="preferredMode" value="Onsite" />
                <span>Onsite</span>
              </label>
            </div>
          </div>
          <div class="field-group">
            <label for="experience-level" class="field-label">Experience level</label>
            <select id="experience-level" name="experienceLevel" class="field-input">
              <option value="">Any</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1">0-1</option>
              <option value="1-3">1-3</option>
              <option value="3-5">3-5</option>
            </select>
          </div>
          <div class="field-group">
            <label for="skills-input" class="field-label">Skills</label>
            <input
              id="skills-input"
              name="skills"
              class="field-input"
              type="text"
              placeholder="e.g. Java, React, SQL"
            />
          </div>
          <div class="field-group">
            <label for="min-match-score" class="field-label">
              Minimum match score
              <span id="min-match-score-value" class="settings-range-value">40%</span>
            </label>
            <input
              id="min-match-score"
              name="minMatchScore"
              class="field-input"
              type="range"
              min="0"
              max="100"
              step="5"
              value="40"
            />
          </div>
        </div>
        <p class="field-helper">
          Preferences drive a deterministic match score per role. You can adjust the threshold at any time.
        </p>
        <button type="submit" class="btn btn--primary">
          Save preferences
        </button>
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
          <label class="field-label" for="filter-status">Status</label>
          <select id="filter-status" name="status" class="field-input">
            <option value="all">All</option>
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>
        <div class="filters-field">
          <label class="field-label" for="filter-sort">Sort</label>
          <select id="filter-sort" name="sort" class="field-input">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="match">Match score</option>
            <option value="salary">Salary</option>
          </select>
        </div>
      </div>
      <div class="filters-row filters-row--secondary">
        <div class="filters-field filters-field--toggle">
          <label class="checkbox-inline">
            <input type="checkbox" id="filter-only-matches" name="onlyMatches" />
            <span>Show only jobs above my threshold</span>
          </label>
        </div>
      </div>
    </form>
  `;
}

function renderJobCard(job, saved) {
  const savedLabel = saved || isJobSaved(job.id) ? "Saved" : "Save";
  const savedClass =
    saved || isJobSaved(job.id) ? "btn--secondary job-card__save btn--saved" : "btn--secondary job-card__save";

  const score = typeof job.matchScore === "number" ? job.matchScore : 0;
  let scoreClass = "job-card__match--low";
  if (score >= 80) {
    scoreClass = "job-card__match--high";
  } else if (score >= 60) {
    scoreClass = "job-card__match--medium";
  } else if (score >= 40) {
    scoreClass = "job-card__match--base";
  }

  const status = job.status || getJobStatus(job.id);
  let statusClass = "job-card__status--neutral";
  if (status === "Applied") {
    statusClass = "job-card__status--applied";
  } else if (status === "Rejected") {
    statusClass = "job-card__status--rejected";
  } else if (status === "Selected") {
    statusClass = "job-card__status--selected";
  }

  return `
    <article class="job-card" data-job-id="${job.id}">
      <header class="job-card__header">
        <div>
          <h2 class="job-card__title">${job.title}</h2>
          <p class="job-card__company">${job.company}</p>
        </div>
        <div class="job-card__header-right">
          <span class="badge job-card__source">${job.source}</span>
          <span class="job-card__match ${scoreClass}">${score}% match</span>
        </div>
      </header>
      <div class="job-card__meta">
        <span>${job.location} · ${job.mode}</span>
        <span>${job.experience}</span>
        <span>${job.salaryRange}</span>
        <span>${formatDaysAgo(job.postedDaysAgo)}</span>
      </div>
      <div class="job-card__status-section">
        <span class="job-card__status-label">Status:</span>
        <div class="job-card__status-group">
          <button type="button" class="job-card__status-btn ${status === "Not Applied" ? "active" : ""} ${statusClass}" data-action="status" data-status="Not Applied">
            Not Applied
          </button>
          <button type="button" class="job-card__status-btn ${status === "Applied" ? "active" : ""} job-card__status--applied" data-action="status" data-status="Applied">
            Applied
          </button>
          <button type="button" class="job-card__status-btn ${status === "Rejected" ? "active" : ""} job-card__status--rejected" data-action="status" data-status="Rejected">
            Rejected
          </button>
          <button type="button" class="job-card__status-btn ${status === "Selected" ? "active" : ""} job-card__status--selected" data-action="status" data-status="Selected">
            Selected
          </button>
        </div>
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
  const prefs = getPreferences();
  const jobs = applyFilters(JOBS, currentFilters, prefs);
  const hasPrefs = hasActivePreferences(prefs);
  const cards = jobs.map((job) => renderJobCard(job, false)).join("");

  return `
    <header class="route-header">
      <h1 class="route-title">Dashboard</h1>
      <p class="route-subtitle">
        Browse current openings. Matching and scoring are deterministic and derived from your settings.
      </p>
    </header>
    ${
      hasPrefs
        ? ""
        : `<div class="dashboard-banner">
            <p class="dashboard-banner__text">
              Set your preferences to activate intelligent matching.
            </p>
          </div>`
    }
    <section class="filters">
      ${renderFilters()}
    </section>
    <section class="jobs">
      ${
        cards
          ? cards
          : `<div class="empty-state">
              <h2 class="route-title">No roles match your criteria.</h2>
              <p class="route-subtitle">Adjust filters or lower threshold.</p>
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
  const prefs = getPreferences();
  const hasPrefs = hasActivePreferences(prefs);

  if (!hasPrefs) {
    return `
      <section class="empty-state">
        <h1 class="route-title">Digest</h1>
        <p class="route-subtitle">
          Set preferences to generate a personalized digest.
        </p>
        <div class="route-actions">
          <button type="button" class="btn btn--primary js-route-link" data-route="/settings">
            Go to Settings
          </button>
        </div>
      </section>
    `;
  }

  const existingDigest = getDigest();

  if (!existingDigest) {
    return `
      <header class="route-header">
        <h1 class="route-title">Daily Digest</h1>
        <p class="route-subtitle">
          Generate your personalized 9AM job digest based on your preferences.
        </p>
      </header>
      <section class="digest-generator">
        <button type="button" class="btn btn--primary btn--full" id="generate-digest-btn">
          Generate Today's 9AM Digest (Simulated)
        </button>
        <p class="digest-note">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>
      </section>
    `;
  }

  const jobs = existingDigest.jobs || [];

  if (jobs.length === 0) {
    return `
      <header class="route-header">
        <h1 class="route-title">Daily Digest</h1>
        <p class="route-subtitle">${existingDigest.dateFormatted}</p>
      </header>
      <section class="empty-state">
        <h2 class="route-title">No matching roles today.</h2>
        <p class="route-subtitle">Check again tomorrow.</p>
      </section>
      <div class="digest-actions">
        <button type="button" class="btn btn--secondary" id="regenerate-digest-btn">
          Regenerate Digest
        </button>
      </div>
    `;
  }

  const jobCards = jobs
    .map(
      (job, index) => `
    <article class="digest-job">
      <div class="digest-job__header">
        <div class="digest-job__number">${index + 1}</div>
        <div class="digest-job__info">
          <h3 class="digest-job__title">${job.title}</h3>
          <p class="digest-job__company">${job.company}</p>
        </div>
        <div class="digest-job__match">
          <span class="digest-job__score">${job.matchScore}%</span>
          <span class="digest-job__label">match</span>
        </div>
      </div>
      <div class="digest-job__meta">
        <span>${job.location}</span>
        <span>${job.mode}</span>
        <span>${job.experience}</span>
        <span>${formatDaysAgo(job.postedDaysAgo)}</span>
      </div>
      <div class="digest-job__footer">
        <button type="button" class="btn btn--primary btn--compact" data-action="apply" data-job-id="${job.id}">
          Apply Now
        </button>
      </div>
    </article>
  `
    )
    .join("");

  const recentUpdates = getRecentStatusUpdates(10);
  const statusUpdatesSection = recentUpdates.length > 0 ? `
    <section class="status-updates">
      <h2 class="status-updates__title">Recent Status Updates</h2>
      <div class="status-updates__list">
        ${recentUpdates.map(update => {
          let statusClass = "status-updates__status--neutral";
          if (update.status === "Applied") statusClass = "status-updates__status--applied";
          else if (update.status === "Rejected") statusClass = "status-updates__status--rejected";
          else if (update.status === "Selected") statusClass = "status-updates__status--selected";
          
          return `
            <div class="status-updates__item">
              <div class="status-updates__info">
                <p class="status-updates__job">${update.jobTitle}</p>
                <p class="status-updates__company">${update.company}</p>
              </div>
              <div class="status-updates__meta">
                <span class="status-updates__status ${statusClass}">${update.status}</span>
                <span class="status-updates__date">${update.dateFormatted}</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  ` : "";

  return `
    <div class="digest-container">
      <header class="digest-header">
        <h1 class="digest-title">Top 10 Jobs For You — 9AM Digest</h1>
        <p class="digest-date">${existingDigest.dateFormatted}</p>
      </header>
      
      <section class="digest-jobs">
        ${jobCards}
      </section>
      
      <footer class="digest-footer">
        <p class="digest-footer__text">
          This digest was generated based on your preferences.
        </p>
      </footer>
      
      ${statusUpdatesSection}
      
      <div class="digest-actions">
        <button type="button" class="btn btn--secondary" id="copy-digest-btn">
          Copy Digest to Clipboard
        </button>
        <button type="button" class="btn btn--secondary" id="email-digest-btn">
          Create Email Draft
        </button>
        <button type="button" class="btn btn--secondary" id="regenerate-digest-btn">
          Regenerate Digest
        </button>
      </div>
      
      <p class="digest-note">
        Demo Mode: Daily 9AM trigger simulated manually.
      </p>
    </div>
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

function renderTest() {
  const checklist = getTestChecklist();
  const progress = getTestProgress();

  const checklistItems = TEST_ITEMS.map((item) => {
    const checked = checklist[item.id] || false;
    return `
      <div class="test-item">
        <label class="test-item__checkbox">
          <input 
            type="checkbox" 
            data-test-id="${item.id}"
            ${checked ? "checked" : ""}
          />
          <span class="test-item__label">${item.label}</span>
        </label>
        <button 
          type="button" 
          class="test-item__tooltip-btn" 
          data-tooltip="${item.howToTest}"
          aria-label="How to test"
        >
          ?
        </button>
      </div>
    `;
  }).join("");

  const warningSection = progress.allPassed
    ? ""
    : `
      <div class="test-warning">
        <p class="test-warning__text">
          Resolve all issues before shipping.
        </p>
      </div>
    `;

  return `
    <header class="route-header">
      <h1 class="route-title">Test Checklist</h1>
      <p class="route-subtitle">
        Verify all features work correctly before shipping.
      </p>
    </header>

    <section class="test-checklist">
      <div class="test-summary">
        <h2 class="test-summary__title">Tests Passed: ${progress.passed} / ${progress.total}</h2>
        ${warningSection}
      </div>

      <div class="test-items">
        ${checklistItems}
      </div>

      <div class="test-actions">
        <button type="button" class="btn btn--secondary" id="reset-test-btn">
          Reset Test Status
        </button>
        <button 
          type="button" 
          class="btn btn--primary js-route-link" 
          data-route="/jt/08-ship"
          ${progress.allPassed ? "" : "disabled"}
        >
          ${progress.allPassed ? "Proceed to Ship →" : "Complete Tests to Unlock"}
        </button>
      </div>
    </section>
  `;
}

function renderShip() {
  const progress = getTestProgress();

  if (!progress.allPassed) {
    return `
      <section class="empty-state">
        <h1 class="route-title">🔒 Ship Locked</h1>
        <p class="route-subtitle">
          Complete all test checklist items to unlock shipping.
        </p>
        <div class="route-actions">
          <button type="button" class="btn btn--primary js-route-link" data-route="/jt/07-test">
            Go to Test Checklist
          </button>
        </div>
      </section>
    `;
  }

  return `
    <section class="ship-unlocked">
      <h1 class="route-title">✅ Ready to Ship</h1>
      <p class="route-subtitle">
        All tests passed! Your Job Notification Tracker is production-ready.
      </p>
      
      <div class="ship-summary">
        <h2 class="ship-summary__title">What's Been Built</h2>
        <ul class="ship-summary__list">
          <li>✅ Preference management with localStorage persistence</li>
          <li>✅ Deterministic match scoring (0-100 scale)</li>
          <li>✅ Color-coded match badges and filtering</li>
          <li>✅ Job saving and status tracking</li>
          <li>✅ Daily digest generation with email export</li>
          <li>✅ Status history and notifications</li>
          <li>✅ Comprehensive filter system with AND logic</li>
          <li>✅ Responsive premium design</li>
        </ul>
      </div>

      <div class="ship-actions">
        <button type="button" class="btn btn--secondary js-route-link" data-route="/jt/07-test">
          ← Back to Tests
        </button>
        <button type="button" class="btn btn--primary" id="ship-confirm-btn">
          Mark as Shipped 🚀
        </button>
      </div>
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
    case "test":
      html = renderTest();
      break;
    case "ship":
      html = renderShip();
      break;
    case "landing":
    default:
      html = renderLanding();
      break;
  }

  container.innerHTML = html;

  if (routeKey === "settings") {
    initSettingsForm();
  } else if (routeKey === "dashboard") {
    initDashboardRoute();
  } else if (routeKey === "digest") {
    initDigestRoute();
  } else if (routeKey === "test") {
    initTestRoute();
  } else if (routeKey === "ship") {
    initShipRoute();
  }
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

function showToast(message) {
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast--show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
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
  } else if (action === "status") {
    const newStatus = event.target.getAttribute("data-status");
    if (newStatus) {
      setJobStatus(id, newStatus);
      
      const statusButtons = card.querySelectorAll('.job-card__status-btn');
      statusButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-status') === newStatus) {
          btn.classList.add('active');
        }
      });
      
      showToast(`Status updated: ${newStatus}`);
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
  currentFilters.status = (formData.get("status") || "all").toString();
  currentFilters.sort = (formData.get("sort") || "latest").toString();
  currentFilters.onlyMatches = formData.get("onlyMatches") === "on";
}

function handleFiltersChange(event) {
  const form = event.currentTarget;
  readFiltersFromForm(form);
  const container = document.querySelector(".jobs");
  if (!container) return;

  const prefs = getPreferences();
  const jobs = applyFilters(JOBS, currentFilters, prefs);
  const cards = jobs.map((job) => renderJobCard(job, false)).join("");

  container.innerHTML =
    cards
      ? cards
      : `<div class="empty-state">
          <h2 class="route-title">No roles match your criteria.</h2>
          <p class="route-subtitle">Adjust filters or lower threshold.</p>
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

function initSettingsForm() {
  const form = document.getElementById("preferences-form");
  if (!form) return;

  const prefs = getPreferences();

  const roleInput = form.querySelector("#role-keywords");
  const skillsInput = form.querySelector("#skills-input");
  const locationsSelect = form.querySelector("#preferred-locations");
  const experienceSelect = form.querySelector("#experience-level");
  const minMatchInput = form.querySelector("#min-match-score");
  const minMatchValue = form.querySelector("#min-match-score-value");

  if (roleInput) {
    roleInput.value = (prefs.roleKeywords || []).join(", ");
  }
  if (skillsInput) {
    skillsInput.value = (prefs.skills || []).join(", ");
  }
  if (locationsSelect && prefs.preferredLocations) {
    Array.from(locationsSelect.options).forEach((opt) => {
      opt.selected = prefs.preferredLocations.includes(opt.value);
    });
  }
  if (experienceSelect) {
    experienceSelect.value = prefs.experienceLevel || "";
  }
  const modes = form.querySelectorAll('input[name="preferredMode"]');
  modes.forEach((input) => {
    input.checked = prefs.preferredModes.includes(input.value);
  });
  if (minMatchInput) {
    const val = prefs.minMatchScore || 40;
    minMatchInput.value = String(val);
    if (minMatchValue) {
      minMatchValue.textContent = `${val}%`;
    }
  }

  if (minMatchInput && minMatchValue) {
    minMatchInput.addEventListener("input", () => {
      const v = Number(minMatchInput.value || 40);
      minMatchValue.textContent = `${v}%`;
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const roleKeywords = parseCommaList((formData.get("roleKeywords") || "").toString());
    const skills = parseCommaList((formData.get("skills") || "").toString());

    const preferredLocations = locationsSelect
      ? Array.from(locationsSelect.selectedOptions).map((opt) => opt.value)
      : [];

    const preferredModes = Array.from(form.querySelectorAll('input[name="preferredMode"]:checked')).map(
      (input) => input.value
    );

    const experienceLevel = (formData.get("experienceLevel") || "").toString();
    const minMatchScoreRaw = Number(formData.get("minMatchScore") || 40);
    const minMatchScore =
      Number.isFinite(minMatchScoreRaw) && minMatchScoreRaw >= 0 && minMatchScoreRaw <= 100
        ? minMatchScoreRaw
        : 40;

    const nextPrefs = {
      roleKeywords,
      preferredLocations,
      preferredModes,
      experienceLevel,
      skills,
      minMatchScore,
    };

    savePreferences(nextPrefs);
  });
}

function initDashboardRoute() {
  const form = document.querySelector(".filters-form");
  if (!form) return;

  const keywordInput = form.querySelector("#filter-keyword");
  const locationSelect = form.querySelector("#filter-location");
  const modeSelect = form.querySelector("#filter-mode");
  const experienceSelect = form.querySelector("#filter-experience");
  const sourceSelect = form.querySelector("#filter-source");
  const statusSelect = form.querySelector("#filter-status");
  const sortSelect = form.querySelector("#filter-sort");
  const onlyMatchesCheckbox = form.querySelector("#filter-only-matches");

  if (keywordInput) keywordInput.value = currentFilters.keyword;
  if (locationSelect) locationSelect.value = currentFilters.location;
  if (modeSelect) modeSelect.value = currentFilters.mode;
  if (experienceSelect) experienceSelect.value = currentFilters.experience;
  if (sourceSelect) sourceSelect.value = currentFilters.source;
  if (statusSelect) statusSelect.value = currentFilters.status;
  if (sortSelect) sortSelect.value = currentFilters.sort;
  if (onlyMatchesCheckbox) onlyMatchesCheckbox.checked = currentFilters.onlyMatches;
}

function initDigestRoute() {
  const generateBtn = document.getElementById("generate-digest-btn");
  const regenerateBtn = document.getElementById("regenerate-digest-btn");
  const copyBtn = document.getElementById("copy-digest-btn");
  const emailBtn = document.getElementById("email-digest-btn");

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      generateDigest();
      renderRoute(window.location.pathname);
    });
  }

  if (regenerateBtn) {
    regenerateBtn.addEventListener("click", () => {
      generateDigest();
      renderRoute(window.location.pathname);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const digest = getDigest();
      if (!digest) return;

      let text = `Top 10 Jobs For You — 9AM Digest\n`;
      text += `${digest.dateFormatted}\n\n`;

      digest.jobs.forEach((job, index) => {
        text += `${index + 1}. ${job.title}\n`;
        text += `   Company: ${job.company}\n`;
        text += `   Location: ${job.location} | Mode: ${job.mode}\n`;
        text += `   Experience: ${job.experience}\n`;
        text += `   Match Score: ${job.matchScore}%\n`;
        text += `   Apply: ${job.applyUrl}\n\n`;
      });

      text += `This digest was generated based on your preferences.\n`;

      navigator.clipboard
        .writeText(text)
        .then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy Digest to Clipboard";
          }, 2000);
        })
        .catch(() => {
          alert("Failed to copy to clipboard");
        });
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const digest = getDigest();
      if (!digest) return;

      const subject = encodeURIComponent("My 9AM Job Digest");
      let body = `Top 10 Jobs For You — 9AM Digest\n`;
      body += `${digest.dateFormatted}\n\n`;

      digest.jobs.forEach((job, index) => {
        body += `${index + 1}. ${job.title}\n`;
        body += `   Company: ${job.company}\n`;
        body += `   Location: ${job.location} | Mode: ${job.mode}\n`;
        body += `   Experience: ${job.experience}\n`;
        body += `   Match Score: ${job.matchScore}%\n`;
        body += `   Apply: ${job.applyUrl}\n\n`;
      });

      body += `This digest was generated based on your preferences.\n`;

      const mailtoLink = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    });
  }

  const applyButtons = document.querySelectorAll('.digest-job__footer button[data-action="apply"]');
  applyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobId = Number(btn.getAttribute("data-job-id"));
      const job = findJobById(jobId);
      if (job && job.applyUrl) {
        window.open(job.applyUrl, "_blank", "noopener");
      }
    });
  });
}

function initTestRoute() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-test-id]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const testId = e.target.getAttribute("data-test-id");
      toggleTestItem(testId);
      renderRoute(window.location.pathname);
    });
  });

  const resetBtn = document.getElementById("reset-test-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all test status? This will uncheck all items.")) {
        resetTestChecklist();
        renderRoute(window.location.pathname);
      }
    });
  }

  const tooltipBtns = document.querySelectorAll(".test-item__tooltip-btn");
  tooltipBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tooltip = e.target.getAttribute("data-tooltip");
      alert(tooltip);
    });
  });
}

function initShipRoute() {
  const shipBtn = document.getElementById("ship-confirm-btn");
  if (shipBtn) {
    shipBtn.addEventListener("click", () => {
      showToast("🚀 Marked as shipped! Great work!");
    });
  }
}

document.addEventListener("DOMContentLoaded", initNavigation);

