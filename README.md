🍽️ Chop Chop 🇳🇬

Premium African Meal Planner

A simple, beautiful meal-planning app designed for Nigerian and West African households.

Chop Chop helps you decide what to cook for the entire week based on the meals and cuisines you enjoy. It creates a 7-day plan covering breakfast, lunch, and dinner, then turns that plan into a practical shopping list.

«Less time wondering “What will I cook today?”
More time enjoying good food with your family.»

---

✨ Features

🗓️ Weekly Meal Planning

Generate a complete 7-day meal plan with:

- Breakfast
- Lunch
- Dinner
- Monday through Sunday
- Meal times for each part of the day

The planner uses the user's selected food preferences to generate a varied weekly plan.

🇳🇬 Nigerian & African Meals

The application is built around familiar Nigerian and African food preferences rather than generic international recipes.

Meals are organized into categories that make it easy to select the kinds of food you actually want to eat.

❤️ Favourite Meals

Save meals you love and allow them to influence future plans.

Favourite meals are stored locally and can be used by the planning engine when generating a new week.

🛒 Dynamic Shopping List

The shopping screen generates a shopping list based on the current meal plan.

This means the shopping list changes with the meals you choose instead of requiring you to manually create one.

📱 Mobile-first Experience

Chop Chop is designed primarily for mobile use, with a compact interface that works well on smaller screens.

The interface uses:

- Large touch-friendly controls
- Rounded cards
- Simple navigation
- Short interactions
- Responsive layouts

📲 WhatsApp Sharing

The application includes a WhatsApp sharing flow so users can easily share their meal plans.

👨‍👩‍👧‍👦 Built for Families

The product is specifically designed around Nigerian and West African household meal planning, with a warm, home-oriented experience rather than a traditional productivity dashboard.

---

🧠 How Meal Planning Works

The planner uses a lightweight planning engine to generate a weekly schedule.

A plan contains three meals for each day:

Monday
├── Breakfast
├── Lunch
└── Dinner

Tuesday
├── Breakfast
├── Lunch
└── Dinner

...

Sunday
├── Breakfast
├── Lunch
└── Dinner

The application also uses saved favourites when generating plans.

Favourite meals have a higher probability of being selected, while the planner still introduces variety.

The current planning rules use a 60% favourite / 40% random selection bias when an applicable favourite exists, while preventing the same meal from being returned twice consecutively for the same meal slot.

---

🏗️ Tech Stack

Technology| Purpose
Next.js 15| Application framework
React 18| UI
TypeScript| Type safety
Next Navigation| Client-side navigation
localStorage| Local persistence
ESLint| Code quality
Vercel| Intended deployment platform

The project currently has no backend, authentication system, or database. User planning data is persisted locally in the browser.

---

📁 Project Structure

The application uses the Next.js App Router.

meal-planner/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── data/
│   │   ├── engines/
│   │   ├── insights/
│   │   ├── kids/
│   │   ├── onboarding/
│   │   ├── pantry/
│   │   ├── planner/
│   │   ├── recipes/
│   │   ├── school-lunch/
│   │   ├── shopping/
│   │   ├── home-client.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── utils.ts
│   │
│   ├── assets/
│   └── components/
│       ├── blog-template.tsx
│       ├── client-layout.tsx
│       └── recipe-template.tsx
│
├── public/
├── AGENTS.md
├── next.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

The main application is organized into separate areas for onboarding, planning, recipes, shopping, pantry management, school lunches, kids, insights, and supporting data/planning logic.

---

🚀 Getting Started

Prerequisites

Make sure you have:

