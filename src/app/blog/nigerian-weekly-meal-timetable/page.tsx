import type { Metadata } from "next";
import BlogTemplate from "../../../components/blog-template";

export const metadata: Metadata = {
  title: "Building a Balanced Nigerian Weekly Meal Timetable | Chop Chop 🇳🇬",
  description: "A complete step-by-step guide to structuring a balanced 7-day meal timetable that saves time, reduces cost, and delights your family.",
  openGraph: {
    title: "Building a Balanced Nigerian Weekly Meal Timetable | Chop Chop 🇳🇬",
    description: "Learn how to structure a balanced 7-day meal timetable for your household.",
    url: "https://chopchop-mealplanner.vercel.app/blog/nigerian-weekly-meal-timetable",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Balanced Nigerian Weekly Meal Timetable | Chop Chop 🇳🇬",
    description: "Learn how to structure a balanced 7-day meal timetable for your household."
  }
};

const SECTIONS = [
  {
    heading: "The Power of the Written Timetable",
    paragraph: "Growing up, many of our mothers had a mental meal timetable. In today's busy world, however, committing it to paper (or an app) is a household game-changer. A structured meal timetable balances nutrition and guarantees variety so your family never gets bored."
  },
  {
    heading: "Steps to Build Your Custom Timetable",
    paragraph: "Designing your timetable is easy when you break it down into manageable steps:",
    bullets: [
      "Catalog Family Favorites: List 5 breakfast, 5 lunch, and 5 dinner options that everyone loves.",
      "Balance Heavy and Light Meals: If lunch is a heavy swallow like Egusi and Eba, keep dinner light with Pepper Soup.",
      "Batch Cook on Weekends: Boil pepper mixes, boil meats, and prep beans on Sunday to cut weekday cook times in half.",
      "Leave Room for Leftovers: Allocate Saturday lunch or Sunday dinner for clearing out fridge leftovers to prevent waste."
    ]
  },
  {
    heading: "Keep it Flexible",
    paragraph: "A rigid timetable can feel like a chore. The secret to long-term success is flexibility. Don't be afraid to swap a meal when cravings or market availability changes. A dynamic kitchen is a happy kitchen!"
  }
];

export default function Page() {
  return (
    <BlogTemplate
      title="Nigerian Weekly Meal Timetable"
      description="Learn how to build a classic, stress-free 7-day meal plan that keeps your family excited for breakfast, lunch, and dinner."
      author="Victoria A."
      publishDate="June 10, 2026"
      readTime="5 min read"
      sections={SECTIONS}
      slug="nigerian-weekly-meal-timetable"
    />
  );
}
