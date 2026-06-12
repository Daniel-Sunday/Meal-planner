import type { Metadata } from "next";
import RecipeTemplate from "../../../components/recipe-template";

export const metadata: Metadata = {
  title: "Nigerian Moi Moi Recipe (Steamed Bean Pudding) | Chop Chop 🇳🇬",
  description: "Cook light and fluffy Nigerian Moi Moi. Step-by-step peeling, blending, oil ratios, boiled egg fillings, and pot steaming methods.",
  openGraph: {
    title: "Nigerian Moi Moi Recipe (Steamed Bean Pudding) | Chop Chop 🇳🇬",
    description: "Cook light and fluffy Nigerian Moi Moi with egg fillings using our family recipe.",
    url: "https://chopchop-mealplanner.vercel.app/recipes/moi-moi",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Moi Moi Recipe (Steamed Bean Pudding) | Chop Chop 🇳🇬",
    description: "Cook light and fluffy Nigerian Moi Moi with egg fillings using our family recipe."
  }
};

const INGREDIENTS = [
  "1 kg Beans (peeled and washed)",
  "6 pcs Scotch bonnet peppers",
  "4 pcs Onions",
  "4 pcs Fresh pepper (tatashe)",
  "1 pack Seasoning cubes",
  "12 pcs Eggs (hard-boiled, sliced)",
  "1 litre Vegetable / palm oil",
  "Salt to taste"
];

const INSTRUCTIONS = [
  "Blend the peeled beans, onions, tatashe, and scotch bonnet peppers with a little water until completely smooth.",
  "Pour the batter into a bowl, then stir in oil, seasoning cubes, salt, and a little warm water to create a pancake-like batter.",
  "Grease your steaming containers (foil cups, ramekins, or traditional leaves) with a little oil.",
  "Pour the batter into the containers, place a slice of hard-boiled egg in the center of each, and seal tightly.",
  "Steam in a pot with a shallow water level (cushioned at the bottom) for 45-50 minutes until the pudding sets firm."
];

const TIPS = [
  "Whisking the bean batter vigorously for 3-5 minutes before steaming incorporates air, ensuring your Moi Moi turns out light, fluffy, and tender."
];

export default function Page() {
  return (
    <RecipeTemplate
      title="Moi Moi"
      description="A delicious savory steamed bean pudding made from blended peeled beans, sweet peppers, and onions, stuffed with boiled eggs."
      prepTime="20M"
      cookTime="50M"
      servings={4}
      cuisine="Nigerian"
      ingredients={INGREDIENTS}
      instructions={INSTRUCTIONS}
      tips={TIPS}
      slug="moi-moi"
    />
  );
}
