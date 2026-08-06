import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';
import brightpathLogo from '../../imports/Brightpath_1.png';

/**
 * Products store a plain string `iconKey` in the database (editors don't
 * upload icon assets — the design-system icon set stays fixed). This maps
 * that key to the actual bundled image. Add new keys here if new product
 * icons are ever added to the design.
 */
export const iconMap: Record<string, string> = {
  'about-brightpath': brightpathLogo,
  'industry-certifications': iconCertifications,
  'user-administration': iconUserAdmin,
  'aptitude-career-discovery': iconCareerConnections,
  'education-career-plan': iconEduPlan,
  'education-connections': iconEduConnections,
  'work-based-learning': iconWorkBased,
  'career-connections': iconDataReporting,
  'data-reporting': iconAptitude,
};

export const DEFAULT_ICON_KEY = 'about-brightpath';

export function resolveIcon(iconKey?: string | null): string {
  return iconMap[iconKey ?? DEFAULT_ICON_KEY] ?? iconMap[DEFAULT_ICON_KEY];
}

export const availableIconKeys = Object.keys(iconMap);
