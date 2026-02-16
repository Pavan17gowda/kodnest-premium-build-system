# Daily Digest - Quick Test Guide

## 🧪 Complete Test Sequence

### Step 1: Set Preferences (Required)

1. Navigate to **Settings**
2. Fill in preferences:
   ```
   Role Keywords: React, Developer, Frontend
   Locations: Bengaluru, Remote (hold Ctrl/Cmd to select multiple)
   Modes: ✓ Remote, ✓ Hybrid
   Experience: 1-3
   Skills: React, TypeScript, JavaScript
   Min Match Score: 40
   ```
3. Click **Save preferences**

---

### Step 2: Generate Digest

1. Navigate to **Digest**
2. You should see:
   - Title: "Daily Digest"
   - Subtitle: "Generate your personalized 9AM job digest..."
   - Button: "Generate Today's 9AM Digest (Simulated)"
   - Note: "Demo Mode: Daily 9AM trigger simulated manually."

3. Click **Generate Today's 9AM Digest (Simulated)**

4. Digest should appear with:
   - Header: "Top 10 Jobs For You — 9AM Digest"
   - Today's date (e.g., "Monday, February 16, 2026")
   - 10 job cards numbered 1-10
   - Each card shows:
     - Number badge (1-10)
     - Job title
     - Company name
     - Match score percentage
     - Location, mode, experience, posted date
     - "Apply Now" button
   - Footer: "This digest was generated based on your preferences."
   - Action buttons: Copy, Email Draft, Regenerate

---

### Step 3: Test Persistence

1. **Refresh the page** (F5 or Ctrl+R)
   - ✅ Digest should load instantly
   - ✅ Same 10 jobs displayed
   - ✅ No regeneration needed

2. **Navigate away** to Dashboard
3. **Navigate back** to Digest
   - ✅ Digest still there
   - ✅ Data preserved

4. **Open DevTools** (F12)
5. Go to **Application** → **Local Storage**
6. Find key: `jobTrackerDigest_2026-02-16` (today's date)
   - ✅ Digest data stored as JSON

---

### Step 4: Test Copy to Clipboard

1. Click **Copy Digest to Clipboard**
2. Button should change to "Copied!" for 2 seconds
3. Open a text editor (Notepad, VS Code, etc.)
4. Paste (Ctrl+V)

**Expected Output:**
```
Top 10 Jobs For You — 9AM Digest
Monday, February 16, 2026

1. React Developer
   Company: UrbanStack Labs
   Location: Remote | Mode: Remote
   Experience: 1-3
   Match Score: 100%
   Apply: https://jobs.urbanstacklabs.com/react-dev

2. Frontend Intern
   Company: Flipkart
   Location: Bengaluru | Mode: Hybrid
   Experience: Fresher
   Match Score: 90%
   Apply: https://careers.flipkart.com/frontend-intern

... (8 more jobs)

This digest was generated based on your preferences.
```

---

### Step 5: Test Email Draft

1. Click **Create Email Draft**
2. Your default email client should open (Outlook, Gmail, etc.)
3. Check:
   - ✅ Subject: "My 9AM Job Digest"
   - ✅ Body: Contains formatted digest text
   - ✅ All 10 jobs included
   - ✅ You can add recipients and send

---

### Step 6: Test Apply Buttons

1. Click **Apply Now** on any job card
2. Should open job application URL in new tab
3. Test multiple jobs to verify all links work

---

### Step 7: Test Regenerate

1. Navigate to **Settings**
2. Change preferences (e.g., add "Backend" to keywords)
3. Click **Save preferences**
4. Navigate to **Digest**
5. Click **Regenerate Digest**

**Expected:**
- ✅ Page refreshes
- ✅ New digest generated
- ✅ Different jobs may appear
- ✅ Match scores recalculated based on new preferences

---

### Step 8: Test No Preferences State

1. Open **DevTools** (F12)
2. Go to **Application** → **Local Storage**
3. Delete `jobTrackerPreferences` key
4. Refresh page
5. Navigate to **Digest**

**Expected:**
- ✅ Blocking message: "Set preferences to generate a personalized digest."
- ✅ "Go to Settings" button visible
- ✅ No generate button
- ✅ Clear guidance

---

### Step 9: Test Match Score Display

Check the digest jobs and verify:
- Jobs are sorted by match score (highest first)
- Match scores are displayed prominently
- Jobs with same score are sorted by recency (most recent first)

**Example Expected Order:**
1. React Developer - 100% (Remote, posted today)
2. Frontend Intern - 90% (Bengaluru, posted today)
3. Junior Backend Developer - 75% (Bengaluru, posted 3 days ago)
... and so on

---

### Step 10: Test Responsive Design

1. Resize browser window to mobile size (< 640px)
2. Check:
   - ✅ Layout adapts
   - ✅ Action buttons stack vertically
   - ✅ Job cards remain readable
   - ✅ No horizontal scroll

---

## ✅ Success Criteria

All tests should pass with:
- ✅ Digest persists per day
- ✅ Refresh loads existing digest
- ✅ Copy to clipboard works
- ✅ Email draft opens with content
- ✅ Regenerate updates digest
- ✅ No preferences shows blocking message
- ✅ Apply buttons open job URLs
- ✅ Premium email-style design
- ✅ No console errors
- ✅ Responsive layout

---

## 🐛 Troubleshooting

### Digest not generating?
- Check if preferences are set
- Open DevTools console for errors
- Verify localStorage is enabled

### Copy not working?
- Check browser clipboard permissions
- Try HTTPS (some browsers restrict clipboard on HTTP)
- Check DevTools console for errors

### Email draft not opening?
- Verify default email client is configured
- Check browser popup blocker
- Try different browser

### Jobs not sorted correctly?
- Check match scores in digest
- Verify preferences are saved
- Regenerate digest

---

## 📊 Expected Results Summary

| Test | Expected Result | Status |
|------|----------------|--------|
| Generate digest | Top 10 jobs displayed | ✅ |
| Refresh page | Digest persists | ✅ |
| Navigate away/back | Digest loads | ✅ |
| Copy to clipboard | Plain text copied | ✅ |
| Email draft | Client opens with content | ✅ |
| Apply buttons | URLs open in new tab | ✅ |
| Regenerate | New digest created | ✅ |
| No preferences | Blocking message shown | ✅ |
| Responsive | Layout adapts | ✅ |
| No errors | Console clean | ✅ |

---

**All tests passing = Implementation complete!** 🎉
