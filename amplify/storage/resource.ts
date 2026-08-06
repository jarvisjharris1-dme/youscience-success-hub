import { defineStorage } from '@aws-amplify/backend';

/**
 * File storage for images/attachments Sarah uploads while editing articles.
 * - public/*      readable by anyone (used to display images on published articles)
 * - editors/*     only ContentEditors can write (upload); public can still read
 */
export const storage = defineStorage({
  name: 'successHubMedia',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['ContentEditors']).to(['read', 'write', 'delete']),
    ],
  }),
});
