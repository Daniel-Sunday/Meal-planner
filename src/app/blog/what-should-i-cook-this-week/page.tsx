import type { Metadata } from "next";
import BlogTemplate from "../../../components/blog-template";

export const metadata: Metadata = {
  title: "What Should I Cook This Week? Family Dinner Rotation | Chop Chop 🇳🇬",
  description: "Banish daily decision fatigue. Learn how to structure a simple, delicious 7-day meal rotation for a Nigerian household.",
  openGraph: {
    title: "What Should I Cook This Week? Family Dinner Rotation | Chop Chop 🇳🇬",
    description: "Banish daily decision fatigue. Learn how to structure a simple, delicious 7-day meal rotation.",
    url: "https://chopchop-mealplanner.vercel.app/blog/what-should-i-cook-this-week",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "What Should I Cook This Week? Family Dinner Rotation | Chop Chop 🇳🇬",
    description: "Banish daily decision fatigue. Learn how to structure a simple, delicious 7-day meal rotation."
  }
};

const SECTIONS = [
  {
    heading: "The Daily Dinner Fatigue",
    paragraph: "Every single afternoon, millions of mothers face the same exhausting question: 'What will I cook tonight?' When we leave dinners to the last minute, we end up spending more money, ordering fast food, or repeating the same quick, nutritionally empty meals over and over."
  },
  {
    heading: "How to Structure Your Week",
    paragraph: "The easiest way to break the cycle is by assigning a food theme or profile to each day of the week. This keeps grocery shopping organized and takes the guesswork out of dinner preparation:",
    bullets: [
      "Rice Mondays: Start the week strong with Jollof Rice, coconut rice, or rice and stew.",
      "Swallow Wednesdays: Mid-week comfort soups like Egusi, Oha, or Okra paired with eba or fufu.",
      "Porridge Fridays: Cozy Yam Porridge (Asaro) or sweet potato mash to transition into the weekend.",
      "Light Weekends: Saturday night Pepper Soup, suya salad, or simple grilled fish."
    ]
  },
  {
    heading: "The Power of a Meal Timetable",
    paragraph: "By spending just 5 minutes planning your week on Sunday, you write down exactly what ingredients you need. This reduces market runs, minimizes food wastage, and helps you keep your household budget in check."
  }
];

export default function Page() {
  return (
    <BlogTemplate
      title="What Should I Cook This Week?"
      description="Overcome the daily decision fatigue with our practical guide to structuring a balanced weekly dinner rotation for West African households."
      author="Victoria A."
      publishDate="June 12, 2026"
      readTime="4 min read"
      sections={SECTIONS}
      slug="what-should-i-cook-this-week"
    />
  );
}
