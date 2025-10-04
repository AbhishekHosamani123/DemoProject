
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { sectorData, type SectorKey, type DomainKey } from "@/lib/content/sector-data";

const steps = ["Select Sector", "Select Domain", "Select Industry", "Final Review"];

export default function ManualSetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedSector, setSelectedSector] = React.useState<SectorKey | null>(null);
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null);
  const [subIndustry, setSubIndustry] = React.useState("");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 0 && !selectedSector) {
        toast({ variant: 'destructive', title: 'Please select a sector.'});
        return;
      }
      if (currentStep === 1 && !selectedDomain) {
        toast({ variant: 'destructive', title: 'Please select a domain.'});
        return;
      }
       if (currentStep === 2 && !selectedIndustry) {
        toast({ variant: 'destructive', title: 'Please select an industry.'});
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleActivate = () => {
    toast({
        title: "System Activated!",
        description: "Your company profile and dashboard are now configured.",
    });
    router.push('/signup/industrialist-admin/setup?completed=existence-info');
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Select Sector
        return (
          <div className="space-y-4">
            <Label className="text-lg">Step 2: Select Primary Sector</Label>
            <Select onValueChange={(v) => setSelectedSector(v as SectorKey)} value={selectedSector || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sector..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sectorData).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSector && <p className="text-sm text-muted-foreground">{sectorData[selectedSector].definition}</p>}
          </div>
        );
      case 1: // Select Domain
        if (!selectedSector) return null;
        const domains = sectorData[selectedSector].domains;
        return (
          <div className="space-y-4">
            <Label className="text-lg">Step 3: Select Domain</Label>
            <Select onValueChange={setSelectedDomain} value={selectedDomain || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select a domain..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(domains).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{(value as any).name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDomain && <p className="text-sm text-muted-foreground">{(domains as any)[selectedDomain].description}</p>}
          </div>
        );
      case 2: // Select Industry & Sub-Industry
        if (!selectedSector || !selectedDomain) return null;
        const industries = (sectorData[selectedSector].domains as any)[selectedDomain].industries;
        return (
          <div className="space-y-6">
            <div className="space-y-4">
                <Label className="text-lg">Step 3 (cont.): Select Industry</Label>
                <Select onValueChange={setSelectedIndustry} value={selectedIndustry || ""}>
                <SelectTrigger>
                    <SelectValue placeholder="Select an industry..." />
                </SelectTrigger>
                <SelectContent>
                    {industries.map((industry: string) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className="space-y-4">
                <Label htmlFor="sub-industry" className="text-lg">Enter Sub-industry</Label>
                <Input id="sub-industry" value={subIndustry} onChange={(e) => setSubIndustry(e.target.value)} placeholder="e.g., Rice Cultivation" />
            </div>
          </div>
        );
      case 3: // Final Review
        if (!selectedSector || !selectedDomain || !selectedIndustry) return null;
        const sector = sectorData[selectedSector];
        const domain = (sector.domains as any)[selectedDomain];
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-primary">Review Complete Classification Path</h3>
                    <p className="text-muted-foreground">
                        {sector.name} → {domain.name} → {selectedIndustry} {subIndustry && `→ ${subIndustry}`}
                    </p>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-primary">Dashboard Configuration Confirmation</h3>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 text-sm">
                        {sector.dashboardComponents.map((comp, i) => <li key={i}>{comp}</li>)}
                    </ul>
                </div>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={handleBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            Manual Setup: {steps[currentStep]}
          </CardTitle>
          <CardDescription>
            Follow the steps to classify your company.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-end">
          {currentStep < steps.length - 1 ? (
             <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
             </Button>
          ) : (
             <Button onClick={handleActivate} className="bg-green-600 hover:bg-green-700">
                Activate System
             </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
