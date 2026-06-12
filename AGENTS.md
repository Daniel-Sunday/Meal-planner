# Meal Planner — Agent Rules

This file is read at the start of every agent session.
Follow every rule here before writing a single line of code.

---

## What this app is

A Nigerian/African meal planner for mothers and families.
It removes the daily "what will I cook?" stress.
Target users: Nigerian and West African households.
Tone: warm, homey, premium — like a kitchen that understands you.

One file: `src/meal-planner-app.jsx`
No backend. No auth. No database. All state lives in `localStorage`.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | Inline styles only — no CSS files, no Tailwind, no styled-components |
| State | React useState / useRef / useEffect — nothing else |
| Persistence | localStorage only |
| Fonts | Google Fonts — Fraunces (headings), Figtree (body) |
| Icons | Emoji only — no icon libraries |
| Deployment | Vercel |

---

## File structure

```
meal-planner/
├── src/
│   └── meal-planner-app.jsx   ← the entire app lives here
├── index.html
├── vite.config.js
├── package.json
└── AGENTS.md                  ← this file
```

Do not create new component files unless explicitly told to.
Do not create a `styles/` folder or any `.css` files.
Do not install new npm packages without asking first.

---

## Design system — never override these

### Philosophy
Light mode. Warm cream base. The app should feel like a kitchen, not a dashboard.
It needs to look premium enough that mothers are proud to screenshot and share it
on WhatsApp. No dark backgrounds. No neon. Nothing that looks like a fintech app.

### Colours

```
/* Page & surfaces */
--bg-page:        #F5EFE6   /* warm cream — page background */
--bg-card:        #FFFFFF   /* pure white — card surface */
--bg-card-alt:    #FBF7F2   /* slightly warm white — alternate card */
--bg-selected:    #EAF3DE   /* light green — selected state bg */
--bg-header:      #2D5016   /* forest green — screen headers */

/* Text */
--text-primary:   #1A2E0A   /* deep soil — main headings & body */
--text-secondary: #3D4A30   /* dark olive — secondary body text */
--text-muted:     #8A7968   /* clay — labels, captions, placeholders */
--text-inverse:   #F5EFE6   /* cream — text on green backgrounds */

/* Accents */
--accent-terra:   #C4622D   /* terracotta — primary CTA buttons */
--accent-terra-l: #F5E6DC   /* light terracotta — CTA hover bg */
--accent-green:   #2D5016   /* forest green — primary brand, headers, active tabs */
--accent-green-l: #EAF3DE   /* light green — selected bg, success states */
--accent-turmeric:#E8A838   /* turmeric — highlights, badges, today indicator */
--accent-chilli:  #C8432A   /* chilli red — favourites hearts, destructive actions */

/* Borders */
--border-default: #E8DDD0   /* sand — default card borders */
--border-strong:  #D9C9B4   /* stronger sand — emphasis borders */
--border-green:   #2D501633 /* green tint — selected card borders */
```

### Typography

```
Headings:  font-family: "'Fraunces', serif"
           Weights used: 400 (italic for sub-headings), 700 (titles)
           Example: fontFamily: "'Fraunces', serif", fontWeight: 700

Body:      font-family: "'Figtree', sans-serif"
           Weights used: 400 (body), 500 (emphasis), 600 (labels/buttons)
           Set on root div — every child inherits it

Google Fonts link (must be in index.html <head> or top of App component):
  https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Figtree:wght@400;500;600&display=swap
```

### Font size scale

| Usage | Size | Weight | Color |
|---|---|---|---|
| Screen title | 26–28px | 700, Fraunces | #1A2E0A |
| Section title | 20–22px | 700, Fraunces | #1A2E0A |
| Italic sub-heading | 16–18px | 400 italic, Fraunces | #C4622D |
| Card meal name | 15px | 600, Figtree | #1A2E0A |
| Body text | 14px | 400, Figtree | #3D4A30 |
| Secondary text | 13px | 400, Figtree | #8A7968 |
| Label / tag | 11–12px | 600, Figtree | #8A7968 |
| Caption | 11px | 400, Figtree | #8A7968 |

### Spacing & shape

```
Max width:        420px, margin: "0 auto"
Page padding:     "1.5rem 1rem"
Card radius:      16px
Pill radius:      100px
Tab radius:       12px
Small card:       14px
Border width:     1px (cards), 1.5px (selected state)
```

### Buttons

```js
// Primary CTA (terracotta)
{
  background: "#C4622D",
  color: "#FFF8F0",
  border: "none",
  borderRadius: 100,
  padding: "14px 32px",
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
}

// Secondary / ghost
{
  background: "transparent",
  border: "1px solid #E8DDD0",
  borderRadius: 100,
  color: "#8A7968",
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 500
}

// Disabled
{
  background: "#F5EFE6",
  border: "1px solid #E8DDD0",
  color: "#8A7968",
  cursor: "default"
}
```

