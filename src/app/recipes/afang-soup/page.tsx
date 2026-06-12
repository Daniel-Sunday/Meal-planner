import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Calabar Afang Soup Recipe | Chop Chop 🇳🇬",
  description: "Cook authentic Calabar Afang (Okazi) Soup. Tips on grinding okazi leaves, balancing waterleaves, and layering palm oil for rich texture.",
  openGraph: {
    title: "Calabar Afang Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook authentic Calabar Afang Soup with ground okazi leaves and waterleaves.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/afang-soup",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Calabar Afang Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook authentic Calabar Afang Soup with ground okazi leaves and waterleaves."
  }
};

const INGREDIENTS = [
  "1 kg Beef / stewing beef",
  "500 g Okazi (Afang) leaves, finely ground",
  "2 bunches Waterleaves (or Spinach), finely chopped",
  "1 litre Vegetable / palm oil",
  "1 pack Seasoning cubes",
  "6 pcs Scotch bonnet peppers",
  "500 g Smoked fish / tilapia",
  "2 tbsp ground Crayfish",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Season and boil beef with chopped onions and seasoning cubes until tender, using very little water.",
  "Chop the waterleaves finely and set aside. Blend or grind the okazi (afang) leaves dry with a blender or mill.",
  "Add palm oil, ground crayfish, blended peppers, and cleaned smoked fish to the beef pot. Simmer for 10 minutes.",
  "Add the chopped waterleaves (or spinach) and stir. Allow to cook for 3-5 minutes until the leaves shrink.",
  "Stir in the ground okazi leaves and an extra splash of palm oil. Cook on low heat for 3-5 minutes, then serve."
];

const TIPS = [
  "Okazi leaves are tough, so make sure they are ground very finely. Minimal water is key to this soup, as the waterleaves release a lot of moisture."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Afang Soup"
      description="Rich and highly nutritious Calabar soup made from ground afang (okazi) leaves and waterleaves, loaded with assorted seafood and beef."
      prepTime="15M"
      cookTime="40M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="afang-soup"
    />
  );
}
