
"use client";

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
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function FinancialInfoPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information Saved",
      description: "Company financial and regulatory details have been saved.",
    });
    router.push('/signup/industrialist-admin/setup?completed=financial-info');
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 py-12 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-3xl bg-card/60 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            Step 3: Financial & Other Information
          </CardTitle>
          <CardDescription>
            Provide your company's regulatory and financial details.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <fieldset className="border p-4 rounded-lg space-y-4">
              <legend className="px-2 text-primary font-semibold">Regulatory Registration Numbers</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="reg-jurisdiction">Registration Jurisdiction</Label>
                    <Select>
                        <SelectTrigger id="reg-jurisdiction">
                            <SelectValue placeholder="Select State/Territory" />
                        </SelectTrigger>
                        <SelectContent>
                            {indianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="cin">Corporate Identification Number (CIN)</Label>
                    <Input id="cin" placeholder="21-digit alphanumeric CIN" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="pan">Permanent Account Number (PAN)</Label>
                    <Input id="pan" placeholder="10-digit alphanumeric PAN" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="tan">Tax Deduction and Collection Account Number (TAN)</Label>
                    <Input id="tan" placeholder="10-digit TAN" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gstin">Goods and Services Tax Identification Number (GSTIN)</Label>
                    <Input id="gstin" placeholder="15-digit GSTIN" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pt-reg">Professional Tax Registration Number</Label>
                    <Input id="pt-reg" placeholder="If applicable" />
                </div>
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="px-2 text-primary font-semibold">Financial Details</legend>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="company-capital">What is the capital of the company?</Label>
                        <Input id="company-capital" type="number" placeholder="e.g., 500000" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="total-expenses">What are the total expenses of the company?</Label>
                        <Input id="total-expenses" type="number" placeholder="e.g., 200000" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="annual-revenue">Annual Revenue (Last FY)</Label>
                        <Input id="annual-revenue" type="number" placeholder="e.g., 1000000" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="net-profit">Net Profit (Last FY)</Label>
                        <Input id="net-profit" type="number" placeholder="e.g., 300000" />
                    </div>
                </div>
            </fieldset>
            
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
