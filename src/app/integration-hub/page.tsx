
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TallyPrimeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#E8F5E9"/>
        <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="40" fill="#4CAF50" textAnchor="middle" fontWeight="bold">T</text>
    </svg>
);

const SapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#E3F2FD"/>
        <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="32" fill="#1E88E5" textAnchor="middle" fontWeight="bold">SAP</text>
    </svg>
);

const ZohoIcon = () => (
     <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#FCE4EC"/>
        <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="30" fill="#EC407A" textAnchor="middle" fontWeight="bold">ZOHO</text>
    </svg>
);


const integrations = [
  {
    name: "Tally Prime",
    description: "Sync your accounting data from Tally Prime.",
    icon: <TallyPrimeIcon />,
  },
  {
    name: "SAP",
    description: "Integrate with your SAP ERP system for enterprise data.",
    icon: <SapIcon />,
  },
  {
    name: "Zoho",
    description: "Connect Zoho apps to bring in CRM and finance data.",
    icon: <ZohoIcon />,
  },
];

export default function IntegrationHubPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight inline-block border-2 border-primary rounded-lg px-8 py-3 bg-card/60 backdrop-blur-sm text-primary shadow-lg">
            Integration Hub
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Connect your favorite tools and services to supercharge your analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {integrations.map((integration) => (
            <Card
              key={integration.name}
              className="group bg-card/60 backdrop-blur-sm p-6 text-center border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <CardHeader className="flex-1 flex flex-col items-center p-0">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    {integration.icon}
                </div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription className="mt-2 text-center">
                    {integration.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6">
                <Button className="w-full">
                    Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
