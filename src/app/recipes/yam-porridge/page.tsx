import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Nigerian Yam Porridge Recipe (Asaro) | Chop Chop 🇳🇬",
  description: "Learn how to make rich, creamy Yam Porridge (Asaro). Step-by-step instructions on mashing, seasoning with palm oil and smoked fish, and adding greens.",
  openGraph: {
    title: "Nigerian Yam Porridge Recipe (Asaro) | Chop Chop 🇳🇬",
    description: "Learn how to make rich, creamy Yam Porridge with our simple family recipe.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/yam-porridge",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Yam Porridge Recipe (Asaro) | Chop Chop 🇳🇬",
    description: "Learn how to make rich, creamy Yam Porridge with our simple family recipe."
  }
};

const INGREDIENTS = [
  "2 pcs Yam (tubers)",
  "1 litre Vegetable / palm oil",
  "6 pcs Scotch bonnet peppers",
  "4 pcs Onions",
  "1 pack Seasoning cubes",
  "500 g Smoked fish / tilapia",
  "2 bunches Spinach / ugwu, chopped",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Peel the yams, cut them into medium cubes, wash thoroughly, and place them in a cooking pot.",
  "Add enough water to just cover the yams. Add chopped onions, blended peppers, and palm oil. Boil on medium heat for 15-20 minutes.",
  "Add seasoning cubes, cleaned smoked fish chunks, and salt. Cook until the yam is soft enough to pierce easily with a fork.",
  "Gently mash a few yam cubes against the side of the pot with a wooden spoon to thicken the gravy to a creamy consistency.",
  "Add the chopped spinach or ugwu, stir, and allow to steam on low heat for 3 minutes before serving."
];

const TIPS = [
  "Mashing a few cooked yam cubes directly into the sauce creates a thick, creamy porridge naturally, without needing any cornstarch thickeners."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Yam Porridge"
      description="Also known as Asaro, soft yam cubes simmered in a savory, spicy tomato and palm oil sauce, garnished with fresh greens."
      prepTime="15M"
      cookTime="30M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="yam-porridge"
    />
  );
}
