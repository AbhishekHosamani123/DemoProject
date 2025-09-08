
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const auditDetails = [
  {
    title: "Latest Updates",
    content: [
      "SEBI (Listing Obligations and Disclosure Requirements) (Second Amendment) Regulations, 2023, effective from June 14, 2023.",
      "Introduction of mandatory ESG reporting for the top 1000 listed companies by market capitalization.",
      "Updated FEMA guidelines impacting foreign direct investment in the e-commerce sector.",
      "RBI Master Direction on IT Outsourcing for regulated entities, effective October 1, 2023.",
      "Digital Personal Data Protection Act, 2023 - Phased implementation, consent management framework now critical.",
      "GST Council recommendation to implement a new return filing system, GSTR-1, GSTR-2B, and GSTR-3B linkage is now mandatory.",
      "Introduction of the Faceless Assessment Scheme for all income tax audits, minimizing physical interaction with tax authorities.",
    ],
  },
  {
    title: "Company-Specific Rules & Formats",
    content: [
      "All new vendor contracts must now include the updated Data Privacy clause (Ref: CP-2024-V4).",
      "Quarterly internal audit reports must be submitted in the new digital format via the compliance portal by the 5th of the following month.",
      "Approval matrix for financial expenditures above ₹5,00,000 has been revised. Refer to the finance policy document.",
      "Travel & Expense Policy Update (v3.2): International travel now requires pre-approval from the department head.",
      "Mandatory IT security training on phishing prevention to be completed by all employees by Q3 end.",
      "Updated insider trading policy now requires pre-clearance for all trades by designated persons, regardless of value.",
      "All marketing materials must be vetted by the legal department for brand guideline compliance before publication (Ref: MKTG-POL-007).",
    ],
  },
  {
    title: "Laws & Sections",
    content: [
      "Companies Act, 2013: Section 135 - Corporate Social Responsibility (CSR) compliance requires a 2% net profit contribution.",
      "Income Tax Act, 1961: Section 194R - TDS on benefits or perquisites, compliance for all business transactions.",
      "IGST Act, 2017: Section 16 - Clarifications on zero-rated supply for exports.",
      "Environment (Protection) Act, 1986: Adherence to new e-waste management rules for all electronic equipment disposal.",
      "Payment of Gratuity Act, 1972: Ensuring accurate calculation and timely disbursement for all separating employees.",
      "Competition Act, 2002: Section 4 - Prohibition of abuse of dominant position must be monitored in pricing strategies.",
      "Insolvency and Bankruptcy Code, 2016: Monitoring of creditor payment timelines to mitigate risks under the code.",
    ],
  },
  {
    title: "Government Regulations",
    content: [
      "Central Government: Plastic Waste Management (Amendment) Rules, 2023, banning specific single-use plastic items.",
      "State Government (Maharashtra): Professional Tax (PT) filing deadline extended to the 30th of each month.",
      "Ministry of Corporate Affairs (MCA): Mandatory filing of Form DPT-3 for all companies regarding loans and deposits.",
      "Ministry of Labour & Employment: New codes on wages and social security - review of salary structures required.",
      "Ministry of Commerce and Industry: Updated regulations on country of origin declaration for imported goods.",
      "Food Safety and Standards Authority of India (FSSAI): New labeling requirements for packaged food products effective January 1, 2024.",
      "Telecom Regulatory Authority of India (TRAI): Compliance with new regulations on unsolicited commercial communications (UCC).",
    ],
  },
  {
    title: "Compliance & Applicability",
    content: [
      "As a listed entity, all SEBI LODR regulations are fully applicable and must be audited quarterly.",
      "Our manufacturing unit in Pune must adhere to the latest Maharashtra Pollution Control Board (MPCB) emission standards.",
      "Data Protection Bill, 2023: While not yet law, proactive measures for data minimization and consent management are advised.",
      "GDPR: Applicable due to handling of EU customer data; requires regular data protection impact assessments (DPIAs).",
      "ISO 27001 Certification: Annual surveillance audit scheduled for Q4, all departments must be prepared.",
      "POSH (Prevention of Sexual Harassment) Act: Annual report submission to the District Officer is due by January 31.",
      "TDS filings under sections 194C, 194J, and 194I must be completed by the 7th of the subsequent month.",
    ],
  },
];

export default function AuditZonePage() {
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            Compliance Dashboard
          </h1>
        </div>

        <Card className="bg-card/60 backdrop-blur-sm p-6">
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This dashboard displays customized updates and guidelines for your
              company. The content is tailored to your organization's specific
              compliance needs.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {auditDetails.map((category) => (
                <AccordionItem
                  key={category.title}
                  value={category.title}
                >
                  <AccordionTrigger className="text-2xl font-semibold text-primary hover:no-underline">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 list-disc pl-5 py-2">
                      {category.content.map((point, index) => (
                        <li
                          key={index}
                          className="text-base font-normal text-muted-foreground"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
