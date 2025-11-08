import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Short Prompt Generator",
  description: "Generate short, viral Hindi/Hinglish video prompts",
  metadataBase: new URL("https://agentic-a1673fc0.vercel.app")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
