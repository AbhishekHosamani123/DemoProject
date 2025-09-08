import {
  Card,
  CardContent,
} from "@/components/ui/card";

const documentTypes = [
  "BRD",
  "PRD",
  "FRD",
  "TDD",
  "Business Case & Feasibility",
  "Gap Analysis Report",
  "User Stories",
  "Use Cases",
  "Requirements Traceability Matrix",
  "System Design Document",
  "Release Notes",
  "Test Plan",
];

export default function DocumentsPage() {
  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Documents</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {documentTypes.map((docType, index) => (
          <Card
            key={index}
            className="group relative flex items-center justify-center text-center p-8 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 aspect-square"
          >
            <CardContent className="p-0">
              <p className="font-semibold text-lg">{docType}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
