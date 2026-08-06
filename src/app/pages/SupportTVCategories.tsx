import { Link } from 'react-router';
import { Video, ChevronRight, Home, PlayCircle, Play, ChevronLeft, Search, Sparkles, Users, GraduationCap, FileText, BarChart, Settings } from 'lucide-react';
import { useRef, useState } from 'react';
import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';

export default function SupportTVCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      id: 'whats-new',
      title: "What's New",
      description: 'Check out our latest updates and feature releases',
      items: [
        {
          id: 'latest-features',
          type: 'playlist',
          title: 'Latest Features & Updates',
          description: 'Discover the newest features and improvements to the platform',
          videoCount: 7,
          duration: '32 min',
          thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop'
        },
        {
          id: 'product-releases',
          type: 'playlist',
          title: 'Product Release Highlights',
          description: 'Major product releases and what they mean for you',
          videoCount: 5,
          duration: '24 min',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-tip-dashboards',
          type: 'video',
          title: 'Quick Tip: New Dashboard Layout',
          description: 'Learn about the redesigned dashboard interface',
          duration: '3 min',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
        },
        {
          id: 'mobile-updates',
          type: 'playlist',
          title: 'Mobile App Updates',
          description: 'New features and improvements in the mobile app',
          videoCount: 4,
          duration: '18 min',
          thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop'
        },
        {
          id: 'ui-enhancements',
          type: 'video',
          title: 'UI Enhancement Overview',
          description: 'See what\'s new in our redesigned interface',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=225&fit=crop'
        },
        {
          id: 'integration-updates',
          type: 'playlist',
          title: 'New Integrations',
          description: 'Connect with more tools and platforms',
          videoCount: 6,
          duration: '27 min',
          thumbnail: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'user-administration',
      title: 'User Administration',
      description: 'Learn how to manage users, roles, and permissions',
      items: [
        {
          id: 'getting-started',
          type: 'playlist',
          title: 'Getting Started with Users',
          description: 'Learn the basics of adding and managing users',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop'
        },
        {
          id: 'advanced-management',
          type: 'playlist',
          title: 'Advanced User Management',
          description: 'Deep dive into user management features and best practices',
          videoCount: 8,
          duration: '45 min',
          thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop'
        },
        {
          id: 'roles-permissions',
          type: 'playlist',
          title: 'Roles & Permissions',
          description: 'Configure roles and set up permission structures',
          videoCount: 6,
          duration: '28 min',
          thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop'
        },
        {
          id: 'bulk-import',
          type: 'video',
          title: 'Bulk User Import',
          description: 'Import multiple users at once using CSV files',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop'
        },
        {
          id: 'sso-setup',
          type: 'playlist',
          title: 'Single Sign-On Setup',
          description: 'Configure SSO for your organization',
          videoCount: 4,
          duration: '20 min',
          thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=225&fit=crop'
        },
        {
          id: 'user-deactivation',
          type: 'video',
          title: 'Deactivating Users',
          description: 'Properly deactivate and archive user accounts',
          duration: '4 min',
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop'
        },
        {
          id: 'password-policies',
          type: 'playlist',
          title: 'Password & Security Policies',
          description: 'Set up and enforce security policies',
          videoCount: 5,
          duration: '24 min',
          thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'aptitude-career-discovery',
      title: 'Aptitude & Career Discovery',
      description: 'Help students discover their aptitudes and explore careers',
      items: [
        {
          id: 'aptitude-assessments',
          type: 'playlist',
          title: 'Aptitude Assessments',
          description: 'Guide to administering and interpreting aptitude assessments',
          videoCount: 6,
          duration: '30 min',
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=225&fit=crop'
        },
        {
          id: 'career-exploration',
          type: 'playlist',
          title: 'Career Exploration Tools',
          description: 'Help students explore career paths based on their aptitudes',
          videoCount: 9,
          duration: '42 min',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop'
        },
        {
          id: 'intro-aptitudes',
          type: 'video',
          title: 'Introduction to Aptitudes',
          description: 'Understand what aptitudes are and why they matter',
          duration: '4 min',
          thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop'
        },
        {
          id: 'results-interpretation',
          type: 'playlist',
          title: 'Interpreting Assessment Results',
          description: 'Make sense of aptitude assessment data',
          videoCount: 7,
          duration: '35 min',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        },
        {
          id: 'student-guidance',
          type: 'video',
          title: 'Guiding Students Through Results',
          description: 'Best practices for discussing results with students',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=225&fit=crop'
        },
        {
          id: 'career-matching',
          type: 'playlist',
          title: 'Career Matching Strategies',
          description: 'Match aptitudes to career opportunities',
          videoCount: 8,
          duration: '38 min',
          thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'education-career-plan',
      title: 'College & Career Readiness Planner',
      description: 'Create and manage personalized education plans',
      items: [
        {
          id: 'creating-plans',
          type: 'playlist',
          title: 'Creating Education Plans',
          description: 'Step-by-step guide to creating personalized education plans',
          videoCount: 5,
          duration: '25 min',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        },
        {
          id: 'plan-management',
          type: 'playlist',
          title: 'Managing & Tracking Plans',
          description: 'Monitor student progress and update plans accordingly',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=225&fit=crop'
        },
        {
          id: 'plan-templates',
          type: 'video',
          title: 'Using Plan Templates',
          description: 'Save time with pre-built education plan templates',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=225&fit=crop'
        },
        {
          id: 'goal-setting',
          type: 'playlist',
          title: 'Setting Student Goals',
          description: 'Help students set and achieve educational goals',
          videoCount: 6,
          duration: '29 min',
          thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop'
        },
        {
          id: 'parent-involvement',
          type: 'video',
          title: 'Involving Parents in Planning',
          description: 'Strategies for engaging parents in the process',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=225&fit=crop'
        },
        {
          id: 'progress-monitoring',
          type: 'playlist',
          title: 'Progress Monitoring Tools',
          description: 'Track and measure student progress effectively',
          videoCount: 4,
          duration: '19 min',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'industry-certifications',
      title: 'Industry Certifications',
      description: 'Guide students toward industry certifications',
      items: [
        {
          id: 'certification-pathways',
          type: 'playlist',
          title: 'Certification Pathways',
          description: 'Explore available certification options and requirements',
          videoCount: 4,
          duration: '18 min',
          thumbnail: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=225&fit=crop'
        },
        {
          id: 'tracking-certifications',
          type: 'playlist',
          title: 'Tracking Student Certifications',
          description: 'Monitor and report on student certification progress',
          videoCount: 4,
          duration: '20 min',
          thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop'
        },
        {
          id: 'cert-benefits',
          type: 'video',
          title: 'Benefits of Industry Certifications',
          description: 'Why certifications matter for career success',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop'
        },
        {
          id: 'popular-certs',
          type: 'playlist',
          title: 'Popular Industry Certifications',
          description: 'Overview of the most sought-after certifications',
          videoCount: 7,
          duration: '33 min',
          thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop'
        },
        {
          id: 'cert-preparation',
          type: 'video',
          title: 'Preparing Students for Certification',
          description: 'Study tips and preparation strategies',
          duration: '7 min',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop'
        },
        {
          id: 'cert-funding',
          type: 'playlist',
          title: 'Certification Funding Options',
          description: 'Financial resources for certification programs',
          videoCount: 3,
          duration: '15 min',
          thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'education-connections',
      title: 'Education Connections',
      description: 'Connect educational programs with career opportunities',
      items: [
        {
          id: 'program-mapping',
          type: 'playlist',
          title: 'Program Mapping',
          description: 'Map educational programs to career pathways',
          videoCount: 5,
          duration: '24 min',
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop'
        },
        {
          id: 'partnership-management',
          type: 'playlist',
          title: 'Partnership Management',
          description: 'Manage partnerships with educational institutions',
          videoCount: 4,
          duration: '19 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-connect',
          type: 'video',
          title: 'Quick Connect Setup',
          description: 'Fast track your education connections',
          duration: '3 min',
          thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop'
        },
        {
          id: 'dual-enrollment',
          type: 'playlist',
          title: 'Dual Enrollment Programs',
          description: 'Set up and manage dual enrollment opportunities',
          videoCount: 6,
          duration: '28 min',
          thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop'
        },
        {
          id: 'transfer-pathways',
          type: 'video',
          title: 'Creating Transfer Pathways',
          description: 'Guide students through transfer processes',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=225&fit=crop'
        },
        {
          id: 'articulation-agreements',
          type: 'playlist',
          title: 'Articulation Agreements',
          description: 'Understanding and leveraging articulation agreements',
          videoCount: 4,
          duration: '18 min',
          thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'work-based-learning',
      title: 'Work-Based Learning',
      description: 'Manage internships and work experiences',
      items: [
        {
          id: 'internship-setup',
          type: 'playlist',
          title: 'Setting Up Internships',
          description: 'Create and manage internship opportunities',
          videoCount: 6,
          duration: '28 min',
          thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=225&fit=crop'
        },
        {
          id: 'experience-tracking',
          type: 'playlist',
          title: 'Tracking Work Experience',
          description: 'Monitor and evaluate student work experiences',
          videoCount: 5,
          duration: '23 min',
          thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=225&fit=crop'
        },
        {
          id: 'employer-collaboration',
          type: 'video',
          title: 'Collaborating with Employers',
          description: 'Best practices for employer partnerships',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop'
        },
        {
          id: 'apprenticeships',
          type: 'playlist',
          title: 'Apprenticeship Programs',
          description: 'Develop and manage apprenticeship opportunities',
          videoCount: 7,
          duration: '34 min',
          thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=225&fit=crop'
        },
        {
          id: 'job-shadowing',
          type: 'video',
          title: 'Organizing Job Shadowing',
          description: 'Set up meaningful job shadowing experiences',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=225&fit=crop'
        },
        {
          id: 'safety-compliance',
          type: 'playlist',
          title: 'Safety & Compliance',
          description: 'Ensure workplace safety and legal compliance',
          videoCount: 4,
          duration: '21 min',
          thumbnail: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'career-connections',
      title: 'Career Connections',
      description: 'Link students with career opportunities',
      items: [
        {
          id: 'career-matching',
          type: 'playlist',
          title: 'Career Matching Tools',
          description: 'Use data-driven tools to match students with careers',
          videoCount: 7,
          duration: '32 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop'
        },
        {
          id: 'employer-engagement',
          type: 'playlist',
          title: 'Employer Engagement',
          description: 'Connect with employers and create opportunities',
          videoCount: 6,
          duration: '27 min',
          thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop'
        },
        {
          id: 'networking-tips',
          type: 'video',
          title: 'Student Networking Tips',
          description: 'Help students build professional networks',
          duration: '7 min',
          thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop'
        },
        {
          id: 'career-fairs',
          type: 'playlist',
          title: 'Hosting Career Fairs',
          description: 'Plan and execute successful career fair events',
          videoCount: 5,
          duration: '26 min',
          thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop'
        },
        {
          id: 'resume-building',
          type: 'video',
          title: 'Resume Building Workshop',
          description: 'Help students create professional resumes',
          duration: '8 min',
          thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=225&fit=crop'
        },
        {
          id: 'interview-prep',
          type: 'playlist',
          title: 'Interview Preparation',
          description: 'Prepare students for successful job interviews',
          videoCount: 6,
          duration: '29 min',
          thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop'
        },
        {
          id: 'linkedin-optimization',
          type: 'video',
          title: 'LinkedIn Profile Optimization',
          description: 'Create compelling LinkedIn profiles',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 'data-reporting',
      title: 'Data & Reporting',
      description: 'Access comprehensive analytics and reporting',
      items: [
        {
          id: 'dashboard-basics',
          type: 'playlist',
          title: 'Dashboard Basics',
          description: 'Navigate and understand your data dashboard',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
        },
        {
          id: 'custom-reports',
          type: 'playlist',
          title: 'Creating Custom Reports',
          description: 'Build custom reports tailored to your needs',
          videoCount: 6,
          duration: '30 min',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
        },
        {
          id: 'data-export',
          type: 'playlist',
          title: 'Data Export & Integration',
          description: 'Export data and integrate with other systems',
          videoCount: 3,
          duration: '15 min',
          thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-export',
          type: 'video',
          title: 'Quick Export to Excel',
          description: 'Export your data to Excel in seconds',
          duration: '2 min',
          thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=225&fit=crop'
        },
        {
          id: 'visualization',
          type: 'playlist',
          title: 'Data Visualization',
          description: 'Create compelling charts and graphs',
          videoCount: 7,
          duration: '33 min',
          thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=225&fit=crop'
        },
        {
          id: 'scheduled-reports',
          type: 'video',
          title: 'Scheduling Automated Reports',
          description: 'Set up reports to run automatically',
          duration: '4 min',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        },
        {
          id: 'analytics-insights',
          type: 'playlist',
          title: 'Analytics & Insights',
          description: 'Turn data into actionable insights',
          videoCount: 8,
          duration: '40 min',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Support TV</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Support TV</h1>
        <p className="text-lg text-gray-600">Search for videos or browse video tutorials by category</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for videos..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C15AB3] focus:border-transparent transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Category Sections with Horizontal Scrolling */}
      <div className="space-y-12">
        {categories.map((category) => {
          const filteredItems = category.items.filter((item: any) => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          // Only show category if it has matching items
          if (filteredItems.length === 0) return null;
          
          return (
            <CategoryRow 
              key={category.id} 
              category={{ ...category, items: filteredItems }} 
            />
          );
        })}
        
        {/* No results message */}
        {searchQuery && categories.every(category => 
          category.items.filter((item: any) => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0
        ) && (
          <div className="text-center py-16">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 680; // Scroll about 2 cards at a time (320px + gap)
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Get icon for category
  const getCategoryIcon = () => {
    const iconMap: Record<string, string> = {
      'user-administration': iconUserAdmin,
      'aptitude-career-discovery': iconCareerConnections,
      'education-career-plan': iconEduPlan,
      'industry-certifications': iconCertifications,
      'education-connections': iconEduConnections,
      'work-based-learning': iconWorkBased,
      'career-connections': iconDataReporting,
      'data-reporting': iconAptitude
    };
    
    const iconSrc = iconMap[category.id];
    
    // Return null for categories without icons (like 'whats-new')
    if (!iconSrc) return null;
    
    return <img src={iconSrc} alt="" className="w-6 h-6" />;
  };

  return (
    <div>
      {/* Category Header */}
      <div className="mb-4 flex items-center gap-3">
        {getCategoryIcon()}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>

      {/* Horizontal Scrolling Container with Arrows */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white border-2 border-gray-300 hover:border-[#C15AB3] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white border-2 border-gray-300 hover:border-[#C15AB3] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {category.items.map((item: any) => (
                <Link
                  key={item.id}
                  to={`/support-tv/${category.id}/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
                  style={{ width: '320px', flexShrink: 0 }}
                >
                  {/* Thumbnail with stacked effect for playlists */}
                  <div className="relative">
                    {item.type === 'playlist' && (
                      <>
                        {/* Stacked card effects - bottom layers */}
                        <div className="absolute top-1 left-2 right-2 h-2 bg-gray-300 rounded-t-lg z-0"></div>
                        <div className="absolute top-2 left-1 right-1 h-2 bg-gray-200 rounded-t-lg z-0"></div>
                      </>
                    )}
                    
                    {/* Main thumbnail */}
                    <div className="relative aspect-video bg-gray-100">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      
                      {/* Playlist badge and info */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        {item.type === 'playlist' && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-[#C15AB3] to-[#3EC6C2] text-white text-xs rounded font-semibold uppercase tracking-wide">
                            Playlist
                          </span>
                        )}
                        {item.type === 'playlist' && (
                          <span className="px-2 py-1 bg-black/80 text-white text-xs rounded font-medium">
                            {item.videoCount} videos
                          </span>
                        )}
                      </div>
                      
                      {/* Duration badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-black/80 text-white text-xs rounded">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}