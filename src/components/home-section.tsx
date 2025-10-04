import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from 'next/link';

const HomeSection = () => {
  const homeImage = PlaceHolderImages.find(p => p.id === 'home-perfil');
  
  return (
    <section className="section" id="home">
      <div className="container grid md:grid-cols-2 gap-12 items-center pt-16">
        <div className="home-perfil justify-self-center">
            {homeImage && (
                <Image
                src={homeImage.imageUrl}
                width={250}
                height={400}
                alt="Home profile"
                className="rounded-lg"
                data-ai-hint={homeImage.imageHint}
                />
            )}
        </div>
        <div className="home-info text-center md:text-left">
            <h1 className="home-name text-4xl font-bold text-foreground">INERA</h1>
            <h3 className="text-lg text-muted-foreground mb-4">Frontend Developer</h3>
            <p className="mb-8">
              High level experience in web design and development knowledge,
              producing quality work.
            </p>
            <Link href="#contact">
              <Button>Contact Me</Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
