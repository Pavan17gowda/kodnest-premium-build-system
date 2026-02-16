# Test Example - Match Score Calculation

## Example Preference Configuration

```javascript
{
  roleKeywords: ["React", "Developer", "Frontend"],
  preferredLocations: ["Bengaluru", "Remote"],
  preferredModes: ["Remote", "Hybrid"],
  experienceLevel: "1-3",
  skills: ["React", "TypeScript", "JavaScript"],
  minMatchScore: 40
}
```

## Sample Job Analysis

### Job 1: React Developer at UrbanStack Labs

**Job Details:**
```javascript
{
  title: "React Developer",
  company: "UrbanStack Labs",
  location: "Remote",
  mode: "Remote",
  experience: "1-3",
  skills: ["React", "Next.js", "CSS-in-JS"],
  source: "LinkedIn",
  postedDaysAgo: 1
}
```

**Score Breakdown:**
- Title contains "React" → +25 ✅
- Title contains "Developer" → Already counted in title match
- Description contains "React" → +15 ✅
- Location "Remote" matches preferred → +15 ✅
- Mode "Remote" matches preferred → +10 ✅
- Experience "1-3" matches → +10 ✅
- Skills overlap (React) → +15 ✅
- Posted 1 day ago (≤2) → +5 ✅
- Source is LinkedIn → +5 ✅

**Total Score: 100** (capped) → **GREEN BADGE** 🟢

---

### Job 2: Frontend Intern at Flipkart

**Job Details:**
```javascript
{
  title: "Frontend Intern",
  company: "Flipkart",
  location: "Bengaluru",
  mode: "Hybrid",
  experience: "Fresher",
  skills: ["JavaScript", "React", "TypeScript"],
  source: "LinkedIn",
  postedDaysAgo: 0
}
```

**Score Breakdown:**
- Title contains "Frontend" → +25 ✅
- Description contains "React" → +15 ✅
- Location "Bengaluru" matches preferred → +15 ✅
- Mode "Hybrid" matches preferred → +10 ✅
- Experience "Fresher" ≠ "1-3" → +0 ❌
- Skills overlap (JavaScript, React, TypeScript) → +15 ✅
- Posted today (≤2) → +5 ✅
- Source is LinkedIn → +5 ✅

**Total Score: 90** → **GREEN BADGE** 🟢

---

### Job 3: Junior Backend Developer at Razorpay

**Job Details:**
```javascript
{
  title: "Junior Backend Developer",
  company: "Razorpay",
  location: "Bengaluru",
  mode: "Hybrid",
  experience: "1-3",
  skills: ["Node.js", "REST APIs", "PostgreSQL"],
  source: "Naukri",
  postedDaysAgo: 3
}
```

**Score Breakdown:**
- Title contains "Developer" → +25 ✅
- Description contains "Developer" → +15 ✅
- Location "Bengaluru" matches preferred → +15 ✅
- Mode "Hybrid" matches preferred → +10 ✅
- Experience "1-3" matches → +10 ✅
- Skills overlap → +0 ❌ (no match with React/TypeScript/JavaScript)
- Posted 3 days ago (>2) → +0 ❌
- Source is Naukri → +0 ❌

**Total Score: 75** → **AMBER BADGE** 🟡

---

### Job 4: QA Intern at Wipro

**Job Details:**
```javascript
{
  title: "QA Intern",
  company: "Wipro",
  location: "Hyderabad",
  mode: "Onsite",
  experience: "Fresher",
  skills: ["Manual Testing", "Test Cases", "JIRA"],
  source: "Indeed",
  postedDaysAgo: 5
}
```

**Score Breakdown:**
- Title contains keywords → +0 ❌
- Description contains keywords → +0 ❌
- Location "Hyderabad" not in preferred → +0 ❌
- Mode "Onsite" not in preferred → +0 ❌
- Experience "Fresher" ≠ "1-3" → +0 ❌
- Skills overlap → +0 ❌
- Posted 5 days ago (>2) → +0 ❌
- Source is Indeed → +0 ❌

**Total Score: 0** → **GREY BADGE** ⚪

---

## Filter Behavior Examples

### Example 1: Only Matches Toggle

**Scenario:** minMatchScore = 60, "Show only jobs above my threshold" enabled

**Result:**
- Job 1 (100) → ✅ Shown
- Job 2 (90) → ✅ Shown
- Job 3 (75) → ✅ Shown
- Job 4 (0) → ❌ Hidden

---

### Example 2: Combined Filters

**Filters Applied:**
- Location: Bengaluru
- Mode: Hybrid
- Only matches: ON (threshold 60)

**Result:**
- Job 1 (Remote) → ❌ Hidden (location doesn't match filter)
- Job 2 (Bengaluru, Hybrid, 90) → ✅ Shown
- Job 3 (Bengaluru, Hybrid, 75) → ✅ Shown
- Job 4 → ❌ Hidden (multiple mismatches)

---

### Example 3: Sort by Match Score

**All jobs, sorted by match score descending:**

1. Job 1 - React Developer (100) 🟢
2. Job 2 - Frontend Intern (90) 🟢
3. Job 3 - Junior Backend Developer (75) 🟡
4. Job 4 - QA Intern (0) ⚪

---

## How to Test in Browser

1. Open `index.html` in a browser
2. Navigate to `/settings`
3. Enter the example preferences above:
   - Role keywords: `React, Developer, Frontend`
   - Locations: Select `Bengaluru` and `Remote`
   - Mode: Check `Remote` and `Hybrid`
   - Experience: Select `1-3`
   - Skills: `React, TypeScript, JavaScript`
   - Min match score: Set to `40`
4. Click "Save preferences"
5. Navigate to `/dashboard`
6. Observe match scores on job cards
7. Test filters and sorting
8. Enable "Show only jobs above my threshold"
9. Adjust threshold slider and observe filtering

---

## Expected Console Output

**No errors should appear in console.**

All operations are wrapped in try-catch blocks and handle edge cases gracefully.
