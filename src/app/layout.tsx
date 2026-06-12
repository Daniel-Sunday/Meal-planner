import type { Metadata } from "next";
import ClientLayout from "../components/client-layout";

export const metadata: Metadata = {
  title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
  description: "Tell us what you love to eat and we'll plan every meal for the whole week — breakfast, lunch, and dinner. No more daily 'what will I cook?' stress.",
  openGraph: {
    title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
    description: "Tell us what you love to eat and we'll plan every meal for the whole week — breakfast, lunch, and dinner.",
    url: "https://chopchop-mealplanner.vercel.app",
    siteName: "Chop Chop Meal Planner",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chop Chop 🇳🇬 — Premium African Meal Planner",
    description: "Tell us what you love to eat and we'll plan every meal for the whole week.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: #F5EFE6;
            color: #1A2E0A;
            font-family: 'Figtree', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
