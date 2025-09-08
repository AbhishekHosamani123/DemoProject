
"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/app/app-shell";
import { Chatbot } from "@/components/app/chatbot";
import { usePathname } from "next/navigation";

const metadata: Metadata = {
  title: "INERA Navigator",
  description: "Generate insights from your business data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const backgroundVideo = pathname === "/" ? "/background-video.mp4" : "/background-video-2.mp4";

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <video
          key={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-screen h-screen object-cover -z-50"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <AppShell>
          <div className="relative flex-1">
            {children}
          </div>
        </AppShell>
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
