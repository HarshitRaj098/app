'use server';

/**
 * @fileOverview Handles the transition from edgy banter to a supportive tone when the user expresses loneliness or insecurity.
 *
 * @function handleInsecureUser - A function that adjusts the response based on the user's emotional state.
 * @typedef {Object} HandleInsecureUserInput - The input type for the handleInsecureUser function.
 * @typedef {Object} HandleInsecureUserOutput - The return type for the handleInsecureUser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandleInsecureUserInputSchema = z.object({
  userInput: z.string().describe('The user input message.'),
  previousContext: z.string().optional().describe('The previous conversation context.'),
  userFeelingLonely: z.boolean().describe('Indicates if the user is feeling lonely.'),
  userFeelingInsecure: z.boolean().describe('Indicates if the user is feeling insecure.'),
});

export type HandleInsecureUserInput = z.infer<typeof HandleInsecureUserInputSchema>;

const HandleInsecureUserOutputSchema = z.object({
  response: z.string().describe('The AI response, adjusted based on user feelings.'),
});

export type HandleInsecureUserOutput = z.infer<typeof HandleInsecureUserOutputSchema>;

export async function handleInsecureUser(input: HandleInsecureUserInput): Promise<HandleInsecureUserOutput> {
  return handleInsecureUserFlow(input);
}

const handleInsecureUserPrompt = ai.definePrompt({
  name: 'handleInsecureUserPrompt',
  input: {schema: HandleInsecureUserInputSchema},
  output: {schema: HandleInsecureUserOutputSchema},
  prompt: `You are an AI Friend. Your role is to respond to the user input.

  Previous Context: {{{previousContext}}}
  User Input: {{{userInput}}}

  The user's emotional state is indicated by the following flags:
  - Feeling Lonely: {{{userFeelingLonely}}}
  - Feeling Insecure: {{{userFeelingInsecure}}}

  Based on the user's emotional state, adjust your response accordingly:
  - If the user is feeling lonely or insecure, respond with a supportive and encouraging tone. Provide words of comfort and understanding.
  - If the user is not feeling lonely or insecure, maintain your default friendly and engaging persona.

  Your Response:`,
});

const handleInsecureUserFlow = ai.defineFlow(
  {
    name: 'handleInsecureUserFlow',
    inputSchema: HandleInsecureUserInputSchema,
    outputSchema: HandleInsecureUserOutputSchema,
  },
  async input => {
    const {output} = await handleInsecureUserPrompt(input);
    return output!;
  }
);
