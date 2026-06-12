import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Classic Nigerian Jollof Rice Recipe | Chop Chop 🇳🇬",
  description: "Learn how to cook authentic, smoky party Jollof Rice. Detailed ingredients, step-by-step instructions, and secrets for the perfect smoky flavor.",
  openGraph: {
    title: "Classic Nigerian Jollof Rice Recipe | Chop Chop 🇳🇬",
    description: "Learn how to cook authentic, smoky party Jollof Rice with step-by-step instructions.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/jollof-rice",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Nigerian Jollof Rice Recipe | Chop Chop 🇳🇬",
    description: "Learn how to cook authentic, smoky party Jollof Rice with step-by-step instructions."
  }
};

const INGREDIENTS = [
  "2 kg Chicken (pieces)",
  "3 kg Long grain rice",
  "6 pcs Tomatoes",
  "2 tins Tomato paste",
  "4 pcs Fresh pepper (tatashe)",
  "4 pcs Onions",
  "1 pack Seasoning cubes",
  "1 tin Curry powder",
  "1 tin Thyme",
  "1 litre Vegetable / palm oil",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Season chicken pieces with onions, seasoning cubes, curry powder, thyme, and salt. Boil until tender, then fry or grill until golden brown. Save the rich chicken stock.",
  "Blend tomatoes, fresh peppers (tatashe), scotch bonnet peppers, and onions until smooth. Boil the blend in a pot to remove excess water.",
  "Heat oil in a large pot, fry chopped onions, then add tomato paste and fry for 5 minutes. Add the boiled pepper mix and fry until oil starts to separate.",
  "Wash long grain rice thoroughly in warm water. Add chicken stock, water, seasoning cubes, and salt to the fried pepper sauce and bring to a boil.",
  "Stir in the washed rice, cover tightly (using foil paper under the lid to trap steam), and cook on low heat for 30 minutes until soft and smoky. Serve with chicken."
];

const TIPS = [
  "For that classic party smokiness, allow the rice to burn slightly at the bottom of the pot. The trapped steam will distribute the smoky flavor throughout the dish."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Jollof Rice"
      description="The legendary smoky Nigerian rice cooked in rich tomato and pepper blend, serving as the crown jewel of any family celebration."
      prepTime="15M"
      cookTime="45M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="jollof-rice"
    />
  );
}
