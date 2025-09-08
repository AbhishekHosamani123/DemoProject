
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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const documentTypes = [
  {
    title: "BRD",
    icon: <Briefcase className="h-8 w-8 mb-3 text-primary" />,
    description: "Business Requirements: Outlines project goals and objectives.",
    href: "/documents/brd",
  },
  {
    title: "PRD",
    icon: <FileText className="h-8 w-8 mb-3 text-primary" />,
    description: "Product Requirements: Defines features and user experience.",
    href: "#",
  },
  {
    title: "FRD",
    icon: <FunctionSquare className="h-8 w-8 mb-3 text-primary" />,
    description: "Functional Requirements: Details specific system behaviors.",
    href: "#",
  },
  {
    title: "TDD",
    icon: <GitBranchPlus className="h-8 w-8 mb-3 text-primary" />,
    description: "Technical Design: Describes architecture and solutions.",
    href: "#",
  },
  {
    title: "Business Case",
    icon: <Lightbulb className="h-8 w-8 mb-3 text-primary" />,
    description: "Feasibility: Analyzes project viability, costs, and benefits.",
    href: "#",
  },
  {
    title: "Gap Analysis",
    icon: <Scaling className="h-8 w-8 mb-3 text-primary" />,
    description: "Identifies differences between current and target states.",
    href: "#",
  },
  ...Array.from({ length: 21 }, (_, i) => ({
    title: `Doc ${i + 7}`,
    icon: <FileText className="h-8 w-8 mb-3 text-primary" />,
    description: `This is a description for Doc ${i + 7}.`,
    href: "#",
  })),
];

export default function DocumentsPage() {
  const router = useRouter();
  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Generate Documents</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Select a document type to begin generating with your data.
        </p>
      </div>
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {documentTypes.map((doc) => (
          <Link href={doc.href} key={doc.title} className="flex group">
            <Card className="flex flex-col text-left p-4 w-full">
              {doc.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <CardDescription>{doc.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
