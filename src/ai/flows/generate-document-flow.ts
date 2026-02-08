'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateDocumentInputSchema = z.object({
    documentType: z.string().describe('The type of document to generate (e.g., BRD, PRD, FRD, TDD).'),
    data: z.string().describe('The data to base the document on, typically parsed CSV or analysis results.'),
    fileName: z.string().optional().describe('The name of the file being analyzed.'),
});

const GenerateDocumentOutputSchema = z.object({
    content: z.string().describe('The generated document content in Markdown format.'),
});

export type GenerateDocumentInput = z.infer<typeof GenerateDocumentInputSchema>;
export type GenerateDocumentOutput = z.infer<typeof GenerateDocumentOutputSchema>;

export async function generateDocument(input: GenerateDocumentInput): Promise<GenerateDocumentOutput> {
    return generateDocumentFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateDocumentPrompt',
    input: { schema: GenerateDocumentInputSchema },
    output: { schema: GenerateDocumentOutputSchema },
    prompt: `You are an expert business analyst and technical writer.
  Generate a professional **{{documentType}}** based on the following data:
  
  File Name: {{fileName}}
  Data: {{data}}
  
  # Instructions
  - The document should be comprehensive and strictly follow industry standards for a {{documentType}}.
  - Use the provided data to infer requirements, context, and business goals.
  - If the data appears to be sales data, derive insights that would justify the system or feature being described.
  
  {{#if (equals documentType "BRD")}}
  # BRD Structure
  Please strictly follow this structure for the Business Requirements Document:
  1. Document Control (Version, Date, Author, Description)
  2. Purpose of the Document
  3. Business Background
  4. Business Objectives (Analyze sales performance, identify profitable products, etc.)
  5. Scope (In-Scope, Out-of-Scope)
  6. Stakeholders (Business Owner, Sales Manager, etc.)
  7. Data Sources (Orders Dataset, Order Details Dataset) - details inferred from data
  8. Functional Requirements (Data Integration, Sales Analysis, Profit Analysis, Customer Analysis, Product Analysis, Payment Mode Analysis, Reporting)
  9. Non-Functional Requirements (Performance, Security, Usability, Scalability)
  10. Assumptions
  11. Constraints
  12. Risks
  13. Success Metrics
  14. Approval
  {{/if}}

  - Format the output in clean Markdown.
  `,
});

const generateDocumentFlow = ai.defineFlow(
    {
        name: 'generateDocumentFlow',
        inputSchema: GenerateDocumentInputSchema,
        outputSchema: GenerateDocumentOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!; // Genkit prompts return objects matching outputSchema, usually
    }
);
