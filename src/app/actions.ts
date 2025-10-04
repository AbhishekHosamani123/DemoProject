
"use server";

import {
  generateDataInsights,
  type GenerateDataInsightsOutput,
} from "@/ai/flows/generate-data-insights";
import {
  classifyCompany,
  type ClassifyCompanyInput,
  type ClassifyCompanyOutput,
} from "@/ai/flows/classify-company-flow";

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
