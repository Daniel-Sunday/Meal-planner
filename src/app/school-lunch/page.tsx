import type { Metadata } from "next";
import SchoolLunchClient from "./school-lunch-client";

export const metadata: Metadata = {
  title: "School Lunchbox Planner | Chop Chop 🇳🇬",
  description: "Plan school lunchboxes that kids love, stay fresh at room temperature, and fit within school break schedules.",
  openGraph: {
    title: "School Lunchbox Planner | Chop Chop 🇳🇬",
    description: "Plan school lunchboxes that kids love and stay fresh at room temperature.",
    url: "https://chopchop-mealplanner.vercel.app/school-lunch",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "School Lunchbox Planner | Chop Chop 🇳🇬",
    description: "Plan school lunchboxes that kids love and stay fresh at room temperature."
  }
};

export default function Page() {
  return <SchoolLunchClient />;
}
