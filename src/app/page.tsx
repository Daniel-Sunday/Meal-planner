import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
  description: "Tell us what you love to eat and we'll plan every week's meals — breakfast, lunch & dinner. Built for West African households.",
  openGraph: {
    title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
    description: "Tell us what you love to eat and we'll plan every week's meals.",
    url: "https://chopchop-mealplanner.vercel.app",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
    description: "Tell us what you love to eat and we'll plan every week's meals."
  }
};

export default function Page() {
  return <HomeClient />;
}
