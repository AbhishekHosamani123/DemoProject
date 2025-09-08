
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

type ParsedData = Record<string, string>[];

interface DataPreviewProps {
  data: ParsedData;
  headers: string[];
}

const PREVIEW_ROW_COUNT = 10;

export function DataPreview({ data, headers }: DataPreviewProps) {
  const previewData = data.slice(0, PREVIEW_ROW_COUNT);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Preview</CardTitle>
        <CardDescription>
          Showing the first {Math.min(PREVIEW_ROW_COUNT, data.length)} rows of
          your data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="text-white">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-white/10">
                  {headers.map((header) => (
                    <TableCell key={`${rowIndex}-${header}`} className="text-white/80">
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
