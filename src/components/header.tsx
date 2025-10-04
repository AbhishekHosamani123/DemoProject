"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, LayoutGrid, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    const initialTheme = savedTheme === "dark";
    setIsDarkMode(initialTheme);
    document.body.classList.toggle("dark", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.body.classList.toggle("dark", newTheme);
    localStorage.setItem("selected-theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY >= 50);

      const sections = navLinks.map(link => document.querySelector(link.href) as HTMLElement).filter(Boolean);
      
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 58;
          const sectionId = `#${current.getAttribute('id')}`;
          
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            setActiveLink(sectionId);
          }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-background transition-shadow duration-300 ${hasScrolled ? "shadow-md dark:shadow-gray-800" : ""}`}>
      <nav className="container h-16 flex justify-between items-center">
        <Link href="#" className="text-foreground font-semibold text-lg hover:text-primary">
          INERA
        </Link>

        <div className={`fixed top-0 -right-full bg-background h-full w-full pt-24 px-8 md:px-0 md:pt-0 md:static md:w-auto md:h-auto md:bg-transparent transition-all duration-300 ${isMenuOpen ? "!right-0" : ""}`}>
          <ul className="flex flex-col text-center gap-y-8 md:flex-row md:gap-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-foreground font-medium hover:text-primary transition-colors ${activeLink === link.href ? "text-primary" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="absolute top-4 right-6 text-2xl cursor-pointer md:hidden" onClick={() => setIsMenuOpen(false)}>
            <X />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {isDarkMode ? (
            <Sun onClick={toggleTheme} className="cursor-pointer hover:text-primary" />
          ) : (
            <Moon onClick={toggleTheme} className="cursor-pointer hover:text-primary" />
          )}
          <div className="text-2xl cursor-pointer md:hidden" onClick={() => setIsMenuOpen(true)}>
            <LayoutGrid />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
