# Daily Digest - Quick Reference

## 🎯 What It Does

Generates a personalized email-style digest of your top 10 job matches, persisted daily in localStorage.

---

## 🔑 Key Features

| Feature | Description |
|---------|-------------|
| **Daily Persistence** | One digest per day, stored as `jobTrackerDigest_YYYY-MM-DD` |
| **Top 10 Selection** | Best matches sorted by score, then recency |
| **Email-Style UI** | Clean white cards, premium typography |
| **Copy to Clipboard** | Plain text format with all details |
| **Email Draft** | Opens client with pre-filled content |
| **Regenerate** | Update digest with new preferences |

---

## 📋 Quick Test

1. **Set Preferences** → Settings page
2. **Generate Digest** → Digest page → Click button
3. **Refresh Page** → Digest persists ✅
4. **Copy** → Click "Copy to Clipboard" → Paste in editor ✅
5. **Email** → Click "Create Email Draft" → Client opens ✅

---

## 🗂️ localStorage Keys

```javascript
jobTrackerPreferences          // User preferences
jobTrackerDigest_2026-02-16   // Today's digest
jobTrackerDigest_2026-02-17   // Tomorrow's digest
```

---

## 🎨 UI States

| State | Display |
|-------|---------|
| **No Preferences** | Blocking message + "Go to Settings" button |
| **First Visit** | Generate button + explanation |
| **Digest Generated** | 10 job cards + action buttons |
| **No Matches** | Empty state + "Check tomorrow" message |

---

## 📊 Digest Format

```
Top 10 Jobs For You — 9AM Digest
Monday, February 16, 2026

1. React Developer          100% match
   UrbanStack Labs
   Remote • Remote • 1-3 • Today
   [Apply Now]

2. Frontend Intern           90% match
   Flipkart
   Bengaluru • Hybrid • Fresher • Today
   [Apply Now]

... (8 more jobs)

This digest was generated based on your preferences.

[Copy to Clipboard] [Email Draft] [Regenerate]

Demo Mode: Daily 9AM trigger simulated manually.
```

---

## 🔧 Key Functions

```javascript
generateDigest()     // Create new digest
getDigest()          // Load existing digest
getTodayDateKey()    // Returns "YYYY-MM-DD"
renderDigest()       // Render UI
initDigestRoute()    // Attach event listeners
```

---

## ✅ Success Criteria

- ✅ Digest persists after refresh
- ✅ Top 10 jobs sorted correctly
- ✅ Copy to clipboard works
- ✅ Email draft opens
- ✅ Regenerate updates digest
- ✅ No preferences blocks generation
- ✅ Premium email-style design
- ✅ No console errors

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Digest not generating | Check preferences are set |
| Copy not working | Check clipboard permissions |
| Email not opening | Verify default email client |
| Wrong jobs shown | Regenerate digest |

---

## 📱 Responsive

- **Desktop:** Multi-column buttons, full layout
- **Mobile:** Stacked buttons, compact cards
- **Breakpoint:** 640px

---

**Status: COMPLETE** ✅
