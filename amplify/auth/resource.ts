import { defineAuth } from '@aws-amplify/backend';

/**
 * Auth for the Success Hub admin area.
 * Public visitors never sign in — only content editors (e.g. Sarah) do,
 * to reach /admin and make changes.
 *
 * To add an editor after deploy:
 *   npx ampx sandbox   (dev)  — or the Cognito console/AWS CLI in production
 *   then add the user to the "ContentEditors" group so they get write access
 *   (see amplify/data/resource.ts authorization rules).
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ['ContentEditors'],
});
