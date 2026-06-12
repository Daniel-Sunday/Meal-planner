import type { Metadata } from "next";
import ShoppingClient from "./shopping-client";

export const metadata: Metadata = {
  title: "Your Ingredients List | Chop Chop 🇳🇬",
  description: "View your dynamically generated grocery list. Scale servings, check off ingredients, and view all items with one click.",
  openGraph: {
    title: "Your Ingredients List | Chop Chop 🇳🇬",
    description: "View your dynamically generated grocery list.",
    url: "https://chopchop-mealplanner.vercel.app/shopping",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Ingredients List | Chop Chop 🇳🇬",
    description: "View your dynamically generated grocery list."
  }
};

export default function Page() {
  return <ShoppingClient />;
}
