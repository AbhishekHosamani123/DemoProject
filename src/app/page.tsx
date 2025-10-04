"use client";

import { useEffect } from "react";
import type ScrollReveal from "scrollreveal";

import Header from "@/components/header";
import HomeSection from "@/components/home-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ScrollUp from "@/components/scroll-up";

export default function Home() {
  useEffect(() => {
    const loadScrollReveal = async () => {
      const ScrollRevealModule = (await import("scrollreveal")).default;
      const sr: ScrollReveal.ScrollRevealObject = ScrollRevealModule({
        origin: "top",
        distance: "60px",
        duration: 2500,
        delay: 400,
      });

      sr.reveal(`.home-perfil, .contact-mail`, { origin: "right" });
      sr.reveal(
        `.home-name, .home-info, .about-container .section-title-1, .about-info, .contact-social, .contact-data`,
        { origin: "left" }
      );
      sr.reveal(`.services-card`, { interval: 100 });
    };

    loadScrollReveal();
  }, []);

  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}
