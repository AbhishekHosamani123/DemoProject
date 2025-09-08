"use server";

import {
  generateDataInsights,
  type GenerateDataInsightsOutput,
} from "@/ai/flows/generate-data-insights";

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
