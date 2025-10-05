
"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppShellContent } from "@/components/app/app-shell-content";
import { Chatbot } from "@/components/app/chatbot";
import { usePathname } from "next/navigation";
import { Montserrat, Roboto } from "next/font/google";
import { ClientTooltipProvider } from "@/components/app/client-tooltip-provider";

const metadata: Metadata = {
  title: "INERA Navigator",
  description: "Generate insights from your business data.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isHomePage = pathname === "/dashboard";
  
  let backgroundVideo: string | null = "/background-video-2.mp4";
  if (isLandingPage) {
    backgroundVideo = null;
  } else if (isHomePage) {
    backgroundVideo = "/background-video.mp4";
  }


  if (isLandingPage) {
     return (
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${montserrat.variable} ${roboto.variable} font-body antialiased bg-background text-foreground`} suppressHydrationWarning>
           <div key={pathname} className="relative flex-1 animate-in fade-in duration-500">
              {children}
            </div>
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} font-body antialiased bg-background text-foreground`} suppressHydrationWarning>
        {backgroundVideo && (
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
        )}
        <ClientTooltipProvider>
            <AppShellContent>
            <div key={pathname} className="relative flex-1 animate-in fade-in duration-500">
                {children}
            </div>
            </AppShellContent>
        </ClientTooltipProvider>
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
