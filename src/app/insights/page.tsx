import type { Metadata } from "next";
import InsightsClient from "./insights-client";

export const metadata: Metadata = {
  title: "Kitchen Insights | Chop Chop 🇳🇬",
  description: "Explore your cuisine diversity, grocery budget trends, and food waste minimization statistics.",
  openGraph: {
    title: "Kitchen Insights | Chop Chop 🇳🇬",
    description: "Explore your cuisine diversity and grocery budget trends.",
    url: "https://chopchop-mealplanner.vercel.app/insights",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Insights | Chop Chop 🇳🇬",
    description: "Explore your cuisine diversity and grocery budget trends."
  }
};

export default function Page() {
  return <InsightsClient />;
}
