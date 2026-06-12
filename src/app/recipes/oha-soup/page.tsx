import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Traditional Nigerian Oha Soup Recipe | Chop Chop 🇳🇬",
  description: "Cook authentic Oha Soup. Learn how to thicken with cocoyam paste, prep oha leaves properly without a knife, and use traditional seasonings.",
  openGraph: {
    title: "Traditional Nigerian Oha Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook authentic Oha Soup with cocoyam thickener and hand-torn oha leaves.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/oha-soup",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Traditional Nigerian Oha Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook authentic Oha Soup with cocoyam thickener and hand-torn oha leaves."
  }
};

const INGREDIENTS = [
  "1 kg Beef / stewing beef",
  "1 bunch fresh Oha leaves",
  "4 pcs Cocoyam tubers (thickener)",
  "1 litre Vegetable / palm oil",
  "1 pack Seasoning cubes",
  "6 pcs Scotch bonnet peppers",
  "500 g Smoked fish / tilapia",
  "2 tbsp ground Crayfish",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Boil the cocoyam tubers with their skins on until very soft. Peel and pound them into a smooth, thick paste.",
  "Season and boil beef with onions and seasoning cubes until tender. Add smoked fish chunks to cook briefly.",
  "Add palm oil, ground crayfish, blended peppers, and the pounded cocoyam paste in small spoonfuls to the boiling stock.",
  "Cover and cook on medium heat. The cocoyam paste will dissolve completely and thicken the soup.",
  "Tear the fresh oha leaves with your hands (do not chop with a knife). Add them to the soup, stir, and simmer for 3 minutes before serving."
];

const TIPS = [
  "Always tear oha leaves with your bare hands instead of chopping them with a knife to preserve their natural flavor and prevent them from darkening."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Oha Soup"
      description="Traditional Igbo soup thickened with cocoyam paste and flavored with fresh oha leaves, offering a unique herbal aroma."
      prepTime="15M"
      cookTime="35M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="oha-soup"
    />
  );
}
