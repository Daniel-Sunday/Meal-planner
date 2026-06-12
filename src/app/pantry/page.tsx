import type { Metadata } from "next";
import PantryClient from "./pantry-client";

export const metadata: Metadata = {
  title: "Pantry Inventory | Chop Chop 🇳🇬",
  description: "Track your dry goods, spices, and cooking oils. Set low-stock reminders and automatically deduct available items from your shopping list.",
  openGraph: {
    title: "Pantry Inventory | Chop Chop 🇳🇬",
    description: "Track your dry goods, spices, and cooking oils.",
    url: "https://chopchop-mealplanner.vercel.app/pantry",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantry Inventory | Chop Chop 🇳🇬",
    description: "Track your dry goods, spices, and cooking oils."
  }
};

export default function Page() {
  return <PantryClient />;
}
