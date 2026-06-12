import type { Metadata } from "next";
import BlogTemplate from "../../../components/blog-template";

export const metadata: Metadata = {
  title: "School Lunch Ideas For Nigerian Kids | Chop Chop 🇳🇬",
  description: "Dread packing school lunches? Explore 5 mess-free, room-temperature stable West African lunchbox ideas your kids will actually eat.",
  openGraph: {
    title: "School Lunch Ideas For Nigerian Kids | Chop Chop 🇳🇬",
    description: "Explore 5 mess-free, room-temperature stable lunchbox ideas for kids.",
    url: "https://chopchop-mealplanner.vercel.app/blog/school-lunch-ideas-for-nigerian-kids",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "School Lunch Ideas For Nigerian Kids | Chop Chop 🇳🇬",
    description: "Explore 5 mess-free, room-temperature stable lunchbox ideas for kids."
  }
};

const SECTIONS = [
  {
    heading: "The School Lunchbox Criteria",
    paragraph: "Packing school lunch for kids comes with unique challenges. The food must stay fresh for 4-5 hours, remain appetizing without being reheated, be easy to eat during short break times, and most importantly, never leak into their school backpacks."
  },
  {
    heading: "5 Kid-Approved School Lunchbox Ideas",
    paragraph: "These 5 meal ideas are nutritious, dry enough to prevent leakage, and taste excellent at room temperature:",
    bullets: [
      "Jollof Spaghetti: Fast to cook, non-sticky, and highly popular with children of all ages.",
      "Moi Moi Cupcakes: Steamed in silicone muffin cups. Mess-free, pre-portioned, and loaded with protein.",
      "Dodo & Egg Frittata Cups: Baked eggs and sweet plantain cubes in muffin tins. Perfect grab-and-go finger food.",
      "Chicken & Veggie Fried Rice: Lightly fried with shredded chicken, sweet peas, and carrots for colors and vitamins.",
      "Yam/Sweet Potato Fries & Fish: Dry, easy to eat with fingers, and pairs perfectly with a ketchup dip."
    ]
  },
  {
    heading: "Sogginess Prevention Tip",
    paragraph: "Never seal hot food immediately! Let the meal cool down for 5-10 minutes before capping the lunchbox lid. This prevents steam from condensing inside, which makes crispy foods soggy and can cause quick spoilage."
  }
];

export default function Page() {
  return (
    <BlogTemplate
      title="School Lunch Ideas For Nigerian Kids"
      description="Spill-proof, room-temperature stable lunchbox ideas that will make your kids look forward to their school lunch break."
      author="Victoria A."
      publishDate="June 8, 2026"
      readTime="3 min read"
      sections={SECTIONS}
      slug="school-lunch-ideas-for-nigerian-kids"
    />
  );
}
