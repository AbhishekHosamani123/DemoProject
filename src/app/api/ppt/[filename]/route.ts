import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const filename = (await params).filename;

    // Security check: unexpected filenames
    if (!filename || filename.includes("..") || !filename.endsWith(".pptx")) {
        return new NextResponse("Invalid filename", { status: 400 });
    }

    const allowedFiles = ["ppt1.pptx", "ppt2.pptx"];
    if (!allowedFiles.includes(filename)) {
        return new NextResponse("File not found", { status: 404 });
    }

    const filePath = path.join(process.cwd(), "Data Set", "PPT", filename);

    try {
        if (!fs.existsSync(filePath)) {
            return new NextResponse("File not found on server", { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);

        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        headers.set("Content-Disposition", `attachment; filename="${filename}"`);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Error reading PPT file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
