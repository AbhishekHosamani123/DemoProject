import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-perfil');

  return (
    <section className="section container" id="about">
      <h2 className="section__title-1">
        <span>About Me</span>
      </h2>

      <div className="about-container grid md:grid-cols-2 gap-12 items-center">
        <div className="about-perfil text-center">
          {aboutImage && (
             <Image
             src={aboutImage.imageUrl}
             width={250}
             height={400}
             alt="About me"
             className="mx-auto rounded-lg"
             data-ai-hint={aboutImage.imageHint}
           />
          )}
        </div>

        <div className="about-info grid gap-y-8">
          <div className="about-description">
            <p>
              Front-end developer, I create web pages with UI / UX user
              interface, I have years of experience and many clients are happy
              with the work carried out.
            </p>
          </div>

          <div className="about-data flex justify-between text-center">
            <div>
              <h3 className="text-xl font-semibold text-foreground">10+</h3>
              <span className="text-sm">Years of <br/> experience</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">50+</h3>
              <span className="text-sm">Completed <br/> projects</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">24/7</h3>
              <span className="text-sm">Online <br/> support</span>
            </div>
          </div>
          <Button>Contact Me</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
