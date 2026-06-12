import type { Metadata } from "next";
import OnboardingClient from "./onboarding-client";

export const metadata: Metadata = {
  title: "Customize Your Plan | Chop Chop 🇳🇬",
  description: "Select your favorite West African and global cuisines and adjust servings to generate your personalized weekly meal planner.",
  openGraph: {
    title: "Customize Your Plan | Chop Chop 🇳🇬",
    description: "Select your favorite cuisines and adjust servings to generate your weekly planner.",
    url: "https://chopchop-mealplanner.vercel.app/onboarding",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Customize Your Plan | Chop Chop 🇳🇬",
    description: "Select your favorite cuisines and adjust servings to generate your weekly planner."
  }
};

export default function Page() {
  return <OnboardingClient />;
}
