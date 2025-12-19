'use server';
/**
 * @fileOverview Implements the EngageInContextualBanter flow.
 *
 * - engageInContextualBanter - A function that handles generating responses that are friendly and engaging.
 * - EngageInContextualBanterInput - The input type for the engageInContextualBanter function.
 * - EngageInContextualBanterOutput - The return type for the engageInContextualBanter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EngageInContextualBanterInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
});

export type EngageInContextualBanterInput = z.infer<typeof EngageInContextualBanterInputSchema>;

const EngageInContextualBanterOutputSchema = z.object({
  response: z.string().describe('The AI response.'),
});

export type EngageInContextualBanterOutput = z.infer<typeof EngageInContextualBanterOutputSchema>;

export async function engageInContextualBanter(input: EngageInContextualBanterInput): Promise<EngageInContextualBanterOutput> {
  return engageInContextualBanterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'engageInContextualBanterPrompt',
  input: {schema: EngageInContextualBanterInputSchema},
  output: {schema: EngageInContextualBanterOutputSchema},
  prompt: `You are an AI Friend. Respond to the following message in a friendly and engaging manner. Be supportive and curious.\n\nMessage: {{{message}}}`,
});

const engageInContextualBanterFlow = ai.defineFlow(
  {
    name: 'engageInContextualBanterFlow',
    inputSchema: EngageInContextualBanterInputSchema,
    outputSchema: EngageInContextualBanterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
