import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GoogleDriveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m11.25 10.5-3 5.25"></path>
    <path d="m15.75 10.5-3 5.25"></path>
    <path d="m11.25 15.75 3-5.25"></path>
    <path d="m15.75 15.75 3-5.25"></path>
  </svg>
);

const AwsS3Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export function CloudConnect() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Connect Cloud Source</CardTitle>
        <CardDescription>Link your cloud storage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start" disabled>
            <GoogleDriveIcon />
            Connect Google Drive
          </Button>
          <Button variant="outline" className="w-full justify-start" disabled>
            <AwsS3Icon />
            Connect AWS S3
          </Button>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              More coming soon
            </span>
            <Separator className="flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
