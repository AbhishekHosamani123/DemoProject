
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
  csvData: string
): Promise<GenerateDataInsightsOutput | { error: string }> {
  if (!csvData) {
    return { error: "No data provided." };
  }

  try {
    const insights = await generateDataInsights({
      data: csvData,
      dataFormat: "CSV",
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
