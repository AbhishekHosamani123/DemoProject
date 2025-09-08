
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChevronLeft,
  Briefcase,
  TrendingUp,
  Target,
  FileText,
  Rocket,
  Megaphone,
  UserCheck,
  ClipboardList,
  BarChart2,
  Lightbulb,
  GitBranchPlus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const presentationTemplates = [
  {
    title: "Sales Strategy",
    icon: <Briefcase className="h-8 w-8 mb-4 text-primary" />,
    description: "Decks for outlining sales strategies and targets.",
    href: "#",
  },
  {
    title: "Financial Review",
    icon: <TrendingUp className="h-8 w-8 mb-4 text-primary" />,
    description: "Presentations for financial performance reviews.",
    href: "#",
  },
  {
    title: "Product Launch",
    icon: <Rocket className="h-8 w-8 mb-4 text-primary" />,
    description: "Everything you need to launch a new product.",
    href: "#",
  },
  {
    title: "Marketing Campaign",
    icon: <Megaphone className="h-8 w-8 mb-4 text-primary" />,
    description: "Present your next big marketing campaign.",
    href: "#",
  },
  {
    title: "Business Proposal",
    icon: <FileText className="h-8 w-8 mb-4 text-primary" />,
    description: "Propose a new business idea or project.",
    href: "#",
  },
  {
    title: "Project Update",
    icon: <ClipboardList className="h-8 w-8 mb-4 text-primary" />,
    description: "Share progress and updates on current projects.",
    href: "#",
  },
  {
    title: "Training Manual",
    icon: <UserCheck className="h-8 w-8 mb-4 text-primary" />,
    description: "Create training materials for your team.",
    href: "#",
  },
  {
    title: "Company Goals",
    icon: <Target className="h-8 w-8 mb-4 text-primary" />,
    description: "Outline your company's goals and objectives.",
    href: "#",
  },
  {
    title: "Data Insights",
    icon: <BarChart2 className="h-8 w-8 mb-4 text-primary" />,
    description: "Present key insights from your data.",
    href: "#",
  },
  {
    title: "New Ideas",
    icon: <Lightbulb className="h-8 w-8 mb-4 text-primary" />,
    description: "Pitch new and innovative ideas.",
    href: "#",
  },
  {
    title: "Technical Plan",
    icon: <GitBranchPlus className="h-8 w-8 mb-4 text-primary" />,
    description: "Detail a technical implementation plan.",
    href: "#",
  },
  {
    title: "Custom PPT",
    icon: <Settings className="h-8 w-8 mb-4 text-primary" />,
    description: "Create a custom presentation from scratch.",
    href: "#",
  },
];

export default function SingleTopicPage() {
  const router = useRouter();

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Single Topic Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a template to generate your presentation.
        </p>
      </div>
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          className="bg-yellow-400 text-black hover:bg-yellow-500"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {presentationTemplates.map((template) => (
          <Link href={template.href} key={template.title} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full">
              {template.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <CardDescription>{template.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