- "Node.js" (https://nodejs.org/) 18.18 or later
- npm
- Git

1. Clone the repository

git clone https://github.com/Daniel-Sunday/Meal-planner.git
cd Meal-planner

2. Install dependencies

npm install

3. Start the development server

npm run dev

Open the application at:

http://localhost:3000

---

📜 Available Scripts

Development

npm run dev

Starts the Next.js development server.

Production Build

npm run build

Creates an optimized production build.

Production Server

npm run start

Starts the application using the production build.

Linting

npm run lint

Runs the project's linting configuration.

These scripts are defined in the repository's "package.json".

---

💾 Data & Privacy

Chop Chop currently uses browser "localStorage" for persistence.

There is no account system or backend database.

The application stores information such as:

mealplanner_favourites
mealplanner_selected
mealplanner_servings
mealplanner_plan

These values allow the application to remember a user's preferences, favourites, serving count, and generated meal plan between sessions.

Because this data is stored locally:

- Clearing browser storage will remove saved data.
- Data is tied to the browser/device being used.
- There is currently no cloud synchronization between devices.

---

🎨 Design Philosophy

Chop Chop intentionally avoids the appearance of a traditional productivity dashboard.

The visual direction is:

- Warm
- Premium
- Friendly
- Home-oriented
- African/Nigerian-inspired
- Mobile-first

The interface uses a warm cream background, forest green brand elements, terracotta primary actions, and warm neutral surfaces.

Typography is built around:

- Fraunces for headings
- Figtree for body text and interface elements

The design system and interaction rules are documented in "AGENTS.md".

---

🧩 Application Areas

The current application structure includes dedicated experiences for:

- Onboarding - selecting meal preferences
- Planner - viewing the generated weekly plan
- Recipes - browsing meal information
- Shopping - generating a shopping list
- Pantry - pantry-related planning
- School Lunch - school lunch planning
- Kids - family-oriented meal planning
- Insights - planning insights
- Blog - supporting content

The repository's App Router structure reflects these application areas.

---

🗺️ Current Product Status

The project's internal development notes mark the following major features as completed:

- ✅ Splash screen
- ✅ Cuisine picker
- ✅ 7-day plan generation
- ✅ Daily meal view
- ✅ Weekly meal view
- ✅ Shopping list
- ✅ Saved favourites
- ✅ New design system
- ✅ Today screen
- ✅ Single-tap meal selection
- ✅ WhatsApp sharing
- ✅ Dynamic shopping list
- ✅ Today highlighted in weekly view

Some planned work remains, including:

- ⬜ ₦ budget estimation
- ⬜ Vercel deployment

These statuses come from the project's current "AGENTS.md" feature tracker.

---

🔮 Roadmap

Potential future improvements include:

- [ ] Nigerian food price/budget estimation in ₦
- [ ] Cloud-based data persistence
- [ ] User accounts
- [ ] Cross-device synchronization
- [ ] More regional African cuisines
- [ ] More advanced meal personalization
- [ ] Pantry-aware meal planning
- [ ] Family member preferences
- [ ] Improved shopping-list organization
- [ ] Production deployment

«Some of these are future possibilities rather than currently implemented features.»

---

🤝 Contributing

Contributions, ideas, bug reports, and improvements are welcome.

Before making significant changes, please review the project's "AGENTS.md" file because it contains important development and design rules for the application.

In particular, the project currently has strong conventions around:

- UI styling
- Component structure
- localStorage usage
- mobile interactions
- navigation
- typography
- colour usage
- dependencies

---

📄 License

A license has not currently been specified in the repository.

If this project is intended to be publicly reusable, consider adding a "LICENSE" file.

---

👨🏾‍💻 Author

Daniel Sunday

GitHub:
https://github.com/Daniel-Sunday

---

❤️ About Chop Chop

Chop Chop was created around a simple idea:

Planning what to cook shouldn't be a daily struggle.

Instead of staring into the kitchen wondering what to make, choose the food you enjoy and let Chop Chop organize your week.

Pick your favourites.
Plan your week.
Shop smarter.
Cook with less stress.

---

⭐ Support the Project

If you find Chop Chop useful, consider giving the repository a ⭐ on GitHub and sharing it with someone who is tired of asking:

«“What are we cooking today?” 🍲»
