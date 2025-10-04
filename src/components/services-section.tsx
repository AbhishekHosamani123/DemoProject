import { Award, Code, PenTool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Award,
    title: "UI/UX Design",
    description: "Service that provides the best quality and at the request of the client, with professional work and customer support."
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Service that provides the best quality and at the request of the client, with professional work and customer support."
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Service that provides the best quality and at the request of the client, with professional work and customer support."
  }
];

const ServicesSection = () => {
  return (
    <section className="section container" id="services">
      <h2 className="section__title">
        <span>Services</span>
      </h2>

      <div className="services-container grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="services-card text-center bg-card dark:bg-card">
            <CardHeader>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon size={32} />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
