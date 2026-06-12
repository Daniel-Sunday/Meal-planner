import type { Metadata } from "next";
import BlogTemplate from "../../../components/blog-template";

export const metadata: Metadata = {
  title: "Budget-Friendly Nigerian Meals & Shopping Tips | Chop Chop 🇳🇬",
  description: "Feed your family well without overspending. 5 practical rules for bulk buying, meat alternatives, batch cooking, and saving money on groceries.",
  openGraph: {
    title: "Budget-Friendly Nigerian Meals & Shopping Tips | Chop Chop 🇳🇬",
    description: "Feed your family well without overspending with our 5 practical budget rules.",
    url: "https://chopchop-mealplanner.vercel.app/blog/budget-friendly-nigerian-meals",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget-Friendly Nigerian Meals & Shopping Tips | Chop Chop 🇳🇬",
    description: "Feed your family well without overspending with our 5 practical budget rules."
  }
};

const SECTIONS = [
  {
    heading: "Managing Household Food Expenses",
    paragraph: "With food prices and inflation rising, feeding a family of four or more can consume a massive portion of the household budget. However, budget-friendly cooking does not mean compromising on nutrition. By adapting shopping and cooking habits, you can eat well for less."
  },
  {
    heading: "5 Rules for a Low-Cost, High-Nutrition Kitchen",
    paragraph: "Implement these five rules to stretch your kitchen budget further:",
    bullets: [
      "Buy Staples in Bulk: Purchase bags or half-bags of rice, garri, beans, and vegetable oil. Bulk buying is significantly cheaper than paint-bucket or sachet purchases.",
      "Incorporate Dry Fish & Crayfish: Fresh meats and fish are expensive. Dried catfish, stockfish, and ground crayfish deliver deep umami flavor to soups at a fraction of the cost.",
      "Embrace Beans & Legumes: Beans are a cheap, high-quality plant protein. Make Moi Moi, Akara, or bean porridge a regular weekly menu item.",
      "Batch Cook and Freeze: Cook large pots of stews and soups. Reheating saves cooking gas, prep time, and eliminates the impulse to buy expensive takeout.",
      "Season with Fresh Local Herbs: Skip expensive packaged seasoning mixes. Use local ginger, garlic, scent leaves, and curry leaves for cheap, nutritious flavor."
    ]
  },
  {
    heading: "Smart Planning Saves Naira",
    paragraph: "Using a dynamic weekly meal planner generates a precise shopping checklist. This prevents impulse market purchases, reduces food spoilage, and saves thousands of Naira every single week!"
  }
];

export default function Page() {
  return (
    <BlogTemplate
      title="Budget-Friendly Nigerian Meals"
      description="How to shop smart, utilize dry goods, and structure portion sizes to feed a family of 4 or more on a budget."
      author="Victoria A."
      publishDate="June 2, 2026"
      readTime="5 min read"
      sections={SECTIONS}
      slug="budget-friendly-nigerian-meals"
    />
  );
}
