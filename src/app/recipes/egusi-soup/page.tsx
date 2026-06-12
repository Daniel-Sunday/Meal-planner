import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Nigerian Egusi Soup Recipe | Chop Chop 🇳🇬",
  description: "Cook perfect lump-style Egusi Soup. Learn the frying method to get soft, tasty melon crumbs, clean prep guidelines, and combinations with swallows.",
  openGraph: {
    title: "Nigerian Egusi Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook perfect lump-style Egusi Soup with our step-by-step frying method.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/egusi-soup",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Egusi Soup Recipe | Chop Chop 🇳🇬",
    description: "Cook perfect lump-style Egusi Soup with our step-by-step frying method."
  }
};

const INGREDIENTS = [
  "1 kg Beef / stewing beef",
  "500 g Egusi (melon seeds), ground",
  "2 bunches Spinach / ugwu, chopped",
  "1 litre Vegetable / palm oil",
  "1 pack Seasoning cubes",
  "6 pcs Scotch bonnet peppers",
  "2 bulbs Onions",
  "500 g Smoked fish / tilapia",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Season beef with onions, seasoning cubes, and salt. Boil until tender, keeping the stock. Clean and break smoked fish into chunks.",
  "Mix the ground egusi seeds with warm water or meat stock in a bowl to form a thick, smooth paste.",
  "Heat palm oil in a pot, fry chopped onions, then add the egusi paste in small balls. Stir fry on medium heat for 10-15 minutes until crumbly.",
  "Pour in the beef stock, beef pieces, smoked fish, and blended peppers. Simmer on low-medium heat for 15 minutes, stirring occasionally.",
  "Add the chopped spinach or ugwu leaves. Stir gently and allow to simmer for 3-5 minutes. Serve with Eba or Pounded Yam."
];

const TIPS = [
  "Frying the egusi paste slowly in palm oil is the secret to developing those beautiful, soft crumbs that give the soup its distinct texture."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Egusi Soup"
      description="Classic melon seed soup cooked with palm oil, fresh leafy greens, and assorted meats, best paired with garri or pounded yam."
      prepTime="15M"
      cookTime="40M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="egusi-soup"
    />
  );
}
