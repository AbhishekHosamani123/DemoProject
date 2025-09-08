
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Briefcase,
  FileText,
  FunctionSquare,
  GitBranchPlus,
  Lightbulb,
  Scaling,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const documentTypes = [
  {
    title: "BRD",
    icon: <Briefcase className="h-5 w-5 mb-2 text-primary" />,
    description: "Business Requirements",
    href: "/documents/brd",
  },
  {
    title: "PRD",
    icon: <FileText className="h-5 w-5 mb-2 text-primary" />,
    description: "Product Requirements",
    href: "#",
  },
  {
    title: "FRD",
    icon: <FunctionSquare className="h-5 w-5 mb-2 text-primary" />,
    description: "Functional Requirements",
    href: "#",
  },
  {
    title: "TDD",
    icon: <GitBranchPlus className="h-5 w-5 mb-2 text-primary" />,
    description: "Technical Design",
    href: "#",
  },
  {
    title: "Business Case",
    icon: <Lightbulb className="h-5 w-5 mb-2 text-primary" />,
    description: "Feasibility Analysis",
    href: "#",
  },
  {
    title: "Gap Analysis",
    icon: <Scaling className="h-5 w-5 mb-2 text-primary" />,
    description: "Current vs. Target State",
    href: "#",
  },
  ...Array.from({ length: 21 }, (_, i) => ({
    title: `Doc ${i + 7}`,
    icon: <FileText className="h-5 w-5 mb-2 text-primary" />,
    description: `This is a description for Doc ${i + 7}.`,
    href: "#",
  })),
];

export default function DocumentsPage() {
  const router = useRouter();
  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Generate Documents</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Select a document type to begin generating with your data.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {documentTypes.map((doc) => (
          <Link href={doc.href} key={doc.title} className="flex group">
            <Card className="flex flex-col text-left p-3 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              {doc.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-1 flex-1">
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
