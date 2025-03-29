import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Load IBM Plex Mono as our monospace font
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono", // Define CSS variable
});

// Keep Inter as a fallback font (optional, but good practice)
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Define CSS variable

export const metadata: Metadata = {
  title: "Your Name | Full-Stack Developer",
  description: "Portfolio showcasing web, mobile, embedded development, and more. Terminal theme.",
  // Viewport is crucial for responsiveness
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add scroll-smooth for smooth scrolling triggered by navigation
    <html lang="en" className="scroll-smooth">
      {/* Apply fonts via CSS variables, set base styles */}
      <body
        className={`${ibmPlexMono.variable} ${inter.variable} font-mono bg-zinc-900 text-green-400`}
      >
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}