'use server';

import { engageInContextualBanter } from '@/ai/flows/engage-in-contextual-banter';

export async function sendMessage(message: string): Promise<string> {
  if (!message) {
    // This case should ideally be handled client-side, but as a safeguard:
    return 'Please enter a message.';
  }

  try {
    const result = await engageInContextualBanter({ message });
    return result.response;
  } catch (error) {
    console.error('Error engaging in banter:', error);
    // Re-throwing the error to be handled by the client-side catch block
    throw new Error('Failed to get a response from the AI.');
  }
}
