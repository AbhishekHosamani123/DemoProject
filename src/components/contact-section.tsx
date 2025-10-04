import { MailOpen, MessageSquare, Linkedin, Github, Dribbble } from 'lucide-react';
import Link from 'next/link';

const ContactSection = () => {
  return (
    <section className="section container" id="contact">
      <h2 className="section__title-1">
        <span>Contact Me</span>
      </h2>

      <div className="contact-container grid md:grid-cols-2 gap-12">
        <div className="contact-mail">
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">Talk to me</h3>

          <div className="contact-info grid gap-6">
            <div className="contact-data flex items-center gap-2">
              <MailOpen className="w-5 h-5 text-primary" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Email</h4>
                <span className="text-sm">user@email.com</span>
              </div>
            </div>
            <div className="contact-data flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Messenger</h4>
                <span className="text-sm">@inera-user</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-social">
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">Social Media</h3>

          <div className="contact-social-area flex justify-center gap-6">
            <div className="contact-social-data flex flex-col items-center">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Linkedin size={24} />
                </Link>
                <span className="text-xs mt-1">@inera-social</span>
            </div>
            <div className="contact-social-data flex flex-col items-center">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Github size={24} />
                </Link>
                <span className="text-xs mt-1">@inera-social</span>
            </div>
            <div className="contact-social-data flex flex-col items-center">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Dribbble size={24} />
                </Link>
                <span className="text-xs mt-1">@inera-social</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
