import type { Metadata } from "next";
import KidsClient from "./kids-client";

export const metadata: Metadata = {
  title: "Kids' Corner | Chop Chop 🇳🇬",
  description: "Explore kid-friendly West African meal suggestions, toddler nutrition guides, and portion options designed specifically for children.",
  openGraph: {
    title: "Kids' Corner | Chop Chop 🇳🇬",
    description: "Explore kid-friendly West African meal suggestions and toddler nutrition guides.",
    url: "https://chopchop-mealplanner.vercel.app/kids",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids' Corner | Chop Chop 🇳🇬",
    description: "Explore kid-friendly West African meal suggestions and toddler nutrition guides."
  }
};

export default function Page() {
  return <KidsClient />;
}
