
'use server';

/**
 * @fileOverview An AI agent for classifying a company into a sector, domain, and industry.
 *
 * - classifyCompany - A function that handles the company classification process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sectorData } from '@/lib/content/sector-data';

export async function classifyCompany(input: any): Promise<any> {
    const ChatMessageSchema = z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    });

    const ClassifyCompanyInputSchema = z.object({
      businessDescription: z.string().optional().describe("User's initial description of their business."),
      conversation: z.array(ChatMessageSchema).describe("The history of the conversation so far."),
    });
    
    const ClassifyCompanyOutputSchema = z.object({
      response: z.string().describe("The chatbot's next response or question to the user."),
      classification: z.object({
        sector: z.string().optional(),
        domain: z.string().optional(),
        industry: z.string().optional(),
        subIndustry: z.string().optional(),
      }).optional().describe("The final classification if determined."),
      isComplete: z.boolean().describe("Set to true only when the classification is complete and confirmed by the user."),
    });

    const classificationPromptText = `You are an expert AI assistant designed to help users classify their business into a Sector, Domain, and Industry.
    Your goal is to have a natural conversation, asking one simple, 'baby-level' question at a time to narrow down the user's business category.
    You have been provided with a structured JSON object containing all possible classifications. Do not use any information outside of this data.

    Available Classifications:
    ${JSON.stringify(sectorData, null, 2)}

    Conversation Flow:
    1. Start by asking what the user's business does.
    2. Based on their answer, ask a simple clarifying question to determine the SECTOR. Your questions should be very simple (e.g., "Does your business work with natural resources like farming or mining, or does it make products in a factory?").
    3. Once the sector is clear, ask another simple question to determine the DOMAIN.
    4. Once the domain is clear, ask a question to determine the INDUSTRY.
    5. After you have a likely Sector, Domain, and Industry, ask the user to provide a sub-industry if it applies.
    6. Finally, confirm your understanding with the user. Your question must be EXACTLY: "Based on our conversation, I've classified your business as [Sector Name] -> [Domain Name] -> [Industry Name]. Should I proceed with this classification?"
    7. If the user confirms ("yes", "proceed", "correct", etc.), set "isComplete" to true in your response and set the final classification details. Your response should be a simple confirmation like "Great! I have saved this classification."
    8. If the user says no or wants to make a change, ask them what needs to be clarified. You can try to re-classify up to two times. If it's still not right after two attempts, respond with: "I seem to be having trouble. Could you please try our manual setup process? I can guide you there if you'd like."

    Current Conversation:
    {{#each conversation}}
      {{role}}: {{content}}
    {{/each}}
    `;

    const classificationPrompt = ai.definePrompt({
        name: 'classifyCompanyPrompt',
        input: { schema: ClassifyCompanyInputSchema },
        output: { schema: ClassifyCompanyOutputSchema },
        prompt: classificationPromptText,
        config: {
          temperature: 0.3,
        }
    });

    const classifyCompanyFlow = ai.defineFlow(
      {
        name: 'classifyCompanyFlow',
        inputSchema: ClassifyCompanyInputSchema,
        outputSchema: ClassifyCompanyOutputSchema,
      },
      async (flowInput) => {
        const { output } = await classificationPrompt(flowInput);
        if (!output) {
            throw new Error("Failed to get a response from the model.");
        }
        return output;
      }
    );

    return await classifyCompanyFlow(input);
}
