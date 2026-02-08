
"use server";

import {
  generateDataInsights,
  type GenerateDataInsightsOutput,
} from "@/ai/flows/generate-data-insights";
import {
  classifyCompany,
} from "@/ai/flows/classify-company-flow";
import { z } from "zod";


const ClassifyCompanyInputSchema = z.object({
  businessDescription: z.string().optional(),
  conversation: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
});
export type ClassifyCompanyInput = z.infer<typeof ClassifyCompanyInputSchema>;

const ClassifyCompanyOutputSchema = z.object({
  response: z.string(),
  classification: z.object({
    sector: z.string().optional(),
    domain: z.string().optional(),
    industry: z.string().optional(),
    subIndustry: z.string().optional(),
  }).optional(),
  isComplete: z.boolean(),
});
export type ClassifyCompanyOutput = z.infer<typeof ClassifyCompanyOutputSchema>;

export async function getAIInsights(
  csvData: string,
  fileName?: string
): Promise<GenerateDataInsightsOutput | { error: string }> {
  if (!csvData) {
    return { error: "No data provided." };
  }

  try {
    const insights = await generateDataInsights({
      data: csvData,
      dataFormat: "CSV",
      fileName,
    });
    return insights;
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate insights. Please try again." };
  }
}

export async function getClassifyCompanyResponse(
  input: ClassifyCompanyInput
): Promise<ClassifyCompanyOutput | { error: string }> {
  try {
    const response = await classifyCompany(input);
    return response;
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to get a response from the AI: ${errorMessage}` };
  }
}

import {
  generateDocument,
  type GenerateDocumentInput,
  type GenerateDocumentOutput,
} from "@/ai/flows/generate-document-flow";

import { promises as fs } from 'fs';
import path from 'path';

export async function generateDocumentAction(
  input: GenerateDocumentInput
): Promise<GenerateDocumentOutput | { error: string }> {
  try {
    // Check for predefined templates for "sales data"
    if (input.fileName && input.fileName.toLowerCase().includes("sales data")) {
      const docType = input.documentType.split(" ")[0].toUpperCase(); // Extract BRD, PRD, etc.
      const templatePath = path.join(process.cwd(), 'src', 'templates', 'sales-data', `${docType}.txt`);

      try {
        const content = await fs.readFile(templatePath, 'utf-8');
        return { content };
      } catch (err) {
        console.warn(`Template not found for ${docType}, falling back to AI generation.`, err);
      }
    }

    const document = await generateDocument(input);
    return document;
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate document. Please try again." };
  }
}
