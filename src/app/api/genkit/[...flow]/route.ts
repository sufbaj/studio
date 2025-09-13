/**
 * @fileoverview This file is the API route for Genkit flows.
 */

import {createApiHandler} from '@genkit-ai/next';
import '@/ai/dev';

export const GET = createApiHandler();
export const POST = createApiHandler();
