"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Link 
      href="#" 
      className={`fixed right-4 bottom-12 bg-primary text-primary-foreground p-2 rounded-md shadow-lg transition-opacity hover:bg-primary/90 ${isVisible ? "opacity-100" : "opacity-0"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </Link>
  );
};

export default ScrollUp;
