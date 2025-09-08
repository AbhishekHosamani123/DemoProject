"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  File,
  Files,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const presentationTypes = [
  {
    title: "Single Topic Presentation",
    icon: <File className="h-10 w-10 mb-4 text-primary" />,
    description:
      "Generate a presentation focusing on a single topic from your data.",
    href: "/analytics/ppt/single-topic",
  },
  {
    title: "Multiple Topics Presentation",
    icon: <Files className="h-10 w-10 mb-4 text-primary" />,
    description: "Create a comprehensive presentation covering multiple topics.",
    href: "/analytics/ppt/multiple-topics",
  },
  {
    title: "Customized Topics Presentation",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    description:
      "Tailor a presentation with specific topics and custom insights.",
    href: "#",
  },
];

export default function PptPage() {
  const router = useRouter();

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Presentations</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a presentation type to get started.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {presentationTypes.map((type) => (
          <Link href={type.href} key={type.title} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 w-full">
              {type.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
