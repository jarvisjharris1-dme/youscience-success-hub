import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { ChevronRight, ChevronDown, Home, Search } from 'lucide-react';
import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';
import brightpathLogo from '../../imports/Brightpath_1.png';
import brightpathIcon from '../../imports/ys_logo.png';
import { articleUrls } from '../data/articleUrls';

interface Article {
  id: string;
  title: string;
  subheading?: string;
}

interface Category {
  id: string;
  title: string;
  articles: Article[];
}

interface Product {
  id: string;
  title: string;
  icon: string;
  description: string;
  categories: Category[];
}

export default function ProductPage() {
  const { productId } = useParams();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 'about-brightpath',
      title: 'Brightpath',
      icon: brightpathLogo,
      description: 'Learn about Brightpath and get started with YouScience',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'about-brightpath', title: 'About Brightpath' },
            { id: 'why-choose-youscience', title: 'Why YouScience for educators and administrators kit' },
            { id: 'privacy-policy', title: 'Privacy policy' },
            { id: 'product-updates', title: 'Product updates' },
            { id: 'family-connect', title: 'Family Connect: Parent & guardian experience' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'log-in-create-account', title: 'Log in or create an account' },
            { id: 'admin-intro-video', title: 'Brightpath admin intro video' },
            { id: 'brightpath-roles', title: 'Brightpath roles' },
            { id: 'student-experience', title: 'Brightpath student experience and navigation' },
            { id: 'admin-experience', title: 'Brightpath admin experience and navigation' },
            { id: 'get-started-form', title: 'Get started form' },
            { id: 'getting-started-kit', title: 'Getting started kit' },
            { id: 'technical-requirements', title: 'Brightpath technical requirements (IT checklist)' },
            { id: 'add-email', title: 'Add an additional email' },
            { id: 'my-profile', title: 'My Profile' },
            { id: 'language-translation', title: 'Language and translation in Chrome' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training and resources',
          articles: [
            { id: 'digital-guides', title: 'Brightpath courses & digital guides' },
            { id: 'webinar-recordings', title: 'Brightpath webinar recordings' },
            { id: 'register-live-webinar', title: 'Register for a live training webinar' },
            { id: 'roadmap-6-8', title: 'Brightpath roadmap: Grades 6-8' },
            { id: 'roadmap-9-12', title: 'Brightpath roadmap: Grades 9-12' },
            { id: 'roadmap-postsecondary', title: 'Brightpath roadmap: Postsecondary' },
            { id: 'classroom-lessons', title: 'Classroom-ready lessons: Grades 6-12' }
          ]
        }
      ]
    },
    {
      id: 'user-administration',
      title: 'User Administration',
      icon: iconUserAdmin,
      description: 'Manage users, roles, and permissions across your organization',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'User Administration: Admin quick start guide' },
            { id: 'user-admin-overview', title: 'User Administration overview' },
            { id: 'brightpath-roles', title: 'Brightpath roles' }
          ]
        },
        {
          id: 'user-management',
          title: 'User management',
          articles: [
            { id: 'update-user-role', title: 'Update a user\'s role' },
            { id: 'reset-learner-password', title: 'Reset a learner\'s password' },
            { id: 'reset-your-password', title: 'Reset your password' },
            { id: 'remove-delete-user', title: 'Remove or delete a user\'s record' },
            { id: 'add-remove-user', title: 'Add or remove a user' },
            { id: 'manage-invitations', title: 'Manage user invitations' },
            { id: 'add-users-to-school', title: 'Add existing users to another school or organization' },
            { id: 'move-students-groups', title: 'Move students or invitations between groups' },
            { id: 'send-individual-invitations', title: 'Send individual email invitations' },
            { id: 'family-connect-admin', title: 'Family Connect: Admin experience' },
            { id: 'upload-all-users', title: 'Upload all users into Brightpath' },
            { id: 'georgia-iccp-checkbox', title: 'Georgia: Complete the ICCP checkbox' }
          ]
        },
        {
          id: 'bulk-sso-rostering',
          title: 'SSO & rostering',
          articles: [
            { id: 'classlink-rostering', title: 'ClassLink rostering' },
            { id: 'clever-rostering', title: 'Clever rostering' },
            { id: 'infinite-campus-rostering', title: 'Infinite Campus rostering' },
            { id: 'powerschool-rostering', title: 'PowerSchool rostering' },
            { id: 'sso-vs-rostering', title: 'SSO vs. rostering' },
            { id: 'enable-sso', title: 'Enable SSO' }
          ]
        },
        {
          id: 'groups-permissions',
          title: 'Groups & permissions',
          articles: [
            { id: 'create-manage-groups', title: 'Create and manage groups' },
            { id: 'add-staff-to-group', title: 'Add staff to a group' }
          ]
        },
        {
          id: 'aptitude-management',
          title: 'Aptitude & Career Discovery management & results management',
          articles: [
            { id: 'reset-restore-surveys', title: 'Reset and restore brain game surveys' },
            { id: 'hold-release-results', title: 'Hold and release results' }
          ]
        }
      ]
    },
    {
      id: 'aptitude-career-discovery',
      title: 'Aptitude & Career Discovery',
      icon: iconCareerConnections,
      description: 'Help students discover their aptitudes and explore career pathways',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Aptitude & Career Discovery: Quick start guide' },
            { id: 'student-video', title: 'What is Aptitude & Career Discovery?' },
            { id: 'info-flyer', title: 'Aptitude & Career Discovery informational flyer' },
            { id: 'solution-brief', title: 'Solution brief' },
            { id: 'student-comm-flyer', title: 'YouScience student communication flyer', subheading: 'Student resources' },
            { id: 'student-intro-videos', title: 'Youscience Brightpath: Student introduction videos' },
            { id: 'parent-comm-flyer', title: 'YouScience parent communication flyer', subheading: 'Parent resources' },
            { id: 'parent-guide', title: 'Aptitude & Career Discovery: Parent guide' },
            { id: 'parent-guide-spanish', title: 'Aptitud y descubrimiento profesional: guía para padres (Aptitude & Career Discovery Parent Guide in Spanish)' },
            { id: 'what-we-measure', title: 'What we measure and sample aptitude exercises', subheading: 'Deepen understanding of aptitudes' },
            { id: 'aptitudes-cheat-sheet', title: 'Aptitudes cheat sheet' },
            { id: 'all-about-aptitudes', title: 'All about aptitudes' },
            { id: 'science-behind', title: 'The science behind YouScience' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'implementation-checklists', title: 'Implementation checklists', subheading: 'Planning & implementation' },
            { id: 'admin-journey', title: 'Admin journey' },
            { id: 'sample-rollouts', title: 'Sample rollouts' },
            { id: 'higher-ed-playbook', title: 'Higher ed playbook' },
            { id: 'college-to-career-guide', title: 'College-to-career new user guide' },
            { id: 'iep-connections', title: 'IEP connections' },
            { id: 'georgia-gaconnects-login', title: 'Georgia: Log into GaConnects Staff' },
            { id: 'georgia-talent-act', title: 'Georgia: Top State for Talent Act Checklist' },
            { id: 'georgia-claim-students', title: 'Georgia: Claim students into YouScience' },
            { id: 'prepare-user', title: 'Prepare your user', subheading: 'Prepare users' },
            { id: 'completing-at-home', title: 'Completing Aptitude & Career Discovery at home' },
            { id: 'school-comm-tools', title: 'Getting started kit' }
          ]
        },
        {
          id: 'use-aptitude',
          title: 'Use Aptitude & Career Discovery',
          articles: [
            { id: 'take-brain-games', title: 'Take your brain games', subheading: 'Take the brain games' },
            { id: 'brain-games-spanish', title: '¿Cómo hago mis juegos mentales? (How do I take my brain games in Spanish)' },
            { id: 'read-aloud-general', title: 'Aptitude & Career Discovery: Read-aloud directions' },
            { id: 'voice-instructions-spanish', title: 'Aptitude & Career Discovery: Voice Instructions en Espanol – Instrucciones de voz' },
            { id: 'brain-game-length', title: 'Brain game length' },
            { id: 'georgia-slds-login', title: 'Georgia: Log into Discovery using SLDS' },
            { id: 'georgia-grade-activities', title: 'Georgia: Meet grade-level activities' },
            { id: 'view-download-results', title: 'View and download your results', subheading: 'View & download results' },
            { id: 'view-student-results', title: 'How do I view student results?' },
            { id: 'one-page-summary', title: 'Discovery One-Page Summary' },
            { id: 'results-walkthroughs', title: 'Results walkthroughs' }
          ]
        },
        {
          id: 'data-reports',
          title: 'Data & reports',
          articles: [
            { id: 'discovery-admin-dashboard', title: 'Discovery Admin Dashboard' },
            { id: 'one-page-summary-report', title: 'Discovery One-Page Summary' },
            { id: 'aptitude-reports-cheat-sheet', title: 'Aptitude & Career Discovery: Reports Cheat Sheet' },
            { id: 'clusters-alignment-report', title: 'Clusters Alignment Report' },
            { id: 'counselor-summary-report', title: 'Counselor Summary Report' },
            { id: 'discovery-engagement-report', title: 'Discovery Engagement Report' },
            { id: 'majors-recommendation-report', title: 'Majors Recommendations Report' },
            { id: 'pathways-report', title: 'Pathways Report' },
            { id: 'student-summary-report', title: 'Student summary report' },
            { id: 'top-careers-report', title: 'Top Careers Report' },
            { id: 'georgia-grade-reports', title: 'Georgia: Grade Level Activities Reports for 6-8 and 9-12' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training & resources',
          articles: [
            { id: 'prerecorded-webinars', title: 'Pre-recorded training webinars: Aptitude & Career Discovery', subheading: 'Training' },
            { id: 'register-live-training-webinar', title: 'Register for a live training webinar' },
            { id: 'georgia-implementation-webinar', title: 'Georgia: View or register for an implementation training webinar' },
            { id: 'digital-guides', title: 'Brightpath courses & digital guides' },
            { id: 'introduce-to-students', title: 'Introduce Aptitude & Career Discovery to students', subheading: 'Teaching resources' },
            { id: 'classroom-lessons', title: 'Classroom-ready lessons: Grades 6-12' },
            { id: 'best-fit-career-deck', title: 'Best-fit careers exploration: Educator-led slide deck' },
            { id: 'results-walkthrough-toolkit', title: 'Results walkthrough toolkit' },
            { id: 'conversation-starters', title: 'Conversation starters' },
            { id: 'georgia-introduce-slds', title: 'Georgia: Introduce Snippet, Snapshot, and Summit to students through SLDS' },
            { id: 'student-workbooks', title: 'Student workbooks', subheading: 'Student resources' },
            { id: 'aptitude-results-tracker', title: 'Aptitude results tracker' }
          ]
        },
        {
          id: 'iec',
          title: 'IEC',
          articles: [
            { id: 'iec-contact', title: 'Get started as an Independent Educational Consultant (IEC)' },
            { id: 'iec-get-started', title: 'IEC - How do I get my client started?' },
            { id: 'iec-advising-rollout', title: '1-on-1 Advising Rollout Checklist' }
          ]
        },
        {
          id: 'faqs',
          title: 'FAQs',
          articles: [
            { id: 'faqs-main', title: 'FAQs: Aptitude & Career Discovery' },
            { id: 'aptitudes-vs-interests', title: 'What is the difference between aptitudes and interests?' },
            { id: 'only-see-certifications', title: 'Why does my Aptitude & Career Discovery student only see Industry Certifications?' },
            { id: 'purchase-account', title: 'How do I purchase an Aptitude & Career Discovery account?' },
            { id: 'ipad-tablet', title: 'Can I use an iPad/tablet device to take the brain games?' },
            { id: 'move-7-8-to-full', title: 'How do students move from the 7th or 8th grade version to the full version of Aptitude & Career Discovery?' },
            { id: 'learning-differences', title: 'How can students with learning differences take the brain games?' },
            { id: 'common-student-errors', title: 'Troubleshooting and common errors' },
            { id: 'discovery-statuses', title: 'Discovery statuses' },
            { id: 'career-cluster-descriptions', title: 'Career cluster descriptions' },
            { id: 'georgia-summit-no-snapshot', title: 'Georgia: Complete Summit (with or without Snapshot)' }
          ]
        }
      ]
    },
    {
      id: 'education-career-plan',
      title: 'College & Career Readiness Planner',
      icon: iconEduPlan,
      description: 'Create and manage personalized education and career plans',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Quick start guide' },
            { id: 'solution-brief', title: 'Solution brief' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'request-prepare-ccr', title: 'Request & prepare for CCR' }
          ]
        },
        {
          id: 'use-ccr',
          title: 'Use CCR',
          articles: [
            { id: 'ccr-middle-school', title: 'CCR: Middle school' },
            { id: 'ccr-high-school', title: 'CCR: High school' },
            { id: 'ccr-admin-counselor-dashboard', title: 'CCR: Admin & counselor dashboard' }
          ]
        }
      ]
    },
    {
      id: 'industry-certifications',
      title: 'Industry Certifications',
      icon: iconCertifications,
      description: 'Guide students toward industry-recognized certifications',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Industry Certifications: Admin quick start guide' },
            { id: 'quick-start-guide-proctor', title: 'Industry Certifications: Proctor quick start guide' },
            { id: 'solution-brief', title: 'Solution brief' },
            { id: 'available-exams', title: 'Available Industry Certification exams' },
            { id: 'exam-updates', title: 'Exam updates year-to-year' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'proctor-agreement', title: 'Proctor agreement' },
            { id: 'exam-types', title: 'Exam types' },
            { id: 'exam-prep-best-practices', title: 'Best practices for exam preparation' },
            { id: 'manage-exam-codes', title: 'Create, proctor, and manage exam codes' },
            { id: 'exam-accessibility', title: 'Exam accessibility and accommodations' },
            { id: 'post-exam-from-pre', title: 'Create a post-exam from another proctor\'s pre-exam' },
            { id: 'nchse-exams', title: 'NCHSE exams in Industry Certifications' },
            { id: 'georgia-prepare-certifications', title: 'Georgia: Prepare for certifications' }
          ]
        },
        {
          id: 'use-certifications',
          title: 'Use Industry Certifications',
          articles: [
            { id: 'student-instructions', title: 'Industry Certifications: Student instructions' },
            { id: 'deliver-exam-codes', title: 'Deliver exam codes to students' },
            { id: 'exam-time-needed', title: 'Time needed for an exam' },
            { id: 'remote-proctor-teacher', title: 'Remote proctoring: Teacher instructions' },
            { id: 'remote-proctor-student', title: 'Remote proctoring: Student instructions' },
            { id: 'exam-retakes-proctor', title: 'Exam retakes: Proctor instructions' },
            { id: 'exam-retakes-student', title: 'Exam retakes: Student instructions' },
            { id: 'print-certificates', title: 'Download and print student certificates: Proctor instructions' },
            { id: 'view-exam-history', title: 'View student exam history' },
            { id: 'manage-performance', title: 'Manage performance requirements' },
            { id: 'capstone-certifications', title: 'Capstone Certifications' },
            { id: 'log-3rd-party', title: 'Log 3rd-party industry tests' },
            { id: 'exam-troubleshooting', title: 'Exam errors and troubleshooting' }
          ]
        },
        {
          id: 'data-reports',
          title: 'Data & reports',
          articles: [
            { id: 'reports-cheat-sheet', title: 'Industry Certifications: Reports cheat sheet' },
            { id: 'reports-admins', title: 'Reports available to admins' },
            { id: 'reports-staff', title: 'Reports available to staff' },
            { id: 'reports-proctors', title: 'Reports available to proctors' },
            { id: 'industry-recognition-report', title: 'Industry Recognition Report' },
            { id: 'exam-performance-report', title: 'Exam Performance Report' },
            { id: 'proctor-performance-report', title: 'Proctor Performance Report' },
            { id: 'class-performance-report', title: 'Class Performance Report' },
            { id: 'single-exam-summary', title: 'Single Exam Summary Report' },
            { id: 'student-growth-report', title: 'Student Growth Report' },
            { id: 'district-summary-report', title: 'District Summary Report' },
            { id: 'pre-post-exam-summary', title: 'Pre/Post Exam Summary' },
            { id: 'student-performance-report', title: 'Student Performance Report' },
            { id: 'third-party-tests', title: '3rd-Party Industry Tests Reporting' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training & resources',
          articles: [
            { id: 'prerecorded-webinar', title: 'Pre-recorded training webinars: Industry Certifications' },
            { id: 'register-live-webinar', title: 'Register for a live training webinar' },
            { id: 'value-slide-deck', title: 'The value of Industry Certifications: Educator-led slide deck' },
            { id: 'parent-guide', title: 'Industry Certifications: Parent guide' },
            { id: 'certification-labs-guide', title: 'Your guide to certification labs' }
          ]
        },
        {
          id: 'faqs',
          title: 'FAQs',
          articles: [
            { id: 'faqs-main', title: 'FAQs: Industry Certifications' },
            { id: 'textbooks-available', title: 'What textbooks are available to go along with the exams?' },
            { id: 'question-types', title: 'What question types are used on an Industry Certification exam?' },
            { id: 'translated-exams', title: 'Are exams translated or available in other languages?' },
            { id: 'pilot-exams', title: 'What are pilot exams?' },
            { id: 'what-is-exam-code', title: 'What is an exam code?' },
            { id: 'add-exam-codes', title: 'How do I add exam codes for my proctors?' },
            { id: 'teacher-proctor-exam', title: 'Why can\'t I take an exam as a teacher/proctor?' },
            { id: 'find-best-exam', title: 'How do I find which exam is best for my course?' },
            { id: 'cut-score', title: 'What is a cut score/passing percentage?' },
            { id: 'view-student-results', title: 'How do I view student results?' },
            { id: 'find-missing-history', title: 'How do I find my missing exam history?' }
          ]
        }
      ]
    },
    {
      id: 'education-connections',
      title: 'Education Connections',
      icon: iconEduConnections,
      description: 'Connect educational programs with career opportunities',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Quick start guide' },
            { id: 'solution-brief', title: 'Education Connections solution brief' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'manage-college-offerings', title: 'Manage and edit your college offerings' }
          ]
        },
        {
          id: 'use-education-connections',
          title: 'Use Education Connections',
          articles: [
            { id: 'explore-plan-college', title: 'Explore and plan for college' },
            { id: 'majors-programs-tool', title: 'Majors/programs tool' },
            { id: 'schools-tool', title: 'Schools tool' },
            { id: 'scholarships-tool', title: 'Scholarships tool' },
            { id: 'plan-college-tool', title: 'Plan for college tool' },
            { id: 'personalized-landing-page', title: 'Personalized college landing page' }
          ]
        },
        {
          id: 'common-app',
          title: 'Common App',
          articles: [
            { id: 'common-app-faqs', title: 'Common App: FAQs' },
            { id: 'common-app-counselor', title: 'Common App: Counselor instructions' },
            { id: 'common-app-student', title: 'Common App: Student instructions' },
            { id: 'common-app-teacher', title: 'Common App: Teacher instructions' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training & resources',
          articles: [
            { id: 'prerecorded-webinar', title: 'Pre-recorded training webinars: Education Connections & Career Connections' },
            { id: 'educator-guide', title: 'College planning and applications: Educator-led slide deck' }
          ]
        },
        {
          id: 'faqs',
          title: 'FAQs',
          articles: [
            { id: 'opt-in-sharing', title: 'Where can students opt in to share or manage sharing preferences?' }
          ]
        }
      ]
    },
    {
      id: 'work-based-learning',
      title: 'Work-Based Learning',
      icon: iconWorkBased,
      description: 'Manage internships, apprenticeships, and work experiences',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Quick start guide' },
            { id: 'overview', title: 'Solution brief' },
            { id: 'transition-guide', title: 'Welcome to Brightpath WBL: Your transition guide from Seamless WBL' }
          ]
        },
        {
          id: 'setup',
          title: 'Setup & preparation',
          articles: [
            { id: 'get-started-wbl', title: 'Get started with Work-Based Learning (WBL)' },
            { id: 'create-employers', title: 'Create Employers in the Employer Directory' },
            { id: 'create-labels', title: 'Create Labels' },
            { id: 'create-fillable-forms', title: 'Create Fillable Forms' },
            { id: 'create-email-templates', title: 'Create Email Templates' },
            { id: 'create-esign-docs', title: 'Create E-Sign Documents' },
            { id: 'create-wbl-opportunities', title: 'Create WBL Opportunities' },
            { id: 'create-wbl-activities', title: 'Create WBL Activities' },
            { id: 'create-advisory-boards', title: 'Create Advisory Boards' },
            { id: 'manage-employer-profile', title: 'Manage your private employer profile within WBL' }
          ]
        },
        {
          id: 'use-wbl',
          title: 'Use Work-Based Learning',
          articles: [
            { id: 'wbl-overview-dashboard', title: 'WBL Overview Dashboard' },
            { id: 'wbl-student-instructions', title: 'WBL: Student instructions' }
          ]
        },
        {
          id: 'data-reports',
          title: 'Data & reports',
          articles: [
            { id: 'student-activity-report', title: 'WBL Student Activity Report' },
            { id: 'advisory-board-report', title: 'WBL Advisory Board Report' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training & resources',
          articles: [
            { id: 'wbl-training-webinar', title: 'Pre-recorded training webinars: Work-Based Learning (WBL)' },
            { id: 'parent-guide', title: 'Work-Based Learning (WBL): Parent guide' }
          ]
        }
      ]
    },
    {
      id: 'career-connections',
      title: 'Career Connections',
      icon: iconDataReporting,
      description: 'Link students with career opportunities and industry partners',
      categories: [
        {
          id: 'start-here',
          title: 'Start here',
          articles: [
            { id: 'quick-start-guide', title: 'Quick start guide' },
            { id: 'solution-brief', title: 'Career Connections solution brief' }
          ]
        },
        {
          id: 'setup-preparation',
          title: 'Setup & preparation',
          articles: [
            { id: 'setup-employer-profile', title: 'Set up your employer profile' },
            { id: 'manage-sponsorship', title: 'Manage your sponsorship' }
          ]
        },
        {
          id: 'use-career-connections',
          title: 'Use Career Connections',
          articles: [
            { id: 'student-instructions', title: 'Career Connections: Student instructions' }
          ]
        },
        {
          id: 'training-resources',
          title: 'Training & resources',
          articles: [
            { id: 'prerecorded-webinar', title: 'Pre-recorded training webinars: Education Connections & Career Connections' }
          ]
        }
      ]
    },
    {
      id: 'data-reporting',
      title: 'Data & Reporting',
      icon: iconAptitude,
      description: 'Access comprehensive data analytics and reporting tools',
      categories: [
        {
          id: 'overview',
          title: 'Overview',
          articles: [
            { id: 'reporting-intro', title: 'Introduction to Data & Reporting' }
          ]
        }
      ]
    }
  ];

  const currentProduct = products.find(p => p.id === productId) || products[3]; // Default to Industry Certifications

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentProduct.title}</span>
      </nav>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter a question or topic"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C15AB3] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar */}
        <aside className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-8">
            {/* Products Navigation */}
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="font-bold text-gray-900">Products</h3>
            </div>
            <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              {products.filter(p => p.id !== 'data-reporting').map((product) => {
                const isActive = product.id === currentProduct.id;
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      isActive ? 'bg-[#C15AB3]/5 border-l-4 border-l-[#C15AB3]' : ''
                    }`}
                  >
                    <img
                      src={product.id === 'about-brightpath' ? brightpathIcon : product.icon}
                      alt={product.title}
                      className={`max-w-5 max-h-5 object-contain ${isActive ? '' : 'opacity-70'}`}
                    />
                    <span className={`text-sm ${isActive ? 'text-[#C15AB3] font-semibold' : 'text-gray-700'}`}>
                      {product.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Product Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-6">
                <div className={currentProduct.id === 'about-brightpath' ? 'w-32 h-16 flex items-center justify-start' : 'w-16 h-16 flex items-center justify-center'}>
                  <img
                    src={currentProduct.icon}
                    alt={currentProduct.title}
                    className={currentProduct.id === 'about-brightpath' ? 'max-w-32 max-h-16 object-contain' : 'max-w-16 max-h-16 object-contain'}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentProduct.title}</h1>
                  <p className="text-lg text-gray-600">Click a category to get started.</p>
                </div>
              </div>
            </div>

            {/* Categories and Articles */}
            <div className="space-y-2">
              {currentProduct.categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-left">{category.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="bg-white">
                        {category.articles.map((article, index) => (
                          <div key={article.id}>
                            {article.subheading && (
                              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                  {article.subheading}
                                </span>
                              </div>
                            )}
                            {articleUrls[article.title] ? (
                              <a
                                href={articleUrls[article.title]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 border-t border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-[#C15AB3] transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                  <span>{article.title}</span>
                                </div>
                              </a>
                            ) : (
                              <Link
                                to={`/product/${currentProduct.id}/article/${article.id}`}
                                className="block px-4 py-3 border-t border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-[#C15AB3] transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                  <span>{article.title}</span>
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}