### Cards

```js
// Standard meal card
{
  background: "#FFFFFF",
  border: "1px solid #E8DDD0",
  borderRadius: 16,
  padding: "14px"
}

// Saved/favourited card (pink tint border)
{
  background: "#FFFFFF",
  border: "1px solid #C8432A33",
  borderRadius: 16,
  padding: "14px"
}
```

### Tab bar

```js
// Active tab
{ background: "#2D5016", color: "#EAF3DE", border: "none" }

// Inactive tab
{ background: "#FFFFFF", border: "1px solid #E8DDD0", color: "#8A7968" }

// Tab bar container
{ background: "#F5EFE6", borderTop: "1px solid #E8DDD0", padding: "8px 1rem 10px" }
```

### Screen header (green band)

```js
{
  background: "#2D5016",
  padding: "1.25rem 1rem 1rem",
  color: "#F5EFE6"
}
// Day/context label inside header
{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }
// Title inside header
{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6" }
```

---

## localStorage keys

| Key | Type | Purpose |
|---|---|---|
| `mealplanner_favourites` | JSON array | `[{ meal, type, cuisine }]` |
| `mealplanner_selected` | JSON array | Selected cuisine IDs |
| `mealplanner_servings` | number | Servings count, default 2 |
| `mealplanner_plan` | JSON object | The generated 7-day plan |

Always wrap localStorage calls in try/catch. Never assume the key exists.

---

## Data shape

### Plan shape
```js
{
  Monday:  { breakfast: "Akara & Pap", lunch: "Jollof Rice & Chicken", dinner: "Pepper Soup" },
  // ...all 7 days
}
```

### Favourite shape
```js
[{ meal: "Jollof Rice & Chicken", type: "lunch", cuisine: "Nigerian" }]
```

---

## Generation bias rule

When generating a plan, always use `pickWithBias(pool, type, favs)`:
- 60% chance to pick a saved favourite for that meal type if one exists in pool
- 40% fully random
- Never return the same meal twice in a row for the same slot

---

## Behaviour rules

- Touch support: every interactive element handles both mouse AND touch events
- Long press threshold: 500ms for save-to-favourites gesture
- Toast: auto-dismiss after 2000ms, never stack toasts
- Animations: all transitions under 200ms, CSS transition or inline transform only
- No position fixed: use sticky or layout flow
- No nested scroll containers
- Cards with long-press: set `userSelect: "none"`, `WebkitUserSelect: "none"`, `WebkitTouchCallout: "none"`

---

## What NOT to do

- Do not use dark backgrounds anywhere in the UI
- Do not use the old colour palette (#0f0f0f, #1a1a1a, #e8c547) — it has been replaced
- Do not use Playfair Display — replaced by Fraunces
- Do not use DM Sans — replaced by Figtree
- Do not add React Router or any routing library
- Do not add Supabase or any database (v2)
- Do not add user authentication of any kind
- Do not add nutritional info or calorie tracking
- Do not add recipe steps or cooking instructions
- Do not use Tailwind, Bootstrap, or any CSS framework
- Do not install new npm packages without asking the user first
- Do not change colours not related to the feature being built
- Do not rename or move meal-planner-app.jsx
- Do not split the app into multiple files unless explicitly asked

---

## How to handle agent tasks

### Before writing any code
1. Read this file fully
2. Identify which component(s) are affected
3. State your plan in one sentence before executing

### After writing code
1. Run the dev server (`npm run dev`)
2. Open the built-in browser at 375px width
3. Navigate to the affected screen
4. Take a screenshot as your artifact
5. For touch features: simulate touch events and screenshot the result

### When something is unclear
Ask one clarifying question. Do not proceed with assumptions that contradict this file.

---

## Current feature status

| Feature | Status |
|---|---|
| Splash screen | ✅ Done |
| Cuisine picker | ✅ Done |
| 7-day plan generation | ✅ Done |
| Daily view (meal cards) | ✅ Done |
| Weekly view | ✅ Done |
| Shopping list | ✅ Done |
| Saved favourites (long press) | ✅ Done |
| New design system applied | ✅ Done |
| Today screen (return users skip to meals) | ✅ Done |
| Single-tap meal swap | ✅ Done |
| WhatsApp share button | ✅ Done |
| Dynamic shopping list | ✅ Done |
| ₦ budget estimate | ⬜ Not started |
| Weekly view — today highlighted | ✅ Done |
| Vercel deploy | ⬜ Not started |

Update this table after every completed task.
