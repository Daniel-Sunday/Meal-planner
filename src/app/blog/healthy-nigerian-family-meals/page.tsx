import type { Metadata } from "next";
import BlogTemplate from "../../../components/blog-template";

export const metadata: Metadata = {
  title: "Healthy Nigerian Family Meals & Cooking Tweaks | Chop Chop 🇳🇬",
  description: "Learn how to make traditional Nigerian food healthier. 4 simple adjustments to oil, meat prep, and vegetable portions that keep authentic flavor.",
  openGraph: {
    title: "Healthy Nigerian Family Meals & Cooking Tweaks | Chop Chop 🇳🇬",
    description: "Learn how to make traditional Nigerian food healthier without losing authentic flavor.",
    url: "https://chopchop-mealplanner.vercel.app/blog/healthy-nigerian-family-meals",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthy Nigerian Family Meals & Cooking Tweaks | Chop Chop 🇳🇬",
    description: "Learn how to make traditional Nigerian food healthier without losing authentic flavor."
  }
};

const SECTIONS = [
  {
    heading: "The Nutritional Wealth of West African Food",
    paragraph: "West African and Nigerian cuisine is naturally rich in legumes, complex carbohydrates, tubers, and dark leafy vegetables. However, typical preparation habits—like deep-frying proteins, heavy palm oil usage, and over-salting—can reduce their health benefits."
  },
  {
    heading: "4 Simple Cooking Hacks for Healthier Meals",
    paragraph: "You can easily reduce calories and sodium in your family's dinners without sacrificing taste by making these adjustments:",
    bullets: [
      "Measure Palm and Vegetable Oil: Avoid pouring oil directly from the bottle. Use a tablespoon—two tablespoons are plenty to sauté a pot of sauce.",
      "Bake, Grill, or Air-Fry Proteins: Replace deep-frying with oven-grilling or air-frying for chicken, fish, beef, and turkey to slash fat content.",
      "Double the Green Vegetables: Bulk up soups like Egusi, Oha, or Okra by adding extra spinach or ugwu leaves to increase dietary fiber.",
      "Opt for Whole Grains: Incorporate local Ofada rice, brown rice, or healthy swallow options like oatmeal swallow instead of processed white starch."
    ]
  },
  {
    heading: "Protecting Family Long-Term Health",
    paragraph: "Making these small adjustments in your kitchen helps protect your family from high blood pressure, cholesterol, and diabetes, while teaching children that healthy eating can be absolutely delicious."
  }
];

export default function Page() {
  return (
    <BlogTemplate
      title="Healthy Nigerian Family Meals"
      description="Nutrient-packed modifications to traditional Nigerian staples, lowering oil levels while keeping authentic flavor."
      author="Victoria A."
      publishDate="June 5, 2026"
      readTime="4 min read"
      sections={SECTIONS}
      slug="healthy-nigerian-family-meals"
    />
  );
}
