'use server';

/**
 * @fileOverview Implements a Genkit flow to handle user suggestions that cross safety boundaries.
 *
 * - enforceBoundaries - Function to acknowledge and redirect conversations when boundaries are crossed.
 * - EnforceBoundariesInput - Input type for the enforceBoundaries function.
 * - EnforceBoundariesOutput - Return type for the enforceBoundaries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnforceBoundariesInputSchema = z.object({
  suggestion: z.string().describe('The user suggestion that may cross safety boundaries.'),
});
export type EnforceBoundariesInput = z.infer<typeof EnforceBoundariesInputSchema>;

const EnforceBoundariesOutputSchema = z.object({
  response: z.string().describe('The AI response, acknowledging the suggestion but redirecting to a safer topic.'),
});
export type EnforceBoundariesOutput = z.infer<typeof EnforceBoundariesOutputSchema>;

export async function enforceBoundaries(input: EnforceBoundariesInput): Promise<EnforceBoundariesOutput> {
  return enforceBoundariesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enforceBoundariesPrompt',
  input: {schema: EnforceBoundariesInputSchema},
  output: {schema: EnforceBoundariesOutputSchema},
  prompt: `You are an AI Friend. The user has made the following suggestion:

{{{suggestion}}}

This suggestion might be crossing established safety boundaries. Acknowledge the suggestion, set a clear boundary, and then redirect the conversation to a safer, more appropriate topic. Prioritize the user’s emotional safety. No slurs, hate speech, or harassment. No explicit discussion of sexual acts or body parts. No content that involves minors. Always stay clearly adult in age and context. Encourage confidence, self-respect, and emotional awareness.
`,
});

const enforceBoundariesFlow = ai.defineFlow(
  {
    name: 'enforceBoundariesFlow',
    inputSchema: EnforceBoundariesInputSchema,
    outputSchema: EnforceBoundariesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
