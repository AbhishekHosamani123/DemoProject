import { Linkedin, Github, Dribbble } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container text-center grid gap-y-8">
        <div>
          <h1 className="text-2xl font-semibold">INERA</h1>
          <span className="text-sm">Frontend Developer</span>
        </div>

        <div className="flex justify-center gap-x-6">
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            className="text-primary-foreground hover:text-accent"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/"
            target="_blank"
            className="text-primary-foreground hover:text-accent"
          >
            <Github />
          </Link>
          <Link
            href="https://dribbble.com/"
            target="_blank"
            className="text-primary-foreground hover:text-accent"
          >
            <Dribbble />
          </Link>
        </div>

        <span className="text-sm text-center">
          &#169; INERA. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
