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
  Users,
  GitCommit,
  ArrowRightLeft,
  Database,
  Rocket,
  ClipboardList,
  File,
  FilePlus,
  FileCheck,
  FileArchive,
  FileCode,
  FileCog,
  FileDiff,
  FileJson,
  FileKey,
  FileLock,
  FileQuestion,
  FileScan,
  FileSearch,
  FileSync,
} from "lucide-react";

const documentTypes = [
  {
    title: "BRD",
    icon: <Briefcase className="h-8 w-8 mb-4 text-primary" />,
    description: "Business Requirements: Outlines project goals and objectives.",
  },
  {
    title: "PRD",
    icon: <FileText className="h-8 w-8 mb-4 text-primary" />,
    description: "Product Requirements: Defines features and user experience.",
  },
  {
    title: "FRD",
    icon: <FunctionSquare className="h-8 w-8 mb-4 text-primary" />,
    description: "Functional Requirements: Details specific system behaviors.",
  },
  {
    title: "TDD",
    icon: <GitBranchPlus className="h-8 w-8 mb-4 text-primary" />,
    description: "Technical Design: Describes architecture and solutions.",
  },
  {
    title: "Business Case",
    icon: <Lightbulb className="h-8 w-8 mb-4 text-primary" />,
    description: "Feasibility: Analyzes project viability, costs, and benefits.",
  },
  {
    title: "Gap Analysis",
    icon: <Scaling className="h-8 w-8 mb-4 text-primary" />,
    description: "Identifies differences between current and target states.",
  },
  {
    title: "Doc 7",
    icon: <Users className="h-8 w-8 mb-4 text-primary" />,
    description: "Describes features from an end-user perspective.",
  },
  {
    title: "Doc 8",
    icon: <GitCommit className="h-8 w-8 mb-4 text-primary" />,
    description: "Details user interactions to achieve a specific goal.",
  },
  {
    title: "Doc 9",
    icon: <ArrowRightLeft className="h-8 w-8 mb-4 text-primary" />,
    description: "Maps and traces requirements through the project lifecycle.",
  },
  {
    title: "Doc 10",
    icon: <Database className="h-8 w-8 mb-4 text-primary" />,
    description: "High-level design and architecture of the system.",
  },
  {
    title: "Doc 11",
    icon: <Rocket className="h-8 w-8 mb-4 text-primary" />,
    description: "Summarizes new features and fixes in a release.",
  },
  {
    title: "Doc 12",
    icon: <ClipboardList className="h-8 w-8 mb-4 text-primary" />,
    description: "Outlines the strategy for testing and quality assurance.",
  },
  {
    title: "Doc 13",
    icon: <File className="h-8 w-8 mb-4 text-primary" />,
    description: "A standard document placeholder.",
  },
  {
    title: "Doc 14",
    icon: <FilePlus className="h-8 w-8 mb-4 text-primary" />,
    description: "A document with added information.",
  },
  {
    title: "Doc 15",
    icon: <FileCheck className="h-8 w-8 mb-4 text-primary" />,
    description: "A document that has been verified.",
  },
  {
    title: "Doc 16",
    icon: <FileArchive className="h-8 w-8 mb-4 text-primary" />,
    description: "An archived document.",
  },
  {
    title: "Doc 17",
    icon: <FileCode className="h-8 w-8 mb-4 text-primary" />,
    description: "A document containing code.",
  },
  {
    title: "Doc 18",
    icon: <FileCog className="h-8 w-8 mb-4 text-primary" />,
    description: "A document with configuration settings.",
  },
  {
    title: "Doc 19",
    icon: <FileDiff className="h-8 w-8 mb-4 text-primary" />,
    description: "A document showing differences.",
  },
  {
    title: "Doc 20",
    icon: <FileJson className="h-8 w-8 mb-4 text-primary" />,
    description: "A document in JSON format.",
  },
  {
    title: "Doc 21",
    icon: <FileKey className="h-8 w-8 mb-4 text-primary" />,
    description: "A document related to security keys.",
  },
  {
    title: "Doc 22",
    icon: <FileLock className="h-8 w-8 mb-4 text-primary" />,
    description: "A locked or secure document.",
  },
  {
    title: "Doc 23",
    icon: <FileQuestion className="h-8 w-8 mb-4 text-primary" />,
    description: "A document with questions or help.",
  },
  {
    title: "Doc 24",
    icon: <FileScan className="h-8 w-8 mb-4 text-primary" />,
    description: "A document that has been scanned.",
  },
  {
    title: "Doc 25",
    icon: <FileSearch className="h-8 w-8 mb-4 text-primary" />,
    description: "A document used for search purposes.",
  },
  {
    title: "Doc 26",
    icon: <FileSync className="h-8 w-8 mb-4 text-primary" />,
    description: "A document that is being synchronized.",
  },
  {
    title: "Doc 27",
    icon: <Briefcase className="h-8 w-8 mb-4 text-primary" />,
    description: "Another business-related document.",
  },
];

export default function DocumentsPage() {
  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Generate Documents</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Select a document type to begin generating with your data.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documentTypes.map((doc) => (
          <Card
            key={doc.title}
            className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            {doc.icon}
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2 flex-1">
              <CardDescription>{doc.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
