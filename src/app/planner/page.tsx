import type { Metadata } from "next";
import PlannerClient from "./planner-client";

export const metadata: Metadata = {
  title: "Your Meal Plan | Chop Chop 🇳🇬",
  description: "View and edit your personal weekly breakfast, lunch, and dinner plans. Shuffle meals, swap meals on tap, and manage your favorites list.",
  openGraph: {
    title: "Your Meal Plan | Chop Chop 🇳🇬",
    description: "View and edit your personal weekly breakfast, lunch, and dinner plans.",
    url: "https://chopchop-mealplanner.vercel.app/planner",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Meal Plan | Chop Chop 🇳🇬",
    description: "View and edit your personal weekly breakfast, lunch, and dinner plans."
  }
};

export default function Page() {
  return <PlannerClient />;
}
