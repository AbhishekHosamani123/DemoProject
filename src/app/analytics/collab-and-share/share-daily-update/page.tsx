
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, BellRing, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const latestUpdates = [
    {
      id: 'sebi-lodr',
      title: "SEBI (LODR) Second Amendment Regulations, 2023",
      summary: "The SEBI (Listing Obligations and Disclosure Requirements) (Second Amendment) Regulations, 2023, have been enacted, effective from June 14, 2023. This update introduces mandatory ESG reporting for the top 1000 listed companies by market capitalization, requiring detailed disclosures on environmental, social, and governance metrics. All relevant internal teams must align their reporting frameworks immediately to ensure compliance by the next filing cycle."
    },
    {
      id: 'dpdp-act',
      title: "Digital Personal Data Protection Act, 2023",
      summary: "The Digital Personal Data Protection Act, 2023 has received presidential assent. Key requirements include purpose limitation, data minimization, and robust consent mechanisms. Organizations must prepare for phased implementation, appoint Data Protection Officers, and conduct impact assessments."
    },
    {
      id: 'gst-update',
      title: "GST Council Recommends New E-Invoicing Threshold",
      summary: "The GST Council has recommended lowering the e-invoicing threshold to ₹5 crore from the current ₹10 crore, effective from the next financial year. This move aims to curb tax evasion and broaden the tax base. Businesses within this turnover bracket should begin preparing their ERP systems for compliance."
    },
    {
      id: 'fdi-ecommerce',
      title: "Updated FEMA Guidelines on E-commerce FDI",
      summary: "The Foreign Exchange Management Act (FEMA) guidelines for foreign direct investment in the e-commerce sector have been updated. The new rules clarify inventory-based models and marketplace regulations, impacting how foreign-invested e-commerce platforms operate in India."
    },
    {
      id: 'it-outsourcing-rbi',
      title: "RBI Master Direction on IT Outsourcing",
      summary: "The Reserve Bank of India has issued a Master Direction on IT Outsourcing for regulated entities, effective October 1, 2023. This directive establishes a comprehensive framework for managing risks associated with outsourcing IT services, requiring stricter due diligence and continuous monitoring of third-party vendors."
    },
    {
      id: 'faceless-assessment',
      title: "Faceless Assessment Scheme for Tax Audits",
      summary: "The government has rolled out the Faceless Assessment Scheme for all income tax audits. This initiative aims to increase transparency and reduce physical interaction between taxpayers and tax authorities, with all communication now happening electronically."
    },
    {
      id: 'plastic-waste-rules',
      title: "Plastic Waste Management (Amendment) Rules, 2023",
      summary: "The Central Government has amended the Plastic Waste Management Rules, banning specific single-use plastic items to curb pollution. The amendment specifies a list of prohibited items and outlines extended producer responsibility (EPR) targets for plastic packaging."
    },
    {
      id: 'new-labour-codes',
      title: "New Codes on Wages and Social Security",
      summary: "The Ministry of Labour & Employment is implementing new codes on wages and social security. These codes will require a comprehensive review of salary structures, including changes to the definition of 'wages', which will impact provident fund contributions and gratuity calculations."
    }
];

export default function ShareDailyUpdatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [emailIds, setEmailIds] = useState("");
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);

  const handleAlertClick = (alertId: string) => {
    setActiveAlertId(prevId => prevId === alertId ? null : alertId);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlertId) {
        toast({
            variant: "destructive",
            title: "No alert selected",
            description: "Please select an alert to share.",
        });
        return;
    }
    if (!phoneNumbers.trim() && !emailIds.trim()) {
        toast({
            variant: "destructive",
            title: "No recipients",
            description: "Please enter at least one phone number or email.",
        });
        return;
    }
    toast({
        title: "Notification Sent",
        description: `Your update on "${latestUpdates.find(u => u.id === activeAlertId)?.title}" has been sent.`,
    })
  }
  
  const activeUpdate = latestUpdates.find(update => update.id === activeAlertId);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8 space-y-4">
            {latestUpdates.map(update => (
                 <div 
                    key={update.id}
                    className="cursor-pointer"
                    onClick={() => handleAlertClick(update.id)}
                >
                    <div className={cn(
                        "text-xl font-bold tracking-tight inline-flex items-center gap-4 border-2 rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm shadow-lg transition-all w-full",
                        activeAlertId === update.id ? "border-primary text-primary" : "border-input text-foreground"
                        )}>
                        <BellRing className={cn("h-6 w-6", activeAlertId === update.id && "animate-pulse")} />
                        <span className="font-normal text-muted-foreground">ALERT:</span> {update.title}
                    </div>
                </div>
            ))}
        </div>

        <form onSubmit={handleSubmit}>
            <Card className={cn(
                "bg-card/60 backdrop-blur-sm transition-all duration-500 ease-in-out",
                activeAlertId ? "max-h-[1000px] opacity-100 p-6" : "max-h-0 opacity-0 !p-0 !m-0 border-0"
                )}
            >
                {activeUpdate && (
                    <>
                        <CardContent className="space-y-6 p-0">
                            <div className="space-y-4">
                                <Label htmlFor="summary" className="text-xl font-semibold">MAIN SUMMARY BASED UPDATE</Label>
                                
                                <Card className="bg-background/50">
                                    <CardHeader>
                                        <CardTitle>{activeUpdate.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{activeUpdate.summary}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold border-b pb-2">ANALYTICS</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">ADD PHONE NUMBERS</Label>
                                    <Input 
                                        id="phone" 
                                        type="text"
                                        value={phoneNumbers}
                                        onChange={e => setPhoneNumbers(e.target.value)}
                                        placeholder="e.g., +919876543210, +11234567890" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">ADD EMAIL ID</Label>
                                    <Input 
                                        id="email" 
                                        type="email"
                                        value={emailIds}
                                        onChange={e => setEmailIds(e.target.value)}
                                        placeholder="e.g., user1@example.com, user2@example.com" 
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-center pt-8 p-0">
                            <div className="flex gap-4 w-full max-w-sm">
                                <Button type="submit" className="flex-1">
                                    SEND NOTIFICATION
                                </Button>
                                <Button type="button" variant="secondary" className="flex-1">
                                    <Video className="mr-2 h-5 w-5" />
                                    Generate Video
                                </Button>
                            </div>
                        </CardFooter>
                    </>
                )}
            </Card>
        </form>
      </div>
    </div>
  );
}
