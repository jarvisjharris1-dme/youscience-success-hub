import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
// This file is generated automatically when you run `npx ampx sandbox`
// or `npx ampx pipeline-deploy`. It does not exist until then.
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

// Typed client used everywhere in the app to read/write Products, Categories, Articles.
export const client = generateClient<Schema>();